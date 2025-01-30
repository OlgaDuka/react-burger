import {Middleware, MiddlewareAPI} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from '..';
import {IWsActionsCreator, WsActionsType} from "../slices/ws";
import {WS_CONNECTION_START, WS_SEND_MESSAGE} from "./action-types/ws-action-types";

export const createWebSocketMiddleware = (wsActionsCreator: IWsActionsCreator): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return next => (action: WsActionsType) => {
      const {
        wsConnectionSuccess,
        wsConnectionError,
        wsConnectionClosed,
        wsGetMessage
      } = wsActionsCreator
      const { type, payload} = action
      const { dispatch} = store

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(payload as string)
      }

      if (socket) {
        socket.onopen = () => dispatch(wsConnectionSuccess())
        socket.onerror = (event: Event) => dispatch(wsConnectionError(event))
        socket.onclose = () => dispatch(wsConnectionClosed())
        socket.onmessage = (event: MessageEvent) => dispatch(wsGetMessage(JSON.parse(event.data)))
      }

      if (type === WS_SEND_MESSAGE) {
        socket?.send(JSON.stringify(payload))
      }

      next(action)
    }
  }) as Middleware
}

export default createWebSocketMiddleware;