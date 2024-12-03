import { v4 as uuidv4 } from 'uuid'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const  DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const SORTING_INGREDIRNTS = 'SORTING_INGREDIRNTS'
export const  CLEAR_BURGER = 'CLEAR_BURGER'

export const addIngredient = (item) => {
 const ingredient = Object.assign({}, item)
 ingredient.oguid = uuidv4()

 return {
  type: ADD_INGREDIENT,
  payload: ingredient
 }
}

export const deleteIngredient = (ingredient) => ({
 type: DELETE_INGREDIENT,
 payload: ingredient
})

export const sortingIngredients = (fromIndex, toIndex) => ({
 type: SORTING_INGREDIRNTS,
 payload: { fromIndex, toIndex }
})

export const clearBurger = () => ({ type: CLEAR_BURGER})