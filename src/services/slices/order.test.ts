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

  // Регрессия: при ошибке API срез раньше записывал undefined,
  // и OrderDetails падал на деструктуризации state.order.order.
  it('не затирает заказ пустым ответом', () => {
    const stateWithOrder = {...initialState, order: DATA_ORDERS[0]}
    const action = sendOrder.fulfilled(
      undefined as unknown as typeof DATA_ORDERS[0],
      '',
      DATA_INGREDIENTS
    )
    const state = reducer(stateWithOrder, action)

    expect(state.order).toEqual(DATA_ORDERS[0])
    expect(state.loading).toBe(false)
  })
})