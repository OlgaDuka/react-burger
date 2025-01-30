import {ReactElement, ReactNode} from 'react'

export interface IIngredientItem {
  _id: string
    name: string
    image: string
    price: number
    type: string
    calories: number
    proteins: number
    fat: number
    carbohydrates: number
    count: number
    oguid?: string
}

export interface IIngredientProps {
  item: IIngredientItem
}

export interface IDraggDataProps {
  fromIndex: number
  toIndex: number
}

export interface IDraggableElProps {
  item: IIngredientItem
  index: number
}

export interface IBlankBurgerProps {
  position?: string
  text: string
  isHover: boolean
}

export interface IMenuItemProps {
  text: string
  children: ReactNode
}

export interface IModalProps {
  onClose: () => void
  header?: string
  children?: ReactNode
}

export interface IAttributeProps {
  name: string
  value: number
}

export interface IProtectedRouteProps {
  element: ReactElement
  anonimus?: boolean
}

export type TLoginUser = {
  name: string
  email: string
}

export type TProfileUser = {
  name: string
  email: string
  password: string
}

export type TResetPassword = {
  password: string
  token: string
}

export type TSendEmail = {
  email: string
}

export type TErrorResponse = {
  success: boolean
  message: string
}

export type TOrderStatus = 'created' | 'pending' | 'done'

export type TOrderItem = {
  readonly _id: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly ingredients: string[]
  readonly name: string
  readonly number: number
  readonly status: TOrderStatus
}

export interface IFeedCardProps {
  order: TOrderItem
}

export type TOrder = {
  readonly success: boolean
  readonly order: TOrderItem[]
  readonly total: number
  readonly totalToday: number
}

/*
export interface IFeedListProps {
  orders: TOrder
} */



