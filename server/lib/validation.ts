import { badRequest } from './http'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function requireString(
  value: unknown,
  field: string,
  { min = 1, max = 200 }: { min?: number; max?: number } = {}
): string {
  if (typeof value !== 'string' || value.trim().length < min) {
    throw badRequest(`Поле «${field}» обязательно`)
  }

  const trimmed = value.trim()

  if (trimmed.length > max) {
    throw badRequest(`Поле «${field}» длиннее ${max} символов`)
  }

  return trimmed
}

export function requireEmail(value: unknown): string {
  const email = requireString(value, 'email', { max: 320 })

  if (!EMAIL_PATTERN.test(email)) {
    throw badRequest('Некорректный email')
  }

  return email
}

export function requirePassword(value: unknown): string {
  const password = requireString(value, 'password', { min: 6, max: 100 })

  return password
}
