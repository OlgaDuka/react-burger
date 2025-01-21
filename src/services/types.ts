import {IIngredientItem, TLoginUser, TProfileUser, TResetPassword, TSendEmail} from '../utils/types'

export interface IConstructorState {
  bun: IIngredientItem | null,
  fillings: IIngredientItem[],
  totalPrice: number
}

export interface IDetailState {
  selectedIngredient: IIngredientItem
}

export interface  IIngredientsState {
  ingredients: IIngredientItem[],
  loading: boolean,
  hasError: boolean
}

export interface IOrderState {
  orderId: number | null,
  loading: boolean,
  hasError: boolean,
  error: string | null
}

export type TFormObject = TLoginUser | TResetPassword | TProfileUser | TSendEmail

export type TForm<T> = {
  [key:string]: string
}

export interface IUserState {
  user: TForm<TFormObject> | null
  success: boolean
  isAuthChecked: boolean
  loading: boolean
  error: string | null
}




