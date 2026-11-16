import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../lib/jwt'
import { findUserById } from '../repositories/users'

/**
 * Фронтенд после обновления токена отправляет заголовок без префикса `Bearer `,
 * поэтому принимаем оба варианта — учебный API ведёт себя так же.
 */
export function extractAccessToken(req: Request): string | null {
  const header = req.headers.authorization
  if (!header) return null

  const value = header.trim()

  return value.startsWith('Bearer ') ? value.slice('Bearer '.length).trim() : value
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = extractAccessToken(req)

  if (!token) {
    res.status(401).json({ success: false, message: 'Invalid or missing token' })
    return
  }

  let userId: string

  try {
    userId = verifyAccessToken(token)
  } catch (error) {
    // На `jwt expired` фронтенд сам обновляет токен и повторяет запрос.
    res.status(401).json({ success: false, message: (error as Error).message })
    return
  }

  try {
    const user = await findUserById(userId)

    // Токен подписан верно, но пользователя уже нет: например, базу пересоздали,
    // а в браузере остался старый access-токен. Без этой проверки запрос упал бы
    // на внешнем ключе orders.user_id с ошибкой 500.
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' })
      return
    }
  } catch (error) {
    next(error)
    return
  }

  req.userId = userId
  next()
}
