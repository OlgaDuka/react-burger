import {createSlice} from '@reduxjs/toolkit'
import {OrderState} from '../types'
import {sendOrder} from '../thunks'

const initialState: OrderState = {
  orderId: null,
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
      .addCase(sendOrder.pending, (state: OrderState) => {
        state.loading = true
        state.hasError = false
      })
      .addCase(sendOrder.fulfilled, (state: OrderState, { payload}) => {
        state.loading = false
        state.orderId = payload
      })
      .addCase(sendOrder.rejected, (state: OrderState, action) => {
        state.loading = false
        state.hasError = true
        state.error = String(action.error.message)
      })
  }
})

export const {
  clearOrder
} = orderSlice.actions
export default orderSlice.reducer;