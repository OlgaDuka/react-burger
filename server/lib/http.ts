import { NextFunction, Request, RequestHandler, Response } from 'express'

/** Ошибка с HTTP-статусом: обработчик ниже превращает её в `{success:false, message}`. */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export const badRequest = (message: string): HttpError => new HttpError(400, message)
export const unauthorized = (message = 'Invalid or missing token'): HttpError =>
  new HttpError(401, message)
export const notFound = (message: string): HttpError => new HttpError(404, message)
export const conflict = (message: string): HttpError => new HttpError(409, message)

/** Express 4 не перехватывает ошибки async-обработчиков, поэтому оборачиваем их вручную. */
export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    handler(req, res, next).catch(next)
  }
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof HttpError) {
    res.status(error.status).json({ success: false, message: error.message })
    return
  }

  console.error('[api] необработанная ошибка:', error)

  res.status(500).json({ success: false, message: 'Internal Server Error' })
}
