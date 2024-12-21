import {sendOrderRequest} from '../../utils/api'

export const SEND_ORDER = 'SEND_ORDER'
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS'
export const SEND_ORDER_ERROR = 'SEND_ORDER_ERROR'
export const CLEAR_ORDER = 'CLEAR_ORDER'

export const sendOrder = (ingredients) => (dispatch) => {
  dispatch({ type: SEND_ORDER })

  sendOrderRequest(ingredients)
    .then((res) => dispatch({
      type: SEND_ORDER_SUCCESS,
      payload: res.number
    }))
    .catch(() => dispatch({
      type: SEND_ORDER_ERROR,
      payload: null
    }))
}

export const clearOrder = () => ({ type: CLEAR_ORDER})