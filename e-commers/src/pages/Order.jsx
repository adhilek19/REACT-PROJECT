import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Order() {
  const navigate = useNavigate();
  const location = useLocation();

  const products = location.state?.products || [];
  const total = location.state?.total || 0;

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");

  const handlePayment = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    try {
      await axios.post("http://localhost:5000/orders", {
        userId: localStorage.getItem("userId"),
        items: products,
        total,
        address,
        payment,
        date: new Date().toDateString(),
      });

      alert("Order placed successfully ");
      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Order Summary</h2>

      {products.map((item) => (
        <div
          key={item.id}
          className="d-flex justify-content-between align-items-center mb-2"
        >
          <p className="mb-0">{item.name} x {item.quantity}</p>
          <p className="mb-0">₹{item.price * item.quantity}</p>
        </div>
      ))}

      <h4>Total: ₹{total}</h4>

      <div className="mt-4">
        <h2>Confirm Order</h2>

        <textarea
          className="form-control mb-2"
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <select
          className="form-select mb-2"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option value="cod">Cash on Delivery</option>
          <option value="card">Credit / Debit Card</option>
          <option value="upi">UPI</option>
        </select>

        <button className="btn btn-success" onClick={handlePayment}>
          Pay ₹{total}
        </button>
      </div>
    </div>
  );
}

export default Order;
