import {createAsyncThunk} from "@reduxjs/toolkit";
import {IIngredientItem, TLoginUser, TOrderItem, TProfileUser} from '../utils/types'
import {
  getIngredientsRequest, getOrderRequest,
  getUserRequest,
  loginUserRequest, logoutUserRequest, registerUserRequest,
  sendOrderRequest,
  updateUserRequest
} from '../utils/api'
import {TForm} from './types'

export const fetchIngredients = createAsyncThunk<IIngredientItem[], void, { rejectValue: string }>(
  'ingredients/fetchIngredients',
  async () => await getIngredientsRequest()
)

export const sendOrder = createAsyncThunk<TOrderItem, string[], { rejectValue: string }>(
  'orders/sendOrder',
  async (ingredients: string[]) => await sendOrderRequest(ingredients)
)

export const getOrder = createAsyncThunk<TOrderItem, string, { rejectValue: string }>(
  'orders/getOrder',
  async (id: string) => await getOrderRequest(id)
)

export const getUser = createAsyncThunk(
  'user/getUser',
  () => getUserRequest()
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  (user: TForm<TProfileUser>) => updateUserRequest(user)
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  (user: TForm<TLoginUser>) => loginUserRequest(user)
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  () => logoutUserRequest()
)

export const registerUser = createAsyncThunk(
  'user/registerUser',
  (user: TForm<TProfileUser>) => registerUserRequest(user)
)

