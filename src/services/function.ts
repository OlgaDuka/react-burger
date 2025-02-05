import {TOrderItem} from "../utils/types";

export function groupOrderById(orders: TOrderItem[], isUser: boolean) {
  if (!orders.length) return {}
  const resultOrders = isUser ? orders.reverse() : orders

  return resultOrders.reduce((obj: {}, item: TOrderItem) => {
    return {...obj, [item.number]: item }
  }, {})
}
