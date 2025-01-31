import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import burgerConstructor from './slices/burger-constructor'
import details from './slices/details'
import ingredients from './slices/ingredients'
import order from './slices/order'
import user from './slices/user'
import { reducer as ws } from './slices/ws'
import createWebSocketMiddleware from "./middleware/socket-middleware";
import {wsActionsCreator} from "./slices/ws";
export const store = configureStore({
 reducer: {
   burgerConstructor,
   details,
   ingredients,
   order,
   user,
   ws
 },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createWebSocketMiddleware(wsActionsCreator))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector