import { Router } from 'express'
import { asyncHandler, conflict, unauthorized } from '../lib/http'
import { hashPassword, verifyPassword } from '../lib/password'
import { requireEmail, requirePassword, requireString } from '../lib/validation'
import { requireAuth } from '../middleware/auth'
import {
  createUser,
  findUserByEmail,
  findUserById,
  toUserDTO,
  updateUser,
} from '../repositories/users'
import {
  issueTokenPair,
  refreshTokenPair,
  revokeAllUserTokens,
  revokeRefreshToken,
} from '../services/tokens'

export const authRouter = Router()

authRouter.post(
  '/register',
  asyncHandler(async (req, res) => {
    const email = requireEmail(req.body?.email)
    const name = requireString(req.body?.name, 'name', { max: 100 })
    const password = requirePassword(req.body?.password)

    if (await findUserByEmail(email)) {
      throw conflict('User already exists')
    }

    const user = await createUser({ email, name, passwordHash: await hashPassword(password) })
    const tokens = await issueTokenPair(user.id)

    res.status(201).json({ success: true, user: toUserDTO(user), ...tokens })
  })
)

authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const email = requireEmail(req.body?.email)
    const password = requirePassword(req.body?.password)

    const user = await findUserByEmail(email)
    const isPasswordValid = user ? await verifyPassword(password, user.password_hash) : false

    if (!user || !isPasswordValid) {
      throw unauthorized('email or password are incorrect')
    }

    const tokens = await issueTokenPair(user.id)

    res.json({ success: true, user: toUserDTO(user), ...tokens })
  })
)

authRouter.post(
  '/logout',
  asyncHandler(async (req, res) => {
    const refreshToken = req.body?.token

    if (typeof refreshToken === 'string' && refreshToken) {
      await revokeRefreshToken(refreshToken)
    }

    res.json({ success: true, message: 'Successful logout' })
  })
)

authRouter.post(
  '/token',
  asyncHandler(async (req, res) => {
    const refreshToken = req.body?.token

    if (typeof refreshToken !== 'string' || !refreshToken) {
      throw unauthorized('Token is invalid')
    }

    const refreshed = await refreshTokenPair(refreshToken)

    if (!refreshed) {
      throw unauthorized('Token is invalid')
    }

    res.json({ success: true, ...refreshed.tokens })
  })
)

authRouter.get(
  '/user',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await findUserById(req.userId!)

    if (!user) {
      throw unauthorized('User not found')
    }

    res.json({ success: true, user: toUserDTO(user) })
  })
)

authRouter.patch(
  '/user',
  requireAuth,
  asyncHandler(async (req, res) => {
    const body = req.body ?? {}
    const patch: { email?: string; name?: string; passwordHash?: string } = {}

    if (typeof body.name === 'string' && body.name.trim()) {
      patch.name = requireString(body.name, 'name', { max: 100 })
    }

    if (typeof body.email === 'string' && body.email.trim()) {
      const email = requireEmail(body.email)
      const existing = await findUserByEmail(email)

      if (existing && existing.id !== req.userId) {
        throw conflict('User with such email already exists')
      }

      patch.email = email
    }

    // Пустой пароль означает «не менять», так форма профиля отправляется целиком.
    if (typeof body.password === 'string' && body.password) {
      patch.passwordHash = await hashPassword(requirePassword(body.password))
      await revokeAllUserTokens(req.userId!)
    }

    const user = await updateUser(req.userId!, patch)

    if (!user) {
      throw unauthorized('User not found')
    }

    res.json({ success: true, user: toUserDTO(user) })
  })
)
