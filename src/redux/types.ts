import {IngredientItem, TForm, TLoginUser, TProfileUser, TResetPassword, TSendEmail} from "../utils/types";

export interface ConstructorState {
  bun: IngredientItem | null,
  fillings: IngredientItem[],
  totalPrice: number
}

export interface DetailState {
  selectedIngredient: IngredientItem
}

export interface  IngredientsState {
  ingredients: IngredientItem[],
  loading: boolean,
  hasError: boolean
}

export interface OrderState {
  orderId: number | null,
  loading: boolean,
  hasError: boolean,
  error: string | null
}

export type TFormObject = TLoginUser | TResetPassword | TProfileUser | TSendEmail

export interface UserState {
  user: TForm<TFormObject> | null
  success: boolean
  isAuthChecked: boolean
  loading: boolean
  error: string | null
}




