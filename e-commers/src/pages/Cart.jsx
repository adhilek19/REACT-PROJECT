import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();


  const fetchCart = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/cart?userId=${currentUser}`);
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      alert("Failed to fetch cart");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [currentUser, location.pathname]);


  const increaseQty = async (item) => {
    setCart((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p))
    );
    try {
      await axios.patch(`http://localhost:5000/cart/${item.id}`, {
        quantity: item.quantity + 1,
      });
    } catch (err) {
      console.error(err);
      fetchCart(); 
    }
  };

  // Decrease quantity
  const decreaseQty = async (item) => {
    if (item.quantity === 1) return;
    setCart((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p))
    );
    try {
      await axios.patch(`http://localhost:5000/cart/${item.id}`, {
        quantity: item.quantity - 1,
      });
    } catch (err) {
      console.error(err);
      fetchCart();
    }
  };

  // Remove item
  const removeItem = async (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);
    } catch (err) {
      console.error(err);
      fetchCart();
    }
  };

  // Buy single item
  const buyNow = async (item) => {
    if (!item) return;

    // Optimistically remove from UI
    setCart((prev) => prev.filter((p) => p.id !== item.id));

    try {
      await axios.delete(`http://localhost:5000/cart/${item.id}`);

      navigate("/order", {
        state: {
          products: [item],
          total: item.price * item.quantity,
        },
      });
    } catch (err) {
      console.error("Failed to buy item:", err);
      alert("Failed to proceed with purchase. Restoring cart...");
      fetchCart();
    }
  };

  // Checkout all items
  const payAll = async () => {
    if (cart.length === 0) return;

    const currentCart = [...cart];
    setCart([]); // Optimistically clear cart

    try {
      await Promise.all(currentCart.map((item) => axios.delete(`http://localhost:5000/cart/${item.id}`)));

      const total = currentCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      navigate("/order", {
        state: { products: currentCart, total },
      });
    } catch (err) {
      console.error("Failed to checkout all items:", err);
      alert("Failed to checkout. Restoring cart...");
      fetchCart(); // rollback
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!currentUser)
    return <h5 className="text-center mt-4">Please login to view cart</h5>;

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">My Cart</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : cart.length === 0 ? (
        <h5 className="text-center text-muted">Cart is empty</h5>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} className="mb-3 shadow-sm">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  style={{ width: 80, height: 80, objectFit: "contain" }}
                />

                <div>
                  <h5>{item.name}</h5>
                  <p>₹{item.price}</p>
                  <small>Qty: {item.quantity}</small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Button
                    size="sm"
                    disabled={item.quantity === 1}
                    onClick={() => decreaseQty(item)}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button size="sm" onClick={() => increaseQty(item)}>
                    +
                  </Button>
                </div>

                <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>

                <Button variant="success" onClick={() => buyNow(item)}>
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          ))}

          <h4 className="text-end mt-4">Total: ₹{total}</h4>
          <div className="text-end mt-2">
            <Button variant="primary" onClick={payAll}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
