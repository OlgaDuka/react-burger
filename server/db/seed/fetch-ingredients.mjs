import { writeFile } from 'node:fs/promises'

const SOURCE = 'https://norma.education-services.ru/api/ingredients'

const response = await fetch(SOURCE)
if (!response.ok) throw new Error(`HTTP ${response.status}`)

const { data } = await response.json()

const ingredients = data.map((item) => ({
  _id: item._id,
  name: item.name,
  type: item.type,
  proteins: item.proteins,
  fat: item.fat,
  carbohydrates: item.carbohydrates,
  calories: item.calories,
  price: item.price,
  image: item.image,
  image_mobile: item.image_mobile,
  image_large: item.image_large,
}))

await writeFile(new URL('./ingredients.json', import.meta.url), `${JSON.stringify(ingredients, null, 2)}\n`)

console.log(`Saved ${ingredients.length} ingredients`)
