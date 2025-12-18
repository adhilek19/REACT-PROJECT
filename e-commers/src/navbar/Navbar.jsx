import fg from '../assets/navicon/fg.png'
import enter from '../assets/navicon/enter.png'
import bag from '../assets/navicon/bag.png'
import { data, Link, useNavigate } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'

function Navbar() {
  const navigate= useNavigate()
     const [name,setName]=useState("")
     const currentUser = localStorage.getItem("userId");
      useEffect(()=>{
          fetch(`http://localhost:5000/users/${currentUser}`)
          .then((res)=>res.json())
          .then((data)=>setName(data.name))
        },[currentUser])
     const handleLogout=()=>{
        localStorage.removeItem("userId")
        navigate('/')

        
     }
   
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <img src={fg} alt="logo" width="30" height="31" />
          Store
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Left menu */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Product">Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>


          {/* Right icons */}
          <ul className="navbar-nav ms-lg-auto align-items-center gap-3">
           
            {currentUser ? <Button variant='outline-dark'>Hi,  {name}</Button> : <Button variant='outline-dark'>Guest</Button>}
            
            <li className="nav-item">
              <Link to="/login">
                <img src={enter} alt="login" width="28" height="28" />
              </Link>
            </li>
            

            <li className="nav-item">
              {currentUser ? <Link className='nav-link' onClick={handleLogout}>logout</Link> : <Link className="nav-link" to="/login">login</Link>}
              
            </li>
           

            <li className="nav-item">
              <Link to="/cart">
                <img src={bag} alt="cart" width="28" height="28" />
              </Link>
            </li>


          

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
