import {CLEAR_ORDER, SEND_ORDER, SEND_ORDER_ERROR, SEND_ORDER_SUCCESS} from '../actions/order'

const initialState = {
  orderId: null,
  loading: false,
  hasError: false
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER: {
      return { ...state, loading: true }
    }
    case SEND_ORDER_SUCCESS: {
      return { ...state, loading: false, hasError: false, orderId: action.payload }
    }
    case SEND_ORDER_ERROR: {
      return { ...state, loading: false, hasError: true, orderId: null }
    }
    case CLEAR_ORDER: {
      return { ...state, loading: false, hasError: false, orderId: null }
    }
    default:
      return state
  }
}