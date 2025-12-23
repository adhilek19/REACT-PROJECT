import React from "react";
import './Footer.css'

function Footer() {
  return (
    <div>
      
   

  
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>5G Store</h3>
          <p>
            Your trusted destination for the latest 5G smartphones.
            Fast delivery. Genuine products.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>Offers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Returns</li>
            <li>Shipping</li>
            <li>Warranty</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@5gstore.com</p>
          <p>Phone: +91 98765 43210</p>
          <div className="socials">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
          </div>
        </div>

      </div>



     

















      <div className="footer-bottom">
        © {new Date().getFullYear()} 5G Store. All rights reserved.
      </div>
    </footer>

     </div>
  );
}

export default Footer;
