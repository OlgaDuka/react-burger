import {createAction, createReducer} from "@reduxjs/toolkit";
import {TOrderItem} from "../../utils/types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from "../middleware/action-types/ws-action-types";

interface IWSState {
  successConnect: boolean
  orders: TOrderItem[]
  total: number
  totalToday: number
  error?: Event
}

interface IDataMessage {
  orders: TOrderItem[];
  total: number;
  totalToday: number
}

const initialState: IWSState = {
  successConnect: false,
  total: 0,
  totalToday: 0,
  orders: []
};

export const wsConnectionStart = createAction<string>(WS_CONNECTION_START)
export const wsConnectionSuccess = createAction(WS_CONNECTION_SUCCESS)
export const wsConnectionError = createAction<Event>(WS_CONNECTION_ERROR)
export const wsConnectionClosed = createAction(WS_CONNECTION_CLOSED)
export const wsGetMessage = createAction<IDataMessage>(WS_GET_MESSAGE)
export const wsSendMessage = createAction(WS_SEND_MESSAGE)

export const reducer = createReducer(initialState, ({ addCase }) => {
  addCase(wsConnectionSuccess, state => {
    state.successConnect = true
    state.error = undefined
  });
  addCase(wsConnectionError, (state, {payload}) => {
    state.successConnect = false
    state.error = payload
  });
  addCase(wsConnectionClosed, state => {
    state.successConnect = false
    state.error = undefined
  });
  addCase(wsGetMessage, (state, {payload}) => {
    const {orders, total, totalToday} = payload
    state.error = undefined
    state.orders = orders
    state.total = total
    state.totalToday=totalToday
  });
});

export type WsActionsType =
  ReturnType<typeof wsConnectionStart>
  | ReturnType<typeof wsConnectionSuccess>
  | ReturnType<typeof wsConnectionError>
  | ReturnType<typeof wsConnectionClosed>
  | ReturnType<typeof wsGetMessage>
  | ReturnType<typeof wsSendMessage>

export const wsActionsCreator = {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
}

export interface IWsActionsCreator {
  wsConnectionSuccess: typeof wsConnectionSuccess
  wsConnectionError: typeof wsConnectionError
  wsConnectionClosed: typeof wsConnectionClosed
  wsGetMessage: typeof wsGetMessage
}