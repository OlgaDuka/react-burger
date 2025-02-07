import {createAction, createReducer} from '@reduxjs/toolkit'
import {TOrder, TOrderItem} from '../../utils/types'
import {groupOrderById} from '../functions'
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_DISCONNECTED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from '../types/ws-action-types'

interface IWSState {
  successConnect: boolean
  orders: TOrderItem[]
  ordersMap: TOrder
  total: number
  totalToday: number
  error?: Event
}

export interface IDataMessage {
  orders: TOrderItem[];
  total: number;
  totalToday: number
}

const initialState: IWSState = {
  successConnect: false,
  total: 0,
  totalToday: 0,
  orders: [],
  ordersMap: {}
}

export const wsConnectionStart = createAction<string>(WS_CONNECTION_START)
export const wsConnectionSuccess = createAction<Event>(WS_CONNECTION_SUCCESS)
export const wsConnectionError = createAction<Event>(WS_CONNECTION_ERROR)
export const wsDisconnected = createAction<CloseEvent>(WS_DISCONNECTED)
export const wsConnectionClosed = createAction(WS_CONNECTION_CLOSED)
export const wsGetMessage = createAction<IDataMessage>(WS_GET_MESSAGE)
export const wsSendMessage = createAction<string>(WS_SEND_MESSAGE)

export const reducer = createReducer(initialState, ({ addCase }) => {
  addCase(wsConnectionSuccess, state => {
    state.successConnect = true
    state.error = undefined
  })
  addCase(wsConnectionError, (state, {payload}) => {
    console.log('payload: ', payload)
    state.successConnect = false
    state.error = payload
  })
  addCase(wsConnectionClosed, state => {
    state.successConnect = false
    state.error = undefined
  })
  addCase(wsGetMessage, (state, {payload}) => {
    const {orders, total, totalToday} = payload
    state.error = undefined
    state.orders = orders
    state.ordersMap = groupOrderById(orders, false)
    state.total = total
    state.totalToday=totalToday
  })
})
