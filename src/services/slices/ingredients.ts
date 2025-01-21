import {IIngredientItem} from '../../utils/types'
import {createSlice} from '@reduxjs/toolkit'
import {IIngredientsState} from '../types'
import {fetchIngredients} from '../thunks'

const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  hasError: false
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
     increaseIngredient: (state: IIngredientsState, { payload }) => {
       const cloneIngredients = [...state.ingredients]
       const index = cloneIngredients.findIndex((item: IIngredientItem) => item._id === payload)
       const movedIngredient = Object.assign({}, cloneIngredients[index])

        if (movedIngredient.type === 'bun') {
          movedIngredient.count+=2
        } else {
          movedIngredient.count++
        }
        cloneIngredients.splice(index, 1, movedIngredient)

        return { ...state, ingredients: cloneIngredients }
     },
     decreaseIngredient: (state: IIngredientsState, { payload }) => {
       const cloneIngredients = [...state.ingredients]
       const index = state.ingredients.findIndex((item: IIngredientItem) => item._id === payload)
       const movedIngredient = Object.assign({}, cloneIngredients[index])

        if (movedIngredient.type === 'bun') {
          movedIngredient.count = 0
        } else {
          movedIngredient.count--
        }
        cloneIngredients.splice(index, 1, movedIngredient)

        return { ...state, ingredients: cloneIngredients }
    },
    resetCount: (state: IIngredientsState) => {
       state.ingredients = state.ingredients.map((item: IIngredientItem) => {
          item.count = 0
          return item
       })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state: IIngredientsState) => {
        state.loading = true
        state.hasError = false
      })
      .addCase(fetchIngredients.fulfilled, (state: IIngredientsState, { payload }) => {
        state.loading = false
        state.ingredients = payload;
      })
      .addCase(fetchIngredients.rejected, (state: IIngredientsState) => {
        state.loading = false
        state.hasError = true
      })
  }
})

export const {
  increaseIngredient,
  decreaseIngredient,
  resetCount
} = ingredientsSlice.actions

export default ingredientsSlice.reducer