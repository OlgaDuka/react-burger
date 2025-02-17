import {clearOrder, initialState, orderSlice} from './order'
import {getOrder, sendOrder} from '../thunks'
import {DATA_INGREDIENTS, DATA_ORDERS} from '../../utils/mock-data'
describe('orderSlice', () => {
  const { reducer } = orderSlice

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
      ...initialState,
      order: DATA_ORDERS[0]
    })
  })

  it('получаем данные по заказу', () => {
    const payload = DATA_ORDERS[0]
    const action = getOrder.fulfilled(payload, '', '')
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      order: DATA_ORDERS[0]
    })
  })
})