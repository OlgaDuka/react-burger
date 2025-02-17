import {IIngredientItem, TOrder, TOrderItem} from '../utils/types'
import {TIngredient} from "./types/state-types";

export function groupOrderById(orders: TOrderItem[], isUser: boolean): TOrder {
  if (!orders.length) return {}
  const resultOrders = isUser ? orders.reverse() : orders

  return resultOrders.reduce((obj: {}, item: TOrderItem) => {
    return {...obj, [item.number]: item }
  }, {})
}

export function groupIngredientsById(array: IIngredientItem[]): TIngredient {
  if (!array.length) return {}

  return array.reduce((obj: {}, item: IIngredientItem) => {
    return {...obj, [item._id]: item }
  }, {})
}


