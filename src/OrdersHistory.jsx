import React from 'react';
import { useSelector } from 'react-redux';
import './App.css'; // Assuming you have some basic styles

function OrdersHistory() {
  let orders = useSelector(globalState => globalState.orders);

  let finalData = orders.map((purchase, index) => (
    <li key={index} className="order-card">
      <h2 className="order-title">Order #{index + 1}</h2>

      <p className="order-info">
        <span className="label">Date & Time:</span>{' '}
        <span className="date-time">{purchase.date}</span>
      </p>

      <p className="order-info">
        <span className="label">Total Amount:</span>{' '}
        <span className="order-total">
          ₹{Number(purchase.totalAmount).toFixed(2)}
        </span>
      </p>

      <h3 className="items-title">Items:</h3>
      <ul className="items-list">
        {purchase.items.map((item, itemIndex) => (
          <li key={itemIndex} className="item">
            <img
              src={item.image}
              alt={item.name}
              className="item-image"
            />
            <span className="item-text">
              {item.name} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="orders-container">
      <h1 className="orders-heading">📦 Orders History</h1>
      <ul className="orders-list">{finalData}</ul>
      {orders.length === 0 && (
        <p className="no-orders">No orders placed yet.</p>
      )}
    </div>
  );
}

export default OrdersHistory;
