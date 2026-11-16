import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

const SPEC_PATH = path.join(__dirname, 'openapi.yaml')

export const docsRouter = Router()

/**
 * Исходный YAML: его можно скачать и открыть в Swagger Editor, Postman или
 * сгенерировать по нему клиент. Читаем файл на каждый запрос, чтобы правки
 * были видны без перезапуска сервера.
 */
docsRouter.get('/openapi.yaml', async (_req, res, next) => {
  try {
    const spec = await readFile(SPEC_PATH, 'utf-8')
    res.type('application/yaml').send(spec)
  } catch (error) {
    next(error)
  }
})

/** Swagger UI сам загружает спецификацию по URL — она всегда актуальна. */
docsRouter.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    customSiteTitle: 'Stellar Burger API',
    swaggerOptions: {
      url: '/api/openapi.yaml',
      persistAuthorization: true,
    },
  })
)
