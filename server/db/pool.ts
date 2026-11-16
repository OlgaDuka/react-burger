import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg'
import { config } from '../config'

export const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
})

pool.on('error', (error) => {
  console.error('[db] ошибка простаивающего клиента:', error.message)
})

export function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  values: unknown[] = []
): Promise<QueryResult<T>> {
  return pool.query<T>(text, values)
}

/** Выполняет набор запросов в одной транзакции, откатывая её при ошибке. */
export async function withTransaction<T>(handler: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect()
  try {
    await client.query('begin')
    const result = await handler(client)
    await client.query('commit')
    return result
  } catch (error) {
    await client.query('rollback').catch(() => undefined)
    throw error
  } finally {
    client.release()
  }
}

/** Ждёт, пока кластер Postgres начнёт принимать подключения. */
export async function waitForDatabase(attempts = 60, delayMs = 1000): Promise<void> {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await pool.query('select 1')
      return
    } catch (error) {
      if (attempt === attempts) {
        throw new Error(
          `Не удалось подключиться к базе за ${attempts} попыток. ` +
            `Проверьте, запущен ли Postgres (npm run db) и верен ли DATABASE_URL. ` +
            `Исходная ошибка: ${(error as Error).message}`
        )
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
}

export async function closePool(): Promise<void> {
  await pool.end()
}
