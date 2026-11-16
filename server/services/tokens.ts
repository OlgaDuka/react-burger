import { createHash, randomBytes } from 'node:crypto'
import { config } from '../config'
import { query } from '../db/pool'
import { signAccessToken } from '../lib/jwt'

export interface TokenPair {
  /** Значение уже с префиксом `Bearer `: фронтенд режет его по этому префиксу. */
  accessToken: string
  refreshToken: string
}

const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex')

export async function issueTokenPair(userId: string): Promise<TokenPair> {
  const refreshToken = randomBytes(48).toString('hex')
  const expiresAt = new Date(Date.now() + config.refreshTokenTtlDays * 24 * 60 * 60 * 1000)

  await query(
    `insert into refresh_tokens (user_id, token_hash, expires_at) values ($1, $2, $3)`,
    [userId, hashToken(refreshToken), expiresAt]
  )

  return {
    accessToken: `Bearer ${signAccessToken(userId)}`,
    refreshToken,
  }
}

/**
 * Обновляет пару токенов: старый refresh-токен помечается отозванным,
 * поэтому повторно использовать его нельзя.
 */
export async function refreshTokenPair(rawToken: string): Promise<{
  userId: string
  tokens: TokenPair
} | null> {
  const { rows } = await query<{ id: string; user_id: string }>(
    `update refresh_tokens
        set revoked_at = now()
      where token_hash = $1
        and revoked_at is null
        and expires_at > now()
      returning id::text, user_id`,
    [hashToken(rawToken)]
  )

  if (!rows[0]) return null

  return { userId: rows[0].user_id, tokens: await issueTokenPair(rows[0].user_id) }
}

export async function revokeRefreshToken(rawToken: string): Promise<void> {
  await query(
    `update refresh_tokens set revoked_at = now()
      where token_hash = $1 and revoked_at is null`,
    [hashToken(rawToken)]
  )
}

export async function revokeAllUserTokens(userId: string): Promise<void> {
  await query(
    `update refresh_tokens set revoked_at = now()
      where user_id = $1 and revoked_at is null`,
    [userId]
  )
}
