import {reducer, wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage} from './ws'
import {TOrderItem} from '../../utils/types'
import {DATA_ORDERS} from '../../utils/mock-data'

describe('WebSocket редьюсер', () => {
  const initialState = {
    successConnect: false,
    total: 0,
    totalToday: 0,
    orders: [],
    ordersMap: {}
  }

  it('получаем начальное состояние', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('выполняем соединение с успехом', () => {
    const mockEvent = new Event('connect')
    const action = wsConnectionSuccess(mockEvent)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      successConnect: true,
      error: undefined,
    })
  })

  it('получаем ошибку соединения', () => {
    const mockError = new Event('error')
    const action = wsConnectionError(mockError)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      successConnect: false,
      error: mockError,
    })
  })

  it('закрываем соединение', () => {
    const connectedState = {
      successConnect: true,
      total: 0,
      totalToday: 0,
      orders: [],
      ordersMap: {},
      error: undefined,
    };

    const action = wsConnectionClosed()
    const state = reducer(connectedState, action)

    expect(state).toEqual({
      ...initialState,
      successConnect: false,
      error: undefined,
    })
  })

  it('получаем сообщение и загружаем данные в хранилище', () => {
    const mockOrders: TOrderItem[] = DATA_ORDERS
    const action = wsGetMessage({
      orders: mockOrders,
      total: 67826,
      totalToday: 41
    })

    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      orders: mockOrders,
      ordersMap: {
        '68200': DATA_ORDERS[0]
      },
      total: 67826,
      totalToday: 41,
      error: undefined,
    })
  })
})