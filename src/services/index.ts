import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import burgerConstructor from './slices/burger-constructor'
import details from './slices/details'
import ingredients from './slices/ingredients'
import order from './slices/order'
import user from './slices/user'
import {
  reducer as ws,
  IDataMessage,
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionClosed,
  wsDisconnected,
  wsConnectionError,
  wsGetMessage,
  wsSendMessage
} from './slices/ws'
import {
  reducer as wsUser,
  IDataUserMessage,
  wsUserConnectionStart,
  wsUserConnectionSuccess,
  wsUserConnectionClosed,
  wsUserDisconnected,
  wsUserConnectionError,
  wsUserGetMessage,
  wsUserSendMessage
} from './slices/ws-user'
import createWebSocketMiddleware from './middleware/socket-middleware'

const webSocketMiddleware = createWebSocketMiddleware<IDataMessage>(
  {
    connect: wsConnectionStart,
    disconnect: wsConnectionClosed,
    sendMessage: wsSendMessage,
    onConnected: wsConnectionSuccess,
    onDisconnected: wsDisconnected,
    onMessageReceived: wsGetMessage,
    onError: wsConnectionError,
  },
  {
    withTokenRefresh: false,
  }
)

const userWebSocketMiddleware = createWebSocketMiddleware<IDataUserMessage>(
  {
    connect: wsUserConnectionStart,
    disconnect: wsUserConnectionClosed,
    sendMessage: wsUserSendMessage,
    onConnected: wsUserConnectionSuccess,
    onDisconnected: wsUserDisconnected,
    onMessageReceived: wsUserGetMessage,
    onError: wsUserConnectionError,
  },
  {
    withTokenRefresh: true,
  }
)

const rootReducer = combineReducers({
  burgerConstructor,
  details,
  ingredients,
  order,
  user,
  ws,
  wsUser
})

export const store = configureStore({
 reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
    .concat(webSocketMiddleware)
    .concat(userWebSocketMiddleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector