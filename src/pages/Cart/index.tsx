import { QuantityInput } from "../../components/Form/QuantityInput";
import { Coffee, AddressContainer, AddressForm, AddressHeading, CartTotal, CartTotalInfo, CheckoutButton, CoffeeInfo, Container, InfoContainer, PaymentContainer, PaymentErrorMessage, PaymentHeading, PaymentOptions } from "./styles";
import { TextInput } from "../../components/Form/TextInput";
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCart } from "../../hooks/useCart";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Bank, CreditCard, CurrencyDollar, MapPin, Money, Trash } from "@phosphor-icons/react";
import { Radio } from "../../components/Form/Radio";
import { coffees } from '../../../data.json'
import { Fragment } from "react";

// Pode ser excluido o codigo abaixo pois não esta sendo utilizado, pois foi substituido pelo 
// OrderInfo com o infer do newOrder
type FormInputs = {
    cep: number
    street: string
    number: string
    fullAddress: string
    neighborhood: string
    city: string
    state: string
    paymentMethod: 'credit' | 'debit' | 'cash'
}

    const newOrder = z.object({
        cep: z.number({ invalid_type_error: 'Informe o CEP'}),
        street: z.string().min(1, 'Informe a rua'),
        number: z.string().min(1, 'Informe o numero'),
        fullAddress: z.string(),
        neighborhood: z.string().min(1, 'Informe o bairro'),
        city: z.string().min(1, 'Informe a cidade'),
        state: z.string().min(1, 'Informe a UF'),
        paymentMethod: z.enum(['credit', 'debit', 'cash'], {
            invalid_type_error: 'Informe um método de pagamento',
        }),
    })

export type OrderInfo = z.infer<typeof newOrder>

const shippingPrice = 3.5

