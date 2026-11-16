import cors from 'cors'
import express, { Express } from 'express'
import { config } from './config'
import { query } from './db/pool'
import { docsRouter } from './docs'
import { errorHandler } from './lib/http'
import { authRouter } from './routes/auth'
import { ingredientsRouter } from './routes/ingredients'
import { ordersRouter } from './routes/orders'
import { passwordRouter } from './routes/password'

export function createApp(): Express {
  const app = express()

  app.disable('x-powered-by')
  app.use(cors({ origin: config.corsOrigins }))
  app.use(express.json({ limit: '1mb' }))

  app.use((req, res, next) => {
    const startedAt = Date.now()

    res.on('finish', () => {
      console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - startedAt} мс)`)
    })

    next()
  })

  app.get('/api/health', async (_req, res) => {
    try {
      await query('select 1')
      res.json({ success: true, status: 'ok' })
    } catch (error) {
      res.status(503).json({ success: false, status: 'db-unavailable', message: (error as Error).message })
    }
  })

  app.use('/api/ingredients', ingredientsRouter)
  app.use('/api/orders', ordersRouter)
  app.use('/api/auth', authRouter)
  app.use('/api', passwordRouter)
  app.use('/api', docsRouter)

  app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Not found' })
  })

  app.use(errorHandler)

  return app
}
