import {clearOrder, orderSlice} from './order'
import {IOrderState} from "../types/state-types";
import {getOrder, sendOrder} from "../thunks";
import {DATA_INGREDIENTS, DATA_ORDERS} from "../../utils/mock-data";
describe('orderSlice', () => {
  const { reducer } = orderSlice
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

  it('получаем начальное состояние', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('очищаем хранилище', () => {
    const action = clearOrder()
    const state = reducer(initialState, action)

    expect(state).toEqual(initialState)
  })

  it('создаем заказ', () => {
    const payload = DATA_ORDERS[0]
    const action = sendOrder.fulfilled(payload, '', DATA_INGREDIENTS)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      order: DATA_ORDERS[0],
      loading: false,
      hasError: false,
      error: null
    })
  })

  it('получаем данные по заказу', () => {
    const payload = DATA_ORDERS[0]
    const action = getOrder.fulfilled(payload, '', '')
    const state = reducer(initialState, action)

    expect(state).toEqual({
      order: DATA_ORDERS[0],
      loading: false,
      hasError: false,
      error: null
    })
  })
})