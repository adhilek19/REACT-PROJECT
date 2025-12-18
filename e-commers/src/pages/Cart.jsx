import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const currentUser = localStorage.getItem("userId");
  const [cart, setCart] = useState([]);

  const navigate=useNavigate();


  
  const fetchCart = () => {
    axios.get(`http://localhost:5000/cart?userId=${currentUser}`)
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  
  const increaseQty = 
  async (item) => {

    await axios.patch(`http://localhost:5000/cart/${item.id}`, {
      quantity: item.quantity + 1,
    });

    fetchCart();

  };

  
  const decreaseQty = async (item) => {
    if (item.quantity === 1) return;
    await axios.patch(`http://localhost:5000/cart/${item.id}`, {
      quantity: item.quantity - 1,
    });
    fetchCart();
  };


  const removeItem = async (id) => {
    await axios.delete(`http://localhost:5000/cart/${id}`);
    fetchCart();
  };

  // Total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const buyNow=(item)=>{
    navigate('/order',{state:{products:[item],total: item.price}})
  };

  const payAll=()=>{
    navigate('/order',{state:{products:cart,total}})
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">My Cart</h2>

      {cart.length === 0 ? (
        <h5 className="text-center text-muted">Cart is empty</h5>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} className="mb-3 shadow-sm">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <img
                  src={item.image}

                  alt={item.name}

                  style={{ width: "80px", height: "80px", objectFit: "contain" }}
                />
                <div>
                  <h5>{item.name}</h5>
                  <p className="mb-0">₹{item.price}</p>
                  <small>Qty: {item.quantity}</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    size="sm"
                    disabled={item.quantity === 1}
                    onClick={() => decreaseQty(item)}
                  >
                    −
                
                
                  </Button>
                  <span>{item.quantity}</span>
                  <Button size="sm" onClick={() => increaseQty(item)}>
                    +
                  </Button>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>

                              <div className="d-flex gap-2">
                  <Button variant="success" onClick={() => buyNow(item)}>Buy Now</Button>
                </div>
                 
              </Card.Body>
            </Card>
          ))}
          <h4 className="text-end mt-4">Total: ₹{total}</h4>
          <div className="text-end mt-2">
            <Button variant="primary" onClick={payAll}>
              Pay for All
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
