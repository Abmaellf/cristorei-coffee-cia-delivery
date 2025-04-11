import { NavigateFunction } from "react-router-dom";
import { Item, Order } from "./reducer";

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  INCREMENT_ITEM_QUANTITY = 'INCREMENT_ITEM_QUANTITY',
  DECREMENT_ITEM_QUANTITY = 'DECREMENT_ITEM_QUANTITY',
  CHECKOUT_CART = 'CHECKOUT_CART',
}

export function addItemAction(item: Item) {
    return {
      type: ActionTypes.ADD_ITEM,
      payload: {
          item
      },
  }
}

export function removeItemAction(itemId: Item['id']) {
  
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      itemId
    },
  }
}

export function incrementItemQuantityAction(itemId: Item['id']) {
  return {
    type: ActionTypes.INCREMENT_ITEM_QUANTITY,
    payload: {
      itemId
    },
}
}

export function decrementItemQuantityAction(itemId: Item['id']) {
  return {
            type: ActionTypes.DECREMENT_ITEM_QUANTITY,
            payload: {
              itemId
            },
        }
}

export function checkoutCartAction(callback: NavigateFunction, newOrder: Order) {
  return {
            type: ActionTypes.CHECKOUT_CART,
            payload: {
              // orders,
             newOrder,
              callback
            }
        }
}