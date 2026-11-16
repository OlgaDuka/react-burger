import { Server as HttpServer } from 'node:http'
import { WebSocket, WebSocketServer } from 'ws'
import { verifyAccessToken } from './lib/jwt'
import { countOrders, listAllOrders, listOrdersByUser } from './repositories/orders'

interface ClientMeta {
  /** `null` — сокет ленты (все заказы), иначе id владельца. */
  userId: string | null
}

const clients = new Map<WebSocket, ClientMeta>()

const FEED_PATH = '/orders/all'
const USER_PATH = '/orders'
const INVALID_TOKEN_MESSAGE = 'Invalid or missing token'

function send(ws: WebSocket, payload: unknown): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload))
  }
}

async function sendFeedSnapshot(ws: WebSocket): Promise<void> {
  const [orders, stats] = await Promise.all([listAllOrders(), countOrders()])
  send(ws, { success: true, orders, total: stats.total, totalToday: stats.totalToday })
}

async function sendUserSnapshot(ws: WebSocket, userId: string): Promise<void> {
  const [orders, stats] = await Promise.all([listOrdersByUser(userId), countOrders()])
  send(ws, { success: true, orders, total: stats.total, totalToday: stats.totalToday })
}

/**
 * Подключает WebSocket-каналы, которые использует фронтенд:
 *  - `/orders/all` — общая лента заказов;
 *  - `/orders?token=<access>` — заказы текущего пользователя.
 */
export function attachWebSocket(server: HttpServer): WebSocketServer {
  const wss = new WebSocketServer({ noServer: true })

  server.on('upgrade', (request, socket, head) => {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)

    if (url.pathname !== FEED_PATH && url.pathname !== USER_PATH) {
      socket.destroy()
      return
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      if (url.pathname === FEED_PATH) {
        clients.set(ws, { userId: null })
        sendFeedSnapshot(ws).catch((error) => console.error('[ws] лента:', error))
        return
      }

      const token = url.searchParams.get('token')
      if (!token) {
        send(ws, { success: false, message: INVALID_TOKEN_MESSAGE })
        ws.close(4001, 'unauthorized')
        return
      }

      let userId: string
      try {
        userId = verifyAccessToken(token)
      } catch {
        send(ws, { success: false, message: INVALID_TOKEN_MESSAGE })
        ws.close(4001, 'unauthorized')
        return
      }

      clients.set(ws, { userId })
      sendUserSnapshot(ws, userId).catch((error) => console.error('[ws] профиль:', error))
    })
  })

  wss.on('connection', (ws: WebSocket) => {
    ws.on('close', () => clients.delete(ws))
    ws.on('error', () => clients.delete(ws))
  })

  return wss
}

/** Рассылает обновлённую ленту после создания заказа. */
export async function notifyOrderCreated(ownerId: string | null): Promise<void> {
  const stats = await countOrders()

  for (const [ws, meta] of clients) {
    if (ws.readyState !== WebSocket.OPEN) continue

    if (meta.userId === null) {
      const orders = await listAllOrders()
      send(ws, { success: true, orders, total: stats.total, totalToday: stats.totalToday })
      continue
    }

    if (ownerId && meta.userId === ownerId) {
      const orders = await listOrdersByUser(ownerId)
      send(ws, { success: true, orders, total: stats.total, totalToday: stats.totalToday })
    }
  }
}
