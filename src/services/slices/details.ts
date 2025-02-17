import {IIngredientItem} from '../../utils/types'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IDetailState} from '../types/state-types'

export const initialState: IDetailState = {
  selectedIngredient: {
    name: '',
    image: '',
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    proteins: 0,
    _id: '',
    price: 0,
    type: '',
    count: 0
  }
}

export const detailsSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
   setSelectedIngredient: (state: IDetailState, action: PayloadAction<IIngredientItem>) => {
      return { ...state, selectedIngredient: action.payload }
    },
    clearSelectedIngredient: () => initialState
  }
})

export const {
  setSelectedIngredient,
  clearSelectedIngredient
} = detailsSlice.actions
export default detailsSlice.reducer