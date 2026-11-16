import { createHash } from 'node:crypto'
import { Router } from 'express'
import { config } from '../config'
import { withTransaction } from '../db/pool'
import { asyncHandler, badRequest } from '../lib/http'
import { hashPassword } from '../lib/password'
import { requireEmail, requirePassword, requireString } from '../lib/validation'
import { findUserByEmail } from '../repositories/users'
import { revokeAllUserTokens } from '../services/tokens'

export const passwordRouter = Router()

const hashCode = (code: string): string => createHash('sha256').update(code).digest('hex')

const generateCode = (): string => String(Math.floor(100_000 + Math.random() * 900_000))

/**
 * Письмо никуда не отправляется: код печатается в консоль сервера.
 * Ответ всегда одинаковый, чтобы нельзя было проверить наличие email в базе.
 */
passwordRouter.post(
  '/password-reset',
  asyncHandler(async (req, res) => {
    const email = requireEmail(req.body?.email)
    const user = await findUserByEmail(email)

    if (user) {
      const code = generateCode()

      await withTransaction(async (client) => {
        await client.query(
          `insert into password_reset_codes (user_id, code_hash, expires_at)
           values ($1, $2, now() + make_interval(mins => $3))`,
          [user.id, hashCode(code), config.passwordResetCodeTtlMinutes]
        )
      })

      console.log(`[password-reset] код восстановления для ${email}: ${code}`)
    }

    res.json({ success: true, message: 'Reset email sent' })
  })
)

passwordRouter.post(
  '/password-reset/reset',
  asyncHandler(async (req, res) => {
    const password = requirePassword(req.body?.password)
    const code = requireString(req.body?.token, 'token', { max: 12 })

    const { rows } = await withTransaction(async (client) => {
      const { rows: codes } = await client.query<{ id: string; user_id: string }>(
        `select id::text, user_id
           from password_reset_codes
          where code_hash = $1 and used_at is null and expires_at > now()
          order by created_at desc
          limit 1`,
        [hashCode(code)]
      )

      if (!codes[0]) {
        throw badRequest('Invalid reset token')
      }

      await client.query(
        `update users set password_hash = $1, updated_at = now() where id = $2`,
        [await hashPassword(password), codes[0].user_id]
      )

      await client.query(`update password_reset_codes set used_at = now() where id = $1`, [
        codes[0].id,
      ])

      return { rows: codes }
    })

    await revokeAllUserTokens(rows[0].user_id)

    res.json({ success: true, message: 'Password successfully reset' })
  })
)
