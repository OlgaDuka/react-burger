import { query } from '../db/pool'
import { IngredientDTO, IngredientRow } from '../types'

const COLUMNS = `
  id, name, type, proteins, fat, carbohydrates, calories,
  price, image, image_mobile, image_large, created_at
`

export function toIngredientDTO(row: IngredientRow): IngredientDTO {
  return {
    _id: row.id,
    name: row.name,
    type: row.type,
    proteins: row.proteins,
    fat: row.fat,
    carbohydrates: row.carbohydrates,
    calories: row.calories,
    price: row.price,
    image: row.image,
    image_mobile: row.image_mobile ?? row.image,
    image_large: row.image_large ?? row.image,
  }
}

export async function listIngredients(): Promise<IngredientDTO[]> {
  const { rows } = await query<IngredientRow>(
    `select ${COLUMNS}
       from ingredients
      order by case type when 'bun' then 1 when 'main' then 2 else 3 end, name`
  )

  return rows.map(toIngredientDTO)
}

export async function findIngredientById(id: string): Promise<IngredientDTO | null> {
  const { rows } = await query<IngredientRow>(
    `select ${COLUMNS} from ingredients where id::text = $1`,
    [id]
  )

  return rows[0] ? toIngredientDTO(rows[0]) : null
}

/** Возвращает ингредиенты в том же порядке, в котором переданы id. */
export async function findIngredientsByIds(ids: string[]): Promise<IngredientDTO[]> {
  if (ids.length === 0) return []

  const { rows } = await query<IngredientRow>(
    `select ${COLUMNS} from ingredients where id::text = any($1::text[])`,
    [ids]
  )

  const byId = new Map(rows.map((row) => [row.id, toIngredientDTO(row)]))

  return ids
    .map((id) => byId.get(id))
    .filter((ingredient): ingredient is IngredientDTO => Boolean(ingredient))
}
