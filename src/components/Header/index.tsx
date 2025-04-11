import { Link } from "react-router-dom";
import { Aside, Container } from "./styles";
// import { MapPin, ShoppingCart } from "phosphor-react";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartProvider";
import { MapPin, ShoppingCart } from "@phosphor-icons/react";

export function Header() {
    const { cart } = useContext(CartContext);
    return(

        <Container>
            <Link to='/'>
                <img src="/logo.svg" alt="Cristo - Rei Coffee is CIA Delivery"/>
            </Link>

            <Aside>
                <div>
                    <MapPin size={22} weight="fill"/>
                    <span> Várzea Grande, MT</span>
                </div>
                
                <Link to={`cart`} aria-disabled={cart.length === 0}  > 
                    <ShoppingCart  size={22} weight="fill"/>
                    {cart.length > 0 ? <span> {cart.length }</span> : null } 
                </Link>
            </Aside>
        </Container>
    )
}