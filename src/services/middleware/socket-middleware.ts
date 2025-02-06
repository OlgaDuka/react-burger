import {
  type Dispatch,
  type Middleware,
  type MiddlewareAPI,
  type UnknownAction
} from '@reduxjs/toolkit'
import {RootState} from '..'
import {RECONNECT_TIME} from "../../utils/constants"
import {updateToken} from "../../utils/api"
import {TWebSocketActions, TWebSocketOptions} from "../types/widdleware-types";

export function createWebSocketMiddleware<TMessage>(
  {
    connect,
    disconnect,
    sendMessage,
    onConnected,
    onDisconnected,
    onMessageReceived,
    onError
  }: TWebSocketActions<TMessage>,
  { withTokenRefresh }: TWebSocketOptions): Middleware<unknown, RootState, Dispatch<UnknownAction>> {
  let socket: WebSocket | null = null
  let isConnected = false
  let reconnectTimer = 0
  let url: string

  return ((store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>) =>
    (next: Dispatch<UnknownAction>) =>
      (action: UnknownAction) => {
        const { payload } = action
        const { dispatch} = store
        if(connect.match(action)) {
          if (socket !== null) {
            console.warn('WebSocket is already connected')
            return
          }
          url = payload as string
          socket = new WebSocket(url)
          isConnected = true

          if (socket) {
            socket.onopen = (event: Event) => dispatch(onConnected(event))
            socket.onerror = (event: Event) => dispatch(onError(event))
            socket.onclose = (event: CloseEvent) => {
              dispatch(onDisconnected(event))
              socket = null
              if (isConnected) {
                reconnectTimer = window.setTimeout(() => {
                  dispatch(connect(url))
                }, RECONNECT_TIME)
              }
            }
            socket.onmessage = (event: MessageEvent) => {
              const data = JSON.parse(event.data)
              if (withTokenRefresh && data.message === 'Invalid or missing token') {
                updateToken().then((refreshData) => {
                  const wssUrl = new URL(url)
                  wssUrl.searchParams.set('token', refreshData)
                  store.dispatch(connect(wssUrl.toString()));
                })
                dispatch(disconnect())
              } else {
                dispatch(onMessageReceived(data))
              }
            }
          }
        }

        if (disconnect.match(action)) {
          if (socket !== null) {
            socket.close()
          }
          clearTimeout((reconnectTimer))
          isConnected = false
          reconnectTimer = 0
          socket = null
        }

        if (sendMessage.match(action)) {
          if (socket !== null && socket.readyState === WebSocket.OPEN) {
            socket?.send(JSON.stringify(payload))
          } else {
            console.warn('WebSocket is not open. Cannot send message')
          }
        }

      return next(action)
  }) as Middleware
}

export default createWebSocketMiddleware;