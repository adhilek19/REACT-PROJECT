
import Login from '../pages/Login'
import Register from '../pages/Register'
import { Route,Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import Order from '../pages/Order'
import Orders from '../pages/orders'




function Approuter() {

  return (
    <div>
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/Product' element={<Product/>}/>
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/order' element={<Order/>}/>
     <Route path='/orders' element={<Orders/>}/>


    
   
   </Routes>

    </div>
  )
}

export default Approuter