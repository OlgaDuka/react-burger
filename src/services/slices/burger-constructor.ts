import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IDraggDataProps, IIngredientItem} from '../../utils/types'
import {IConstructorState} from '../types/state-types'

export const initialState: IConstructorState = {
  bun: null,
  fillings: [],
  totalPrice: 0
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state: IConstructorState, { payload }) => {
      const { data, oguid } = payload
      const ingredient = Object.assign({}, data)
      ingredient.oguid = oguid

      if (data.type === 'bun') {
        return {
          ...state,
          bun: ingredient,
          totalPrice: state.totalPrice + data.price * 2
        }
      }
      return {
        ...state,
        fillings: [...state.fillings, ingredient],
        totalPrice: state.totalPrice + data.price
      }
    },
    deleteIngredient: (state: IConstructorState, action: PayloadAction<IIngredientItem>) => {
      const lostIngredients = state.fillings.filter((item: IIngredientItem) => item.oguid !== action.payload.oguid)
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
    sortingIngredients: (state: IConstructorState, action: PayloadAction<IDraggDataProps>) => {
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