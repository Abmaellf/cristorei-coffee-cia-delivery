import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { LayoutContainer } from "./styles";
import { CartContextProvider } from "../contexts/CartProvider";

export function DefaultLayout() {
    return(
        <LayoutContainer>
             <CartContextProvider>
                <Header />
                <Outlet />
             </CartContextProvider> 
        </LayoutContainer>
    )
}