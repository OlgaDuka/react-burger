import {createSlice} from '@reduxjs/toolkit'
import {IOrderState} from '../types'
import {getOrder, sendOrder} from '../thunks'

const initialState: IOrderState = {
  order: {
    _id: '',
    createdAt: '',
    updatedAt: '',
    ingredients: [],
    name: '',
    number: 0,
    status: 'created'
  },
  loading: false,
  hasError: false,
  error: null
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state: IOrderState) => {
        state.loading = true
        state.hasError = false
      })
      .addCase(sendOrder.fulfilled, (state: IOrderState, { payload}) => {
        state.loading = false
        state.order = payload
      })
      .addCase(sendOrder.rejected, (state: IOrderState, action) => {
        state.loading = false
        state.hasError = true
        state.error = String(action.error.message)
      })
      .addCase(getOrder.pending, (state: IOrderState) => {
        state.loading = true
        state.hasError = false
      })
      .addCase(getOrder.fulfilled, (state: IOrderState, { payload}) => {
        state.loading = false
        state.order = payload
      })
      .addCase(getOrder.rejected, (state: IOrderState, action) => {
        state.loading = false
        state.hasError = true
        state.error = String(action.error.message)
      })
  }
})

export const {
  clearOrder
} = orderSlice.actions
export default orderSlice.reducer