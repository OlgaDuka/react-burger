import { IngredientDTO, OrderStatus } from '../../types'

export interface DemoUserSeed {
  email: string
  name: string
  password: string
}

/** Демо-пользователи создаются один раз при первом сидировании. */
export const DEMO_USERS: DemoUserSeed[] = [
  { email: 'leliduk@yandex.ru', name: 'Olga', password: 'burger123' },
  { email: 'tester@burger.dev', name: 'Тестовый космонавт', password: 'burger123' },
]

export interface DemoOrderSeed {
  ownerEmail: string | null
  ingredientIds: string[]
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}

/** Детерминированный генератор: одинаковый сид даёт одинаковые данные. */
function mulberry32(seed: number): () => number {
  let state = seed

  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296
  }
}

function pick<T>(items: T[], random: () => number): T {
  return items[Math.floor(random() * items.length)]
}

/**
 * Составляет историю заказов за последние две недели, чтобы лента и профиль
 * не выглядели пустыми сразу после установки проекта.
 */
export function buildDemoOrders(ingredients: IngredientDTO[], now = new Date()): DemoOrderSeed[] {
  const buns = ingredients.filter((item) => item.type === 'bun')
  const mains = ingredients.filter((item) => item.type === 'main')
  const sauces = ingredients.filter((item) => item.type === 'sauce')

  if (buns.length === 0 || mains.length === 0) return []

  const random = mulberry32(2024)
  const orders: DemoOrderSeed[] = []
  const totalOrders = 16

  for (let index = 0; index < totalOrders; index += 1) {
    const bun = pick(buns, random)
    const mainsCount = 1 + Math.floor(random() * 2)
    const saucesCount = Math.floor(random() * 3)

    const filling = [
      ...Array.from({ length: mainsCount }, () => pick(mains, random)),
      ...Array.from({ length: saucesCount }, () => (sauces.length ? pick(sauces, random) : null)),
    ].filter((item): item is IngredientDTO => item !== null)

    const ingredientsIds = [bun._id, ...filling.map((item) => item._id), bun._id]

    // Свежие заказы ещё готовятся, старые — выполнены.
    const ageHours = Math.round(random() * 24 * 13)
    const createdAt = new Date(now.getTime() - ageHours * 60 * 60 * 1000)
    const updatedAt = new Date(createdAt.getTime() + Math.round(random() * 40) * 60 * 1000)

    let status: OrderStatus = 'done'
    if (ageHours < 2) status = random() > 0.4 ? 'created' : 'done'
    else if (ageHours < 20) status = random() > 0.5 ? 'pending' : 'done'

    const ownerEmail =
      index % 3 === 0 ? DEMO_USERS[0].email : index % 5 === 0 ? DEMO_USERS[1].email : null

    orders.push({ ownerEmail, ingredientIds: ingredientsIds, status, createdAt, updatedAt })
  }

  return orders.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
}
