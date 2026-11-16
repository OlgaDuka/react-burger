import { Router } from 'express'
import { asyncHandler, badRequest, notFound } from '../lib/http'
import { requireAuth } from '../middleware/auth'
import { findIngredientsByIds } from '../repositories/ingredients'
import { createOrder, findOrderByIdOrNumber, listAllOrders } from '../repositories/orders'
import { notifyOrderCreated } from '../ws'

export const ordersRouter = Router()

ordersRouter.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const rawIngredients: unknown = req.body?.ingredients

    if (
      !Array.isArray(rawIngredients) ||
      rawIngredients.length === 0 ||
      !rawIngredients.every((id) => typeof id === 'string')
    ) {
      throw badRequest('Поле «ingredients» должно быть непустым массивом id')
    }

    const ids = rawIngredients as string[]
    const uniqueIds = [...new Set(ids)]
    const found = await findIngredientsByIds(uniqueIds)

    if (found.length !== uniqueIds.length) {
      throw badRequest('Один или несколько ингредиентов не найдены')
    }

    const byId = new Map(found.map((ingredient) => [ingredient._id, ingredient]))
    const ingredients = ids
      .map((id) => byId.get(id))
      .filter((item): item is NonNullable<typeof item> => item !== undefined)

    const order = await createOrder({ userId: req.userId!, ingredients })

    notifyOrderCreated(req.userId!).catch((error) => console.error('[ws] рассылка:', error))

    res.json({ success: true, order })
  })
)

ordersRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const orders = await listAllOrders()

    res.json({ success: true, orders })
  })
)

ordersRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const order = await findOrderByIdOrNumber(req.params.id)

    if (!order) {
      throw notFound('Order not found')
    }

    res.json({ success: true, orders: [order] })
  })
)
