import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQty, increaseQty, removeFromCart,clearCart,addOrder } from './store';
import { calculateDiscount, calculateItems, getCouponDiscount } from './discountUtils';
import "./App.css"; // Assuming you have some basic styles
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import QRCode from "react-qr-code";



function Cart() {
  const cartData = useSelector(globalState => globalState.cart);
  const dispatch = useDispatch();

  const [appliedDiscount, setAppliedDiscount] = useState(0); 
  const [couponCode, setCouponCode] = useState(""); 
  const [toastMessage, setToastMessage] = useState(""); 
  const [buttonDiscount, setButtonDiscount] = useState(0);
  const [isButtonApplied, setIsButtonApplied] = useState(false);
  




  const totalAmount = calculateItems(cartData);
  const activeDiscount = Number(appliedDiscount) + Number(buttonDiscount); 
const { discountAmount, finalPrice } = calculateDiscount(totalAmount, activeDiscount);



  const discountButtons = [10, 20, 30]; 
  const [customerEmail, setCustomerEmail] = useState("");

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleApplyCoupon = () => {
  const discount = Number(getCouponDiscount(couponCode)) || 0;
  setAppliedDiscount(discount);
  if(discount) {
    setToastMessage(`✅ Coupon Applied: ${discount}%`);

    // 🎉 Trigger balloons/confetti
    confetti({
      particleCount: 5000,
      spread: 120,
      origin: { y: 0.6 }
    });

  } else {
    setToastMessage("❌ Invalid Coupon");
  }

  setTimeout(() => setToastMessage(""), 5000);
};



const SHIPPING_CHARGE = 50; // example flat shipping
const TAX_RATE = 0.18; // 18% GST

const handleCheckout = () => {
  if (!customerEmail || !isValidEmail(customerEmail)) {
    setToastMessage("❌ Invalid email. Please enter a valid email.");
    setTimeout(() => setToastMessage(""), 3000);
    return;
  }

  // Prepare orders array
  const ordersArray = cartData.map(item => ({
    name: item.name,
    units: item.quantity,
    price: (item.price * item.quantity).toFixed(2),
    image_url: item.image
  }));

  // Calculate total + shipping + taxes
  const numericFinalPrice = parseFloat(finalPrice) || 0; // ensure it's a number
  const taxes = numericFinalPrice * TAX_RATE;       // calculate taxes
  const grandTotal = numericFinalPrice + SHIPPING_CHARGE + taxes; 
  // Template parameters for EmailJS
  const templateParams = {
  order_id: Math.floor(Math.random() * 1000000),
  orders: ordersArray,
  shipping: SHIPPING_CHARGE?.toFixed(2) || "0.00",
  couponDiscount: appliedDiscount?.toFixed(2) || "0.00",
  buttonDiscount: buttonDiscount?.toFixed(2) || "0.00",
  tax: taxes?.toFixed(2) || "0.00",
  total: grandTotal?.toFixed(2) || "0.00",
  email: customerEmail || "test@example.com",
};

  
console.log("Email Data:", templateParams);
  // Send email via
  
  emailjs
    .send(
      "service_u6flkv8", // replace with your EmailJS service ID
      "template_qlv2y4h", // replace with your EmailJS template ID
      templateParams,
      "Tdqdd5-6MlzwTs78V"   // replace with your EmailJS Public Key
    )
    .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Email Sent ✉️",
            text: "Order confirmation has been sent to your email.",
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
          Swal.fire({
            icon: "error",
            title: "Email Failed",
            text: "Something went wrong while sending email!",
          });
        }
      );
    
};


