import { v4 as uuidv4 } from 'uuid'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const  DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const  CLEAR_BURGER = 'CLEAR_BURGER'

export const addIngredient = (ingredient) => {
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

export const clearBurger = () => ({ type: CLEAR_BURGER})