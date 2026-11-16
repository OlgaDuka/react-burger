import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      /** Заполняется middleware `requireAuth` после проверки access-токена. */
      userId?: string
    }
  }
}

export type AuthedRequest = Request & { userId: string }

export {}
