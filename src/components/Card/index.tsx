import { useTheme } from "styled-components";
import { CoffeeImg, Container, Control, Description, Order, Price, Tags, Title } from "./styles";
import { CheckFat, ShoppingCart } from '@phosphor-icons/react'
import { useContext, useEffect, useState } from "react";
import { QuantityInput } from "../Form/QuantityInput";
import { CartContext } from "../../contexts/CartProvider";

type Props = {
    coffee: {
        id: string
        title: string
        description: string
        tags: string[]
        price: number
        image: string
    }
}


export function Card({ coffee }: Props) {
    const [quantity, setQuantity] = useState(1) //Por que não esta no context? Porque só utiliza aqui
    const [isItemAdded, setisItemAdded] = useState(false) //Por que não esta no context? Porque só utiliza aqui
   
    const {  addItem } = useContext(CartContext);
    
    const theme = useTheme()

    function decrementQuantity() {
        if(quantity > 1) {
            setQuantity( (state) => state -1)
        }
    }

    function incrementQuantity() {
        setQuantity((state)=> state + 1)
    }

    function handleAddItem() {
        addItem({id: coffee.id, quantity})
        setisItemAdded(true)
        setQuantity(1)
    }
    
    useEffect(()=> {
        let timeout: number

        if(isItemAdded) {
            timeout = setTimeout(() => {
                setisItemAdded(false)
            }, 1000) 
        }

    }, [isItemAdded] )
        
    return(
        <Container>
            <CoffeeImg src={coffee.image}/>

            <Tags>
                    {coffee.tags.map((tag) => (
                        <span key={tag}> {tag}</span>
                    )
                        
                    )}
            </Tags>

            <Title> { coffee.title }</Title>

            <Description> { coffee.description }</Description>

            <Control>
                <Price>
                    <span> R$ </span>
                    <span> { coffee.price.toFixed(2)}</span>
                </Price>
            

                <Order>
                    <QuantityInput 
                        quantity={quantity}
                        decrementQuantity={decrementQuantity}
                        incrementQuantity={incrementQuantity}
                    />

                    <button disabled={isItemAdded} onClick={handleAddItem} >
                        {isItemAdded ? (
                            <CheckFat
                                weight="fill"
                                size={22}
                                color={theme.colors['base-card']}
                            />
                        ) : (
                            <ShoppingCart size={22} color={theme.colors['base-card']} />
                        )}
                    </button>
                </Order>
            </Control>
        </Container>
    )
}