import axios from "axios";
import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders?userId=${userId}`)
      .then((res) => setOrders(res.data));
  }, [userId]);

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert("Order cancelled successfully ");
    } catch (err) {
      console.log(err);
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order.id} className="card mb-3 p-3">
          <h6>Order ID: {order.id}</h6>
          <p>Date: {order.date}</p>

          {order.items.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              <img src={item.image} width="50" alt={item.name} />
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr />
          <strong>Total: ₹{order.total}</strong>
          <p>Payment: {order.payment}</p>
          <p>Address: {order.address}</p>

        
          <div className="text-end mt-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => cancelOrder(order.id)}
            >
              Cancel Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
