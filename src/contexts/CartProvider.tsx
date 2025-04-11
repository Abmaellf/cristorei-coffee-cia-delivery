import { createContext, ReactNode, useReducer } from "react";
import { OrderInfo } from "../pages/Cart";
import {useNavigate } from "react-router-dom";
import { CartReducer, Item, Order } from "../reducers/cart/reducer";
import { addItemAction, checkoutCartAction, decrementItemQuantityAction, incrementItemQuantityAction, removeItemAction } from "../reducers/cart/actions";

interface CartContextType {
    cart: Item[]
    orders: Order[]  //Preciso criar uma interface que 
    addItem: (item: Item)=> void
    incrementItemQuantity:(itemId: string) => void
    decrementItemQuantity:(itemId: string) => void
    removeItem:(itemId: string) => void
    checkout:(order: OrderInfo) => void  
}

// a constante mais IMPORTANTE pois é o nome que será utilizado para IMPORTAR, nos outros arquivos
export const CartContext = createContext({} as CartContextType)

// Essa interface é para TIPAR o meu component local
interface CartContextProviderProps {
    children: ReactNode
}

// COMPONENT LOCAL também serve para envolver os context que devem utilizar da informação
export function CartContextProvider({children}: CartContextProviderProps) {

    // const [cart, setItem] = useState<Item[]>([])
    const [cartState, dispatch] = useReducer(CartReducer, 
      {
       cart: [],
       orders: []

    }) 
    
    const callback = useNavigate()

    const { cart, orders } = cartState
    /* NÃO PODE SER ESSA FUNÇÃO TEM QUE SER UMA QUE VEM DO REDUCER
     */
    function addItem(item: Item) {

        const newItem: Item = {
            id: item.id, 
            quantity: item.quantity 
        }
        dispatch(addItemAction(newItem))
    }

     
    function removeItem(itemId: Item['id']) {
        const itemToRemoveId = cart.findIndex(
            (item) => item.id === itemId,
        )
        cart.splice(itemToRemoveId, 1)   

        dispatch(removeItemAction(itemId))
    }

    function incrementItemQuantity(itemId: string) {
        const itemToIncrement = cart.find(
            (item) => item.id === itemId,
          )
  
          if (itemToIncrement?.id) {
            itemToIncrement.quantity += 1
          }

          dispatch(incrementItemQuantityAction(itemToIncrement.id))
    }

    function decrementItemQuantity(itemId: string) {
        const itemToInDecrement = cart.find(
            (item) => item.id === itemId,
          )
  
          if (itemToInDecrement?.id && itemToInDecrement.quantity > 1) {
            itemToInDecrement.quantity -= 1
          }

          dispatch(decrementItemQuantityAction(itemToInDecrement.id))
    }
   
    function checkout(order: OrderInfo ) {
      const newOrder: Order = {
        id: new Date().getTime(),
        items: cartState.cart,
        ...order,
      }
      
      orders.push(newOrder),
      cartState.cart = []
      dispatch(checkoutCartAction(callback, newOrder))
    }
     
    return(
        <CartContext.Provider 
            value={{ 
                cart,
                orders,
                addItem, 
                incrementItemQuantity, 
                decrementItemQuantity, 
                removeItem,
                checkout
            }}
        >
        {children}
        </CartContext.Provider>
    )
}