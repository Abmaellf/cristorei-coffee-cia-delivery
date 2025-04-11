import { useTheme } from "styled-components";
import { CoffeeList, Heading, Hero, HeroContent, Info } from "./styles";
import {coffees} from '../../../data.json';
import { Card } from "../../components/Card";
import { Coffee, Package, ShoppingCart, Timer } from "@phosphor-icons/react";

export function Home() {
    const theme = useTheme() 
    return(
        <div>
            <Hero>
                <HeroContent>
                    <div>
                         <Heading> {/*<!-- Cabeçalho --> */}
                            <h1> Encontre o café perfeito para qualquer hora do dia</h1>

                            <span> 
                                Com o Cristo Rei Coffee e Cia você recebe seu café onde estiver 
                            </span>
                        </Heading>

                        <Info>  {/* A baixo do Cabeçalho 4 informações de compra embalagem entrega e segurança --> */}
                             <div>
                                <ShoppingCart 
                                    size={32}
                                    weight="fill"
                                    color={theme.colors.background}
                                    style={{ backgroundColor: theme.colors['yellow-dark']}}
                                />
                                <span> Compra simples e segura </span>
                             </div>

                             <div>
                                <Package 
                                    size={32}
                                    weight="fill"
                                    color={theme.colors.background}
                                    style={{ backgroundColor: theme.colors['base-text']}}
                                />
                                <span> Embalagem mantém o café intacto </span>
                             </div>

                             <div>
                                <Timer 
                                    size={32}
                                    weight="fill"
                                    color={theme.colors.background}
                                    style={{ backgroundColor: theme.colors.yellow}}
                                />
                                <span> Entrega rápida e rastreada </span>
                             </div>

                             <div>
                                <Coffee 
                                    size={32}
                                    weight="fill"
                                    color={theme.colors.background}
                                    style={{ backgroundColor: theme.colors.purple }}
                                />
                                <span> Compra simples e segura </span>
                             </div>
                        </Info>
                    </div>
                    <img  src="/images/hero.svg" alt="Café do Coffee Delivery"/>
                </HeroContent>

                <img src="/images/hero-bg.svg" id="hero-bg" alt=""/>
            </Hero>

            <CoffeeList>
                <h2> Nossos cafés </h2>

                <div>
                    {
                        coffees.map((coffee) => (
                            <Card key={coffee.id} coffee={coffee} />
                        ))
                    }

                </div>
                   
            </CoffeeList>
        </div>
    )
}