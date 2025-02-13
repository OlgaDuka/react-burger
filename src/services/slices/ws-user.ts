import {createAction, createReducer} from '@reduxjs/toolkit'
import {TOrder, TOrderItem} from '../../utils/types'
import {groupOrderById} from '../functions'
import {
  WSUSER_CONNECTION_CLOSED,
  WSUSER_CONNECTION_ERROR,
  WSUSER_CONNECTION_START,
  WSUSER_CONNECTION_SUCCESS,
  WSUSER_DISCONNECTED,
  WSUSER_GET_MESSAGE,
  WSUSER_SEND_MESSAGE
} from '../types/ws-action-types'

interface IWS_User_State {
  successConnect: boolean
  orders: TOrderItem[]
  ordersMap: TOrder
  error?: Event
}

export interface IDataUserMessage {
  orders: TOrderItem[]
}

const initialState: IWS_User_State = {
  successConnect: false,
  orders: [],
  ordersMap: {}
}

export const wsUserConnectionStart = createAction<string>(WSUSER_CONNECTION_START)
export const wsUserConnectionSuccess = createAction<Event>(WSUSER_CONNECTION_SUCCESS)
export const wsUserConnectionError = createAction<Event>(WSUSER_CONNECTION_ERROR)
export const wsUserDisconnected = createAction<CloseEvent>(WSUSER_DISCONNECTED)
export const wsUserConnectionClosed = createAction(WSUSER_CONNECTION_CLOSED)
export const wsUserGetMessage = createAction<IDataUserMessage>(WSUSER_GET_MESSAGE)
export const wsUserSendMessage = createAction<string>(WSUSER_SEND_MESSAGE)

export const reducer = createReducer(initialState, ({ addCase }) => {
  addCase(wsUserConnectionSuccess, state => {
    state.successConnect = true
    state.error = undefined
  })
  addCase(wsUserConnectionError, (state, {payload}) => {
    state.successConnect = false
    state.error = payload
  })
  addCase(wsUserConnectionClosed, state => {
    state.successConnect = false
    state.error = undefined
  })
  addCase(wsUserGetMessage, (state, {payload}) => {
    const {orders} = payload
    state.error = undefined
    state.orders = orders
    state.ordersMap = groupOrderById(orders, true)
  })
})
