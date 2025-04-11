import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>

      <BrowserRouter>
         {/*<Header />   Poderiamos deixar o Header aqui, será que esta renderizando, todoas as  vezes que carrega o component. Vou retirar */}
            <Router /> 
      </BrowserRouter>
      
      <GlobalStyle />

    </ThemeProvider>
  )
}
