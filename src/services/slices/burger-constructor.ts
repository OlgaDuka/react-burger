import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DraggDataProps, IngredientItem} from '../../utils/types'
import {v4 as uuidv4} from 'uuid'
import {ConstructorState} from '../types'

const initialState:ConstructorState = {
  bun: null,
  fillings: [],
  totalPrice: 0
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state: ConstructorState, { payload }) => {
      const ingredient = Object.assign({}, payload)
      ingredient.oguid = uuidv4()

      if (payload.type === 'bun') {
        return {
          ...state,
          bun: ingredient,
          totalPrice: state.totalPrice + payload.price * 2
        }
      }
      return {
        ...state,
        fillings: [...state.fillings, ingredient],
        totalPrice: state.totalPrice + payload.price
      }
    },
    deleteIngredient: (state: ConstructorState, action: PayloadAction<IngredientItem>) => {
      const lostIngredients = state.fillings.filter((item: IngredientItem) => item.oguid !== action.payload.oguid)
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: null,
          totalPrice: state.totalPrice - action.payload.price * 2
        }
      }
      return {
        ...state,
        fillings: lostIngredients,
        totalPrice: state.totalPrice - action.payload.price
      }
    },
    sortingIngredients: (state: ConstructorState, action: PayloadAction<DraggDataProps>) => {
      const ingredients = [...state.fillings]
      ingredients.splice(action.payload.toIndex, 0,
        ingredients.splice(action.payload.fromIndex, 1)[0])
      return {...state, fillings: ingredients}
    },
    clearBurger: () => initialState
  }
})

export const {
  addIngredient,
  deleteIngredient,
  sortingIngredients,
  clearBurger
} = constructorSlice.actions
export default constructorSlice.reducer