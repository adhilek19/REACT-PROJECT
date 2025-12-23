import fg from '../assets/navicon/fg.png';
import enter from '../assets/navicon/enter.png';
import bag from '../assets/navicon/bag.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import '../navbar/Nav.css';

function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const currentUser = localStorage.getItem("userId");

  // Fetch current user name safely
  useEffect(() => {
    if (!currentUser) return; // Do nothing if no user

    fetch(`http://localhost:5000/users/${currentUser}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found"); // handle 404
        return res.json();
      })
      .then((data) => setName(data.name))
      .catch((err) => {
        console.log(err);
        setName(""); // reset name if error
      });
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setName(""); // clear name
    navigate("/");
  };

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
              <NavLink className="nav-link butterfly" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link butterfly" to="/Product">Product</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link butterfly" to="/orders">Orders</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link butterfly" to="/about">About</NavLink>
            </li>
          </ul>

          {/* Right icons */}
          <ul className="navbar-nav ms-lg-auto align-items-center gap-3">

            {/* User Greeting */}
            <li className="nav-item">
              {currentUser && name ? (
                <Button variant='outline-dark'>Hi, {name}</Button>
              ) : (
                <Button variant='outline-dark'>Guest</Button>
              )}
            </li>

            {/* Login Icon */}
            <li className="nav-item">
              {!currentUser && (
                <Link to="/login">
                  <img src={enter} alt="login" width="28" height="28" />
                </Link>
              )}
            </li>

            {/* Login / Logout */}
            <li className="nav-item">
              {currentUser ? (
                <Link className="nav-link" onClick={handleLogout}>Logout</Link>
              ) : (
                <Link className="nav-link" to="/login">Login</Link>
              )}
            </li>

            {/* Cart */}
            <li className="nav-item position-relative">
              <Link to="/cart" className="nav-link">
                <img src={bag} alt="cart" width="28" height="28" />
                {cartCount > 0 && <span className='cart-badge'>{cartCount}</span>}
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
