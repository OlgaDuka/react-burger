import {reducer, wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetMessage} from './ws'
import {TOrderItem} from '../../utils/types'

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
    const mockOrders: TOrderItem[] = [{
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
        _id:'67ac750a133acd001be50618',
        name:'Флюоресцентный люминесцентный бургер',
        status: 'done',
        number: 68200,
        createdAt:'2025-02-12T10:16:42.055Z',
        updatedAt: '2025-02-12T10:16:42.696Z'
      },
    ]

    const action = wsGetMessage({
      orders: mockOrders,
      total: 67826,
      totalToday: 41
    });

    const state = reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      orders: mockOrders,
      ordersMap: {
        123: {
             _id: "123",
             createdAt: "123",
             ingredients: ['123'],
             name: 'test',
             'number': 123,
             'status': 'done',
             'updatedAt': '1234',
        }
      },
      total: 600,
      totalToday: 50,
      error: undefined,
    })
  })
})