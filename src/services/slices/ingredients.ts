import {IIngredientItem} from '../../utils/types'
import {createSlice} from '@reduxjs/toolkit'
import {IIngredientsState} from '../types/state-types'
import {fetchIngredients} from '../thunks'
import {groupIngredientsById} from "../functions";

const initialState: IIngredientsState = {
  ingredients: [],
  ingredientsMap: {},
  loading: false,
  hasError: false
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
     increaseIngredient: (state: IIngredientsState, { payload }) => {
       const cloneIngredientsMap = Object.assign({}, state.ingredientsMap)
       const movedIngredient = Object.assign({}, cloneIngredientsMap[payload])

       if (movedIngredient.type === 'bun') {
         movedIngredient.count = 2
       } else {
         movedIngredient.count++
       }
       cloneIngredientsMap[payload] = movedIngredient

       return { ...state, ingredientsMap: cloneIngredientsMap }
     },
     decreaseIngredient: (state: IIngredientsState, { payload }) => {
       const cloneIngredientsMap = Object.assign({}, state.ingredientsMap)
       const movedIngredient = Object.assign({}, cloneIngredientsMap[payload])

       if (movedIngredient.type === 'bun') {
         movedIngredient.count = 0
       } else {
         movedIngredient.count--
       }
       cloneIngredientsMap[payload] = movedIngredient

       return { ...state, ingredientsMap: cloneIngredientsMap }
    },
    resetCount: (state: IIngredientsState) => {
       state.ingredients = state.ingredients.map((item: IIngredientItem) => {
          item.count = 0
          return item
       })
       state.ingredientsMap = groupIngredientsById(state.ingredients)
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
        state.ingredientsMap = groupIngredientsById(payload)
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