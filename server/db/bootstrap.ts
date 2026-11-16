import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { config } from '../config'
import { newId } from '../lib/ids'
import { hashPassword } from '../lib/password'
import { createOrder } from '../repositories/orders'
import { listIngredients } from '../repositories/ingredients'
import { IngredientDTO } from '../types'
import { query, withTransaction } from './pool'
import { DEMO_USERS, buildDemoOrders } from './seed/demo'
import seedIngredients from './seed/ingredients.json'

export interface SeedReport {
  ingredients: number
  users: number
  orders: number
}

const SCHEMA_PATH = path.join(__dirname, 'schema.sql')

/** Применяет schema.sql. Скрипт идемпотентен, поэтому его можно вызывать при каждом старте. */
export async function ensureSchema(): Promise<void> {
  const schema = await readFile(SCHEMA_PATH, 'utf-8')
  await query(schema)
}

async function seedIngredientCatalog(): Promise<number> {
  const catalog = seedIngredients as IngredientDTO[]

  await withTransaction(async (client) => {
    for (const item of catalog) {
      await client.query(
        `insert into ingredients
           (id, name, type, proteins, fat, carbohydrates, calories, price, image, image_mobile, image_large)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         on conflict (id) do update
            set name = excluded.name,
                type = excluded.type,
                proteins = excluded.proteins,
                fat = excluded.fat,
                carbohydrates = excluded.carbohydrates,
                calories = excluded.calories,
                price = excluded.price,
                image = excluded.image,
                image_mobile = excluded.image_mobile,
                image_large = excluded.image_large`,
        [
          item._id,
          item.name,
          item.type,
          item.proteins,
          item.fat,
          item.carbohydrates,
          item.calories,
          item.price,
          item.image,
          item.image_mobile,
          item.image_large,
        ]
      )
    }
  })

  return catalog.length
}

async function seedDemoUsers(): Promise<number> {
  let created = 0

  for (const user of DEMO_USERS) {
    const passwordHash = await hashPassword(user.password)
    const { rowCount } = await query(
      `insert into users (id, email, name, password_hash)
       values ($4, $1, $2, $3)
       on conflict (lower(email)) do nothing`,
      [user.email, user.name, passwordHash, newId()]
    )

    created += rowCount ?? 0
  }

  return created
}

async function seedDemoOrders(): Promise<number> {
  const ingredients = await listIngredients()
  const { rows } = await query<{ id: string; email: string }>('select id, email from users')
  const usersByEmail = new Map(rows.map((row) => [row.email.toLowerCase(), row.id]))
  const orders = buildDemoOrders(ingredients)

  for (const order of orders) {
    const ownerId = order.ownerEmail ? usersByEmail.get(order.ownerEmail.toLowerCase()) ?? null : null
    const orderIngredients = order.ingredientIds
      .map((id) => ingredients.find((item) => item._id === id))
      .filter((item): item is IngredientDTO => Boolean(item))

    await createOrder({
      userId: ownerId,
      ingredients: orderIngredients,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    })
  }

  return orders.length
}

/** Заполняет пустую базу справочником ингредиентов и демонстрационной историей. */
export async function seedIfEmpty(): Promise<SeedReport> {
  const { rows } = await query<{ ingredients: number; users: number; orders: number }>(
    `select (select count(*) from ingredients)::int as ingredients,
            (select count(*) from users)::int as users,
            (select count(*) from orders)::int as orders`
  )

  const counts = rows[0]
  const report: SeedReport = { ingredients: 0, users: 0, orders: 0 }

  if (counts.ingredients === 0) {
    report.ingredients = await seedIngredientCatalog()
  }

  if (!config.seedDemoData) return report

  if (counts.users === 0) {
    report.users = await seedDemoUsers()
  }

  if (counts.orders === 0) {
    report.orders = await seedDemoOrders()
  }

  return report
}

/** Полностью пересоздаёт данные: очищает таблицы и заливает демо-набор заново. */
export async function resetDatabase(): Promise<SeedReport> {
  await query(
    `truncate table order_ingredients, orders, refresh_tokens, password_reset_codes, users, ingredients
     restart identity cascade`
  )
  await query(`alter sequence order_number_seq restart with 68400`)

  const ingredients = await seedIngredientCatalog()
  const users = config.seedDemoData ? await seedDemoUsers() : 0
  const orders = config.seedDemoData ? await seedDemoOrders() : 0

  return { ingredients, users, orders }
}
