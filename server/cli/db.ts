import { ensureSchema, resetDatabase, seedIfEmpty } from '../db/bootstrap'
import { closePool, query, waitForDatabase } from '../db/pool'
import { config } from '../config'

type Command = 'migrate' | 'seed' | 'reset' | 'stats'

const USAGE = `Использование: tsx server/cli/db.ts <команда>

  migrate  создать таблицы и типы, если их ещё нет
  seed     заполнить базу справочником и демо-данными (только если пусто)
  reset    очистить базу и заполнить заново
  stats    показать количество записей в таблицах
`

async function printStats(): Promise<void> {
  const { rows } = await query<{ table_name: string; rows: number }>(
    `select 'ingredients' as table_name, count(*)::int as rows from ingredients
     union all select 'users', count(*)::int from users
     union all select 'orders', count(*)::int from orders
     union all select 'order_ingredients', count(*)::int from order_ingredients
     union all select 'refresh_tokens', count(*)::int from refresh_tokens`
  )

  console.table(rows)
}

async function main(): Promise<void> {
  const command = (process.argv[2] ?? 'migrate') as Command

  if (!['migrate', 'seed', 'reset', 'stats'].includes(command)) {
    console.error(USAGE)
    process.exit(1)
  }

  await waitForDatabase(10, 1000)

  switch (command) {
    case 'migrate': {
      await ensureSchema()
      console.log('[db] схема применена')
      break
    }
    case 'seed': {
      await ensureSchema()
      const report = await seedIfEmpty()
      console.log(
        `[db] добавлено: ингредиентов ${report.ingredients}, ` +
          `пользователей ${report.users}, заказов ${report.orders}`
      )
      break
    }
    case 'reset': {
      await ensureSchema()
      const report = await resetDatabase()
      console.log(
        `[db] база пересоздана: ингредиентов ${report.ingredients}, ` +
          `пользователей ${report.users}, заказов ${report.orders}`
      )
      break
    }
    case 'stats': {
      await printStats()
      break
    }
  }

  console.log(`[db] база: ${config.databaseUrl}`)
}

main()
  .catch((error) => {
    console.error('[db] ошибка:', error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(() => closePool().catch(() => undefined))
