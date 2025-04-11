import { OrderInfo } from "../../pages/Cart"
import { ActionTypes } from "./actions"

export interface Item {
    id: string
    quantity:  number
}
export interface Order extends OrderInfo {
    id: number
    items: Item[]
  }

export interface CartState {
   cart: Item[]
   orders: Order[]
}


export function CartReducer(state: CartState, action: any)  {
    
    switch (action.type ) {
      case ActionTypes.ADD_ITEM:
        return  {
          ...state,
          cart: [... state.cart, action.payload.item]
        }
      case ActionTypes.INCREMENT_ITEM_QUANTITY:
        return {
          ...state,
        }
      case ActionTypes.DECREMENT_ITEM_QUANTITY:
        return {... state}
      case ActionTypes.REMOVE_ITEM:
        return {... state}
      case ActionTypes.CHECKOUT_CART: 
        action.payload.callback(`/order/${action.payload.newOrder.id}/success`)
        return state
      default:
        return state
    }
    return state
}