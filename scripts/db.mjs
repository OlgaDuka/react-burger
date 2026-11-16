/**
 * Поднимает локальный PostgreSQL для разработки.
 *
 * Используются настоящие бинари PostgreSQL из npm-пакета `embedded-postgres`,
 * поэтому Docker и права администратора не нужны: кластер живёт в `.pgdata`
 * рядом с проектом и сохраняется между запусками.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import EmbeddedPostgres from 'embedded-postgres'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

dotenv.config({ path: path.join(root, '.env') })

const dataDir = path.join(root, '.pgdata')
const port = Number(process.env.PG_PORT ?? 5433)
const user = process.env.PG_USER ?? 'postgres'
const password = process.env.PG_PASSWORD ?? 'postgres'
const database = process.env.PG_DATABASE ?? 'react_burger'
const verbose = process.env.DEBUG_PG === '1'

const log = (message) => console.log(`[db] ${message}`)
const relay = (message) => verbose && String(message).trim() && console.log(String(message).trimEnd())

const postgres = new EmbeddedPostgres({
  databaseDir: dataDir,
  port,
  user,
  password,
  persistent: true,
  onLog: relay,
  onError: (error) => console.error('[db]', error instanceof Error ? error.message : error),
})

async function ensureCluster() {
  if (existsSync(path.join(dataDir, 'PG_VERSION'))) {
    log('кластер уже инициализирован, использую существующий')
    return
  }

  log('инициализирую кластер (первый запуск, это может занять до минуты)…')
  await postgres.initialise()
}

async function ensureDatabase() {
  const client = postgres.getPgClient('postgres')

  await client.connect()
  try {
    const { rowCount } = await client.query('select 1 from pg_database where datname = $1', [
      database,
    ])

    if (!rowCount) {
      await postgres.createDatabase(database)
      log(`создана база «${database}»`)
    }
  } finally {
    await client.end()
  }
}

async function main() {
  await ensureCluster()
  await postgres.start()
  await ensureDatabase()

  log(`PostgreSQL слушает localhost:${port}, база «${database}»`)
  log('остановить: Ctrl+C')

  let stopping = false
  const stop = async (signal) => {
    if (stopping) return
    stopping = true
    log(`${signal}: останавливаю PostgreSQL…`)
    await postgres.stop().catch((error) => console.error('[db]', error.message))
    process.exit(0)
  }

  process.on('SIGINT', () => void stop('SIGINT'))
  process.on('SIGTERM', () => void stop('SIGTERM'))

  // Держим процесс живым, пока живёт кластер.
  setInterval(() => undefined, 1 << 30)
}

main().catch((error) => {
  console.error('[db] не удалось запустить PostgreSQL:', error?.message ?? error)
  console.error('[db] возможно, порт ' + port + ' уже занят другим экземпляром базы')
  process.exit(1)
})
