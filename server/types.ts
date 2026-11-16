/** Строки таблиц в том виде, в котором их возвращает `pg`. */
export interface IngredientRow {
  id: string
  name: string
  type: 'bun' | 'main' | 'sauce'
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string | null
  image_large: string | null
  created_at: Date
}

export interface UserRow {
  id: string
  email: string
  name: string
  password_hash: string
  created_at: Date
  updated_at: Date
}

export interface OrderRow {
  id: string
  number: number
  user_id: string | null
  name: string
  status: 'created' | 'pending' | 'done'
  total_price: number
  created_at: Date
  updated_at: Date
}

export type IngredientType = 'bun' | 'main' | 'sauce'
export type OrderStatus = 'created' | 'pending' | 'done'

/**
 * Формат ингредиента повторяет ответ учебного API: фронтенд обращается
 * к полям `_id`, `image_mobile` и т.д.
 */
export interface IngredientDTO {
  _id: string
  name: string
  type: IngredientType
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
}

export interface OrderOwnerDTO {
  name: string
  email: string
}

/** Заказ в формате фронтенда (`TOrderItem`). */
export interface OrderDTO {
  _id: string
  ingredients: string[]
  name: string
  status: OrderStatus
  number: number
  createdAt: string
  updatedAt: string
  price: number
  owner?: OrderOwnerDTO
}

export interface UserDTO {
  email: string
  name: string
}

export interface OrderWithOwnerRow extends OrderRow {
  owner_name: string | null
  owner_email: string | null
}
