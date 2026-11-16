/**
 * Ингредиенты называются «Краторная булка N-200i», «Мясо бессмертных моллюсков»,
 * а заказ в учебном API — «Краторный бессмертный бургер».
 *
 * Поэтому берём из названий прилагательные, приводим их к мужскому роду и
 * именительному падежу и склеиваем в имя заказа.
 */
const ADJECTIVE_ENDINGS = ['ого', 'ему', 'ая', 'яя', 'ой', 'ый', 'ий', 'ых', 'их', 'ые', 'ие']

/** Основа «мягкая», если заканчивается на шипящую или -ск: марсианск- → марсианский. */
function adjectiveFor(stem: string): string {
  return /(ск|щ|ч|ж|ш)$/i.test(stem) ? `${stem}ий` : `${stem}ый`
}

export function toMasculineAdjective(word: string): string | null {
  const lower = word.toLowerCase()

  for (const ending of ADJECTIVE_ENDINGS) {
    if (!lower.endsWith(ending)) continue

    const stem = word.slice(0, -ending.length)

    // Уже в мужском роде: «Говяжий», «традиционный».
    if (ending === 'ый' || ending === 'ий') return word

    return stem.length < 3 ? null : adjectiveFor(stem)
  }

  return null
}

/** Собирает имя заказа из названий ингредиентов: «Краторный марсианский бургер». */
export function buildOrderName(ingredientNames: string[]): string {
  const adjectives: string[] = []
  const seen = new Set<string>()
  const MAX_ADJECTIVES = 3

  for (const name of ingredientNames) {
    for (const word of name.split(/\s+/)) {
      const adjective = toMasculineAdjective(word)
      if (!adjective) continue

      const key = adjective.toLowerCase()
      if (seen.has(key)) continue

      seen.add(key)
      adjectives.push(adjective)

      if (adjectives.length === MAX_ADJECTIVES) break
    }

    if (adjectives.length === MAX_ADJECTIVES) break
  }

  if (adjectives.length === 0) return 'Безымянный бургер'

  const [first, ...rest] = adjectives

  return [first, ...rest.map((word) => word.toLowerCase()), 'бургер'].join(' ')
}
