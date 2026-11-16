import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { config } from '../config'

/** Access-токен живёт недолго; фронтенд обновляет его через /auth/token. */
export function signAccessToken(userId: string): string {
  const options: SignOptions = {
    expiresIn: config.accessTokenTtl as SignOptions['expiresIn'],
  }

  return jwt.sign({ sub: userId }, config.jwtSecret, options)
}

/**
 * Проверяет access-токен и возвращает id пользователя.
 * Ошибка `jwt expired` пробрасывается наружу: по её тексту фронтенд
 * понимает, что нужно обновить токен.
 */
export function verifyAccessToken(token: string): string {
  const payload = jwt.verify(token, config.jwtSecret) as JwtPayload

  if (!payload.sub || typeof payload.sub !== 'string') {
    throw new Error('Invalid token payload')
  }

  return payload.sub
}
