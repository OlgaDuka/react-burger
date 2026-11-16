import { Router } from 'express'
import { asyncHandler, notFound } from '../lib/http'
import { findIngredientById, listIngredients } from '../repositories/ingredients'

export const ingredientsRouter = Router()

ingredientsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const ingredients = await listIngredients()

    res.json({ success: true, data: ingredients })
  })
)

ingredientsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const ingredient = await findIngredientById(req.params.id)

    if (!ingredient) {
      throw notFound('Ingredient not found')
    }

    res.json({ success: true, data: ingredient })
  })
)
