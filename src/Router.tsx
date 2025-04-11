import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { Success } from './pages/Success'
import { DefaultLayout } from './layout'

export function Router() {
    return(
        <Routes>
            <Route path='/' element={<DefaultLayout />}>
                <Route path="/" element={<Home />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route  path='/order/:orderId/success' element={<Success />}/>
            </Route>
        </Routes>
    )
}