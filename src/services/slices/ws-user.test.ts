import {TOrderItem} from '../../utils/types'
import {DATA_ORDERS} from '../../utils/mock-data'
import {
  reducer,
  wsUserConnectionClosed,
  wsUserConnectionError,
  wsUserConnectionSuccess,
  wsUserGetMessage
} from './ws-user'

describe('WebSocket редьюсер', () => {
  const initialState = {
    successConnect: false,
    orders: [],
    ordersMap: {}
  }

  it('получаем начальное состояние', () => {
    expect(reducer(undefined, {type: 'unknown'})).toEqual(initialState)
  })

  it('выполняем соединение с успехом', () => {
    const mockEvent = new Event('connect')
    const action = wsUserConnectionSuccess(mockEvent)
    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      successConnect: true,
      error: undefined,
    })
  })

  it('получаем ошибку соединения', () => {
    const mockError = new Event('error')
    const action = wsUserConnectionError(mockError)
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
      orders: [],
      ordersMap: {},
      error: undefined,
    };

    const action = wsUserConnectionClosed()
    const state = reducer(connectedState, action)

    expect(state).toEqual({
      ...initialState,
      successConnect: false,
      error: undefined,
    })
  })

  it('получаем сообщение и загружаем данные в хранилище', () => {
    const mockOrders: TOrderItem[] = DATA_ORDERS
    const action = wsUserGetMessage({
      orders: mockOrders,
    })

    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      orders: mockOrders,
      ordersMap: {
        '68200': DATA_ORDERS[0]
      },
      error: undefined,
    })
  })
})