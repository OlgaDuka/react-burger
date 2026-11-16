import { createServer } from 'node:http'
import { createApp } from './app'
import { config } from './config'
import { ensureSchema, seedIfEmpty } from './db/bootstrap'
import { closePool, waitForDatabase } from './db/pool'
import { DEMO_USERS } from './db/seed/demo'
import { attachWebSocket } from './ws'

async function main(): Promise<void> {
  console.log('[api] подключаюсь к PostgreSQL…')
  await waitForDatabase()

  await ensureSchema()

  const report = await seedIfEmpty()
  if (report.ingredients > 0 || report.users > 0 || report.orders > 0) {
    console.log(
      `[api] база заполнена: ингредиентов ${report.ingredients}, ` +
        `пользователей ${report.users}, заказов ${report.orders}`
    )
    console.log(
      `[api] демо-вход: ${DEMO_USERS[0].email} / ${DEMO_USERS[0].password}`
    )
  }

  const server = createServer(createApp())
  attachWebSocket(server)

  await new Promise<void>((resolve) => server.listen(config.port, resolve))

  console.log(`[api] REST   http://localhost:${config.port}/api`)
  console.log(`[api] WS     ws://localhost:${config.port}/orders/all`)
  console.log(`[api] WS     ws://localhost:${config.port}/orders?token=<access>`)

  let isShuttingDown = false

  const shutdown = async (signal: string): Promise<void> => {
    if (isShuttingDown) return
    isShuttingDown = true

    console.log(`\n[api] ${signal}: останавливаю сервер…`)
    server.close()
    await closePool().catch(() => undefined)
    process.exit(0)
  }

  process.on('SIGINT', () => void shutdown('SIGINT'))
  process.on('SIGTERM', () => void shutdown('SIGTERM'))
}

main().catch((error) => {
  console.error('[api] не удалось запуститься:', error instanceof Error ? error.message : error)
  process.exit(1)
})
