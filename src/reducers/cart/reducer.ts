import { produce } from 'immer'
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
        // return  {
        //   ...state,
        //   cart: [... state.cart, action.payload.item]
        // }
        return produce(state, (draft)=> {
          const itemAlreadyAdded = draft.cart.find(
            (item) => item.id === action.payload.item.id,
          )

          if(itemAlreadyAdded) {
            itemAlreadyAdded.quantity += action.payload.item.quantity
          } else {
            draft.cart.push(action.payload.item)
          }
        })
      case ActionTypes.REMOVE_ITEM:
        return {... state}
      case ActionTypes.INCREMENT_ITEM_QUANTITY:
        return {
          ...state,
        }
      case ActionTypes.DECREMENT_ITEM_QUANTITY:
        return {... state}
      
      case ActionTypes.CHECKOUT_CART: 
        // action.payload.callback(`/order/${action.payload.order.id}/success`)
        // return {...state}
        return produce(state, (draft)=> {
          const newOrder:Order = {
                id: new Date().getTime(),
                items: state.cart,
                ...action.payload.order,
            }
                draft.orders.push(newOrder),
                draft.cart = []

                action.payload.callback(`/order/${newOrder.id}/success`)
        })
      default:
        return state
    }
    return state
}