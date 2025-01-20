import {createAsyncThunk} from "@reduxjs/toolkit";
import {IngredientItem, TLoginUser, TProfileUser} from '../utils/types'
import {
  getIngredientsRequest,
  getUserRequest,
  loginUserRequest, logoutUserRequest, registerUserRequest,
  sendOrderRequest,
  updateUserRequest
} from '../utils/api'
import {TForm} from './types'

export const fetchIngredients = createAsyncThunk<IngredientItem[], void, { rejectValue: string }>(
  'ingredients/fetchIngredients',
  async () => await getIngredientsRequest()
)

export const sendOrder = createAsyncThunk<number, string[], { rejectValue: string }>(
  'order/fetchOrder',
  async (ingredients: string[]) => await sendOrderRequest(ingredients)
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