export function Cart() {

    const { 
        cart, 
        checkout,
        incrementItemQuantity, 
        decrementItemQuantity, 
        removeItem
    } = useCart()

    const coffeesInCart = cart.map((item) => {
        const coffeeInfo = coffees.find((coffee) => coffee.id === item.id)

        if(!coffeeInfo) {
            throw new Error('Invalid coffee.')
        }
        return {
            ...coffeeInfo,
            quantity: item.quantity
        }
    })

    const totalItemsPrice = coffeesInCart.reduce((previousValue, currentItem) => {
        return (previousValue += currentItem.price * currentItem.quantity)
    }, 0)

    const { 
        register,
        handleSubmit,
        watch,
        formState: { errors }
    //  } = useForm<FormInputs>({ Pode ser o FormInputs ou o OrderInfo (com o OrderInfo é a forma utilizado no curso)
     } = useForm<OrderInfo>({
        resolver: zodResolver(newOrder)
     })

     const selectPaymentMethod = watch('paymentMethod')

     function handleItemIncrement(itemId: string) {
       incrementItemQuantity(itemId)        
     }

     function handleItemDecrement(itemId: string) {
       decrementItemQuantity(itemId)        
     }

     function handleItemRemove(itemId: string) {
        removeItem(itemId)
     }

     const  handleOrderCheckout: SubmitHandler<FormInputs> = (data) => {
        if(cart.length === 0) {
            return alert('É preciso ter pelo menos um item no carrinho')
        }
        checkout(data)
     }

    return(
        <Container>
            {/* Foi criado 2 InfoContainer por algum motivo */}
            {/* Primeiro InfoContainer */}
            <InfoContainer> 

                <h2>Complete seu pedido</h2>

                <form id="order" onSubmit={handleSubmit(handleOrderCheckout)}>
                    <AddressContainer>
                        <AddressHeading>
                            <MapPin size={22} />

                            <div>
                                <span> Endereço de entrega</span>

                                <p> Informe o endereço onde deseja receber o seu pedido </p>
                            </div>
                        </AddressHeading>

                        <AddressForm>
                            <TextInput 
                                placeholder="CEP"
                                type="number"
                                containerProps={{ style: { gridArea: 'cep'} }}
                                error={errors.cep}
                                {...register('cep', { valueAsNumber: true })}
                            />
                            
                             <TextInput 
                                placeholder="Rua"
                                containerProps={{ style: { gridArea: 'street'} }}
                                error={errors.street}
                                {...register('street')}
                                />

                            <TextInput 
                               placeholder="Número"
                               containerProps={{ style: { gridArea: 'number'} }}
                               error={errors.number}
                               {...register('number')}
                            />
                            <TextInput 
                               placeholder="Complemento"
                               containerProps={{ style: { gridArea: 'fullAddress'} }}
                               error={errors.fullAddress}
                               {...register('fullAddress')}
                            />

                            <TextInput 
                               placeholder="Bairro"
                               containerProps={{ style: { gridArea: 'neighborhood'} }}
                               error={errors.neighborhood}
                               {...register('neighborhood')}
                            />
                            
                            <TextInput 
                               placeholder="Cidade"
                               containerProps={{ style: { gridArea: 'city'} }}
                               error={errors.city}
                               {...register('city')}
                            />
                            <TextInput 
                               placeholder="UF"
                               containerProps={{ style: { gridArea: 'state'} }}
                               error={errors.state}
                               {...register('state')}
                            />

                        </AddressForm>
                    </AddressContainer>

                    <PaymentContainer>
                        <PaymentHeading>
                            <CurrencyDollar size={22} />

                            <div>
                                <span> Pagamento </span>

                                <p>
                                    O pagamento é feito na entrega. Escolha a forma que deseja pagar
                                </p>
                            </div>
                        </PaymentHeading>

                        <PaymentOptions>
                            <div>
                                <Radio
                                    isSelected={selectPaymentMethod === 'credit'}
                                    {...register('paymentMethod')}
                                    value="credit"
                                >
                                        <CreditCard size={16}/>
                                        <span> Cartão de crédito</span>

                                </Radio>

                                <Radio
                                    isSelected={selectPaymentMethod === 'debit'}
                                    {...register('paymentMethod')}
                                    value="debit"
                                >
                                        <Bank size={16}/>
                                        <span>Cartão de débito</span>
                                </Radio>

                                <Radio
                                    isSelected={selectPaymentMethod === 'cash'}
                                    {...register('paymentMethod')}
                                    value="cash"
                                >
                                    <Money size={16}/>
                                    <span> Dinheiro</span>
                                </Radio>
                            </div>

                            { errors.paymentMethod ? (
                                <PaymentErrorMessage role="alert">
                                    {errors.paymentMethod.message}
                                </PaymentErrorMessage>
                            ): null }
                        </PaymentOptions>
                    </PaymentContainer>
                </form>
            </InfoContainer>
            
            {/* Segundo InfoContainer */}
            <InfoContainer>
                <h2> Cafés selecionados </h2>

                <CartTotal>
                 {coffeesInCart.map((coffee) => ( 
                        <Fragment key={coffee.id}>
                            <Coffee>
                                <div>
                                   <img src={coffee.image} alt={coffee.title} /> 

                                    <div>
                                         <span> {coffee.title } </span>

                                        <CoffeeInfo>
                                             <QuantityInput 
                                                quantity={coffee.quantity}
                                                incrementQuantity={() => handleItemIncrement(coffee.id)}
                                                decrementQuantity={() => handleItemDecrement(coffee.id)}
                                            />   
                                            <button onClick={() => handleItemRemove(coffee.id)}>
                                                <Trash />

                                                <span> Remover </span>
                                            </button>
                                        </CoffeeInfo>
                                    </div>
                                </div>

                               <aside> R$ {coffee.price?.toFixed(2)}</aside> 
                            </Coffee>

                            <span />
                        </Fragment>
                   ))} 

                    <CartTotalInfo>
                        <div>
                            <span> Total de itens </span>
                            <span>
                                {new Intl.NumberFormat('pt-br', {
                                    currency: 'BRL',
                                    style: 'currency',
                                }).format(totalItemsPrice)}
                            </span>
                        </div>

                        <div>
                            <span> Entrega </span>
                            <span>
                            {new Intl.NumberFormat('pt-br', {
                                    currency: 'BRL',
                                    style: 'currency',
                                }).format(shippingPrice)}
                            </span>
                        </div>

                        <div>
                            <span> Total </span>
                            <span>
                                {new Intl.NumberFormat('pt-br', {
                                    currency: 'BRL',
                                    style: 'currency',
                                }).format(totalItemsPrice + shippingPrice)}
                            </span>
                        </div>
                    </CartTotalInfo>

                    <CheckoutButton  type="submit" form="order">
                       Confirmar pedido
                    </CheckoutButton>
                </CartTotal>
            </InfoContainer>
        </Container>
    )
}