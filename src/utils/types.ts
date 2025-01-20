import {ReactElement, ReactNode} from 'react'

export interface IngredientItem {
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

export interface IngredientProps {
  item: IngredientItem
}

export interface DraggDataProps {
  fromIndex: number
  toIndex: number
}

export interface DraggableElProps {
  item: IngredientItem
  index: number
}

export interface BlankBurgerProps {
  position?: string
  text: string
  isHover: boolean
}

export interface MenuItemProps {
  text: string
  children: ReactNode
}

export interface ModalProps {
  onClose: () => void
  header?: string
  children?: ReactNode
}

export interface AttributeProps {
  name: string
  value: number
}

export interface ProtectedRouteProps {
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
  success: boolean;
  message: string;
}
