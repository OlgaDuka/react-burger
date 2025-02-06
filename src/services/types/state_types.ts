import {
  IIngredientItem,
  TForm,
  TFormObject,
  TOrderItem,
} from '../../utils/types'

export interface IConstructorState {
  bun: IIngredientItem | null,
  fillings: IIngredientItem[],
  totalPrice: number
}

export interface IDetailState {
  selectedIngredient: IIngredientItem
}

export interface  IIngredientsState {
  ingredients: IIngredientItem[]
  ingredientsMap: TIngredient
  loading: boolean
  hasError: boolean
}

export type TIngredient = {
  [key:string]: IIngredientItem
}

export interface IOrderState {
  order: TOrderItem
  loading: boolean
  hasError: boolean
  error: string | null
}

export interface IUserState {
  user: TForm<TFormObject> | null
  success: boolean
  isAuthChecked: boolean
  loading: boolean
  error: string | null
}