// ✅ keep this OUTSIDE handleCheckout
const handleCompletePurchase = () => {
  let purchaseDetails = {
    date: new Date().toLocaleString(),
    items: cartData,
    totalAmount: finalPrice,
  };

  dispatch(clearCart());
  dispatch(addOrder(purchaseDetails));

  setToastMessage("✅ Purchase completed!");
  setTimeout(() => setToastMessage(""), 3000);
};
// ✅ QR Code data
  const upiID = "9381408041@ybl";
  const storeName = "sreejachevva";
  const upiLink = `upi://pay?pa=${upiID}&pn=${storeName}&am=${finalPrice}&cu=INR`;




  return (
<div className="cart-page mt-4">

      <h1 className="text-center mb-4">🛒 Your Cart</h1>
      {cartData.length === 0 ? (
        <h4 className="text-center text-muted">Cart is Empty</h4>
        
      ) : (
        <>
<div className="cart-container">
          {/* Left Side: Cart Items */}
          <div className="cart-left">
        
          {cartData.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="card shadow-sm border-0 p-3 d-flex flex-row align-items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px" }}
                />
                <div className="ms-3 flex-grow-1">
                  <h5>{item.name}</h5>
                  <p className="text-muted">₹{item.price} x {item.quantity} = <b>₹{item.price * item.quantity}</b></p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => dispatch(decreaseQty({ name: item.name }))}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() => dispatch(increaseQty({ name: item.name }))}
                    >
                      +
                    </button>
                    <button className="btn btn-danger btn-sm ms-3"
                      onClick={() => dispatch(removeFromCart({ name: item.name }))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        
        
          {/* Button Discount Section */}
          <div className="cart-right">
<div className="mb-3">
  <h1 style={{ textAlign: "center" }}>💸Price Summary</h1>

            <h5>Quick Discounts:</h5>
            <button
  className={`btn btn-sm me-2 ${buttonDiscount === 10 ? "btn-success" : "btn-outline-success"}`}
  onClick={() => {
    setButtonDiscount(10);
    setIsButtonApplied(true);
    setToastMessage("✅ 10% Discount Applied");
    setTimeout(() => setToastMessage(""), 3000);
  }}
>
  10% Discount
</button>


            <button
  className={`btn btn-sm me-2 ${buttonDiscount === 10 ? "btn-success" : "btn-outline-success"}`}
  onClick={() => {
    setButtonDiscount(20);
    setIsButtonApplied(true);
    setToastMessage("✅ 20% Discount Applied");
    setTimeout(() => setToastMessage(""), 3000);
  }}
>
  20% Discount
</button>

            <button
  className={`btn btn-sm me-2 ${buttonDiscount === 10 ? "btn-success" : "btn-outline-success"}`}
  onClick={() => {
    setButtonDiscount(30);
    setIsButtonApplied(true);
    setToastMessage("✅ 30% Discount Applied");
    setTimeout(() => setToastMessage(""), 3000);
  }}
>
  30% Discount
</button>


            <button
              className="btn btn-sm btn-warning"
              onClick={() => {
                setAppliedDiscount(0);
                setToastMessage("🔄 Discount Reset");
                setTimeout(() => setToastMessage(""), 3000);
              }}
            >
              Reset
            </button>
          </div>


          {/* Coupon Section */}
          <div className="mb-3">
            <h5>Apply Coupon Code:</h5>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleApplyCoupon}>
                Apply
              </button>
            </div>
          </div>


          


      {/* Summary */}
         {/* Summary */}
<div className="cart-summary">
  <p>Total Amount: ₹{totalAmount}</p>

  {/* Show coupon discount if applied */}
  {appliedDiscount > 0 && (
    <p className="discount text-success">
      Coupon Discount: {appliedDiscount}% (-₹{((totalAmount * appliedDiscount) / 100).toFixed(2)})
    </p>
  )}

  {/* Show button discount if applied */}
  {buttonDiscount > 0 && (
    <p className="discount text-success">
      Button Discount: {buttonDiscount}% (-₹{((totalAmount * buttonDiscount) / 100).toFixed(2)})
    </p>
  )}

  {/* Final Price */}
  <h5>Final Price: ₹{finalPrice}</h5>
</div>
{/* QR Code */}
          <div className="qr-section text-center mt-4">
  <h5>Scan QR to Pay via UPI:</h5>
  <QRCode value={upiLink} size={200} />
  <p style={{ marginTop: "10px" }}>UPI ID: {upiID} | Store: {storeName}</p>
</div>

{/* Complete Purchase Button */}
          <div className="text-center mt-4">
            <button
              className="btn btn-success w-50"
              onClick={handleCompletePurchase}
            >
              ✅ Complete Purchase
            </button>
          </div>

{/* Email Section */}
<div className="email-section mb-4">
  <label className="form-label fw-bold text-secondary">
    Enter Your Gmail to receive order confirmation
  </label>
  <input
    type="email"
    className="form-control shadow-sm email-input"
    placeholder="example@gmail.com"
    value={customerEmail}
    onChange={(e) => setCustomerEmail(e.target.value)}
  />
</div>
<div className="text-center">
  <button className="btn btn-success w-50" onClick={handleCheckout}>
    ✅ Checkout & Send Email
  </button>
</div>
</div>


           {/* ✅ Toast Message */}
{toastMessage && (
  <div
    className={`toast-message ${
      toastMessage.includes("✅") ? "toast-success" : "toast-error"
    }`}
  >
    {toastMessage}
  </div>
)}
</div>

        </>  
      )}
    </div>
  
  );
}

export default Cart;    
  