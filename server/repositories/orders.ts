import { PoolClient } from 'pg'
import { query, withTransaction } from '../db/pool'
import { newId } from '../lib/ids'
import { buildOrderName } from '../lib/order-name'
import { IngredientDTO, OrderDTO, OrderStatus, OrderWithOwnerRow } from '../types'

const ORDER_COLUMNS = `
  o.id, o.number, o.user_id, o.name, o.status, o.total_price,
  o.created_at, o.updated_at, u.name as owner_name, u.email as owner_email
`

const FROM_ORDERS = `
  from orders o
  left join users u on u.id = o.user_id
`

const sumPrice = (ingredients: IngredientDTO[]): number =>
  ingredients.reduce((total, ingredient) => total + ingredient.price, 0)

/** Достаёт состав заказов одним запросом и собирает DTO. */
async function toOrderDTOs(rows: OrderWithOwnerRow[]): Promise<OrderDTO[]> {
  if (rows.length === 0) return []

  const orderIds = rows.map((row) => row.id)
  const { rows: items } = await query<{ order_id: string; ingredient_id: string }>(
    `select order_id, ingredient_id
       from order_ingredients
      where order_id::text = any($1::text[])
      order by order_id, position`,
    [orderIds]
  )

  const ingredientsByOrder = new Map<string, string[]>()
  for (const item of items) {
    const list = ingredientsByOrder.get(item.order_id) ?? []
    list.push(item.ingredient_id)
    ingredientsByOrder.set(item.order_id, list)
  }

  return rows.map((row) => ({
    _id: row.id,
    ingredients: ingredientsByOrder.get(row.id) ?? [],
    name: row.name,
    status: row.status,
    number: row.number,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    price: row.total_price,
    ...(row.owner_email && row.owner_name
      ? { owner: { name: row.owner_name, email: row.owner_email } }
      : {}),
  }))
}

async function insertOrder(
  client: PoolClient,
  input: {
    userId: string | null
    ingredients: IngredientDTO[]
    status?: OrderStatus
    createdAt?: Date
    updatedAt?: Date
  }
): Promise<OrderWithOwnerRow> {
  const { userId, ingredients } = input
  const status = input.status ?? 'created'
  const createdAt = input.createdAt ?? new Date()
  const updatedAt = input.updatedAt ?? createdAt
  const ids = ingredients.map((ingredient) => ingredient._id)

  if (ids.length === 0) {
    throw new Error('Заказ не может быть пустым')
  }

  const { rows } = await client.query<OrderWithOwnerRow>(
    `with inserted as (
       insert into orders (id, user_id, name, status, total_price, created_at, updated_at)
       values ($1, $2, $3, $4, $5, $6, $7)
       returning *
     )
     select i.id, i.number, i.user_id, i.name, i.status, i.total_price,
            i.created_at, i.updated_at, u.name as owner_name, u.email as owner_email
       from inserted i
       left join users u on u.id = i.user_id`,
    [newId(), userId, buildOrderName(ingredients.map((item) => item.name)), status, sumPrice(ingredients), createdAt, updatedAt]
  )

  const order = rows[0]

  await client.query(
    `insert into order_ingredients (order_id, ingredient_id, position)
     select $1, item.ingredient_id, item.position
       from unnest($2::text[], $3::int[]) as item(ingredient_id, position)`,
    [order.id, ids, ids.map((_, index) => index)]
  )

  return order
}

export async function createOrder(input: {
  userId: string | null
  ingredients: IngredientDTO[]
  status?: OrderStatus
  createdAt?: Date
  updatedAt?: Date
}): Promise<OrderDTO> {
  const row = await withTransaction((client) => insertOrder(client, input))
  const [order] = await toOrderDTOs([row])

  return order
}

/** Поддерживает и `_id`, и номер заказа: фронтенд открывает /feed/:number. */
export async function findOrderByIdOrNumber(idOrNumber: string): Promise<OrderDTO | null> {
  const asNumber = /^\d+$/.test(idOrNumber) ? Number(idOrNumber) : null

  const { rows } = await query<OrderWithOwnerRow>(
    `select ${ORDER_COLUMNS} ${FROM_ORDERS}
      where o.id::text = $1 or ($2::int is not null and o.number = $2::int)
      limit 1`,
    [idOrNumber, asNumber]
  )

  const [order] = await toOrderDTOs(rows)

  return order ?? null
}

export async function listAllOrders(limit = 100): Promise<OrderDTO[]> {
  const { rows } = await query<OrderWithOwnerRow>(
    `select ${ORDER_COLUMNS} ${FROM_ORDERS} order by o.created_at desc, o.number desc limit $1`,
    [limit]
  )

  return toOrderDTOs(rows)
}

export async function listOrdersByUser(userId: string, limit = 100): Promise<OrderDTO[]> {
  const { rows } = await query<OrderWithOwnerRow>(
    `select ${ORDER_COLUMNS} ${FROM_ORDERS}
      where o.user_id = $1
      order by o.created_at desc, o.number desc
      limit $2`,
    [userId, limit]
  )

  return toOrderDTOs(rows)
}

export async function countOrders(): Promise<{ total: number; totalToday: number }> {
  const { rows } = await query<{ total: number; total_today: number }>(
    `select count(*)::int as total,
            count(*) filter (where created_at >= date_trunc('day', now()))::int as total_today
       from orders`
  )

  return { total: rows[0].total, totalToday: rows[0].total_today }
}
