import Login from '../pages/Login'
import Register from '../pages/Register'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import Order from '../pages/Order'
import Orders from '../pages/orders'
import Dashboard from '../admin/Dashboard'
import Morders from '../admin/Morders'
import Mproducts from '../admin/Mproducts'
import Musers from '../admin/Musers'
import Alogin from '../admin/Alogin'









function Approuter({ cart, setCart }) {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/product' element={<Product />} />

  
      <Route
        path='/cart'
        element={<Cart cart={cart} setCart={setCart} />}
      />

      <Route path='/order' element={<Order />} />
      <Route path='/orders' element={<Orders />} />



      <Route path='/admin' element={<Alogin/>} />
      <Route path='/admin/dashboard' element={<Dashboard/>} />
      <Route path='/admin/products' element={<Mproducts />} />
      <Route path='/admin/orders' element={<Morders />} />
   


      <Route path='/admin/users' element={<Musers/>}/>





    </Routes>

    
  )
}

export default Approuter
