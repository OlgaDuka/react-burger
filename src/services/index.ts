import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import burgerConstructor from './slices/burger-constructor'
import details from './slices/details'
import ingredients from './slices/ingredients'
import order from './slices/order'
import user from './slices/user'

export const store = configureStore({
 reducer: {
   burgerConstructor,
   details,
   ingredients,
   order,
   user
 }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector