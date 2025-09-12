import React from "react";
import "./aboutus.css";
import { useNavigate } from "react-router-dom";

function AboutUs() {
    const navigate = useNavigate();  // ✅ initialize

  const testimonials = [
    {
      name: "Ravi K.",
      review: "Amazing food and quick delivery! Highly recommended.",
    },
    {
      name: "Priya S.",
      review: "Delight Food never disappoints. Fresh and tasty every time.",
    },
    {
      name: "Anil M.",
      review: "Great experience, friendly staff, and awesome dishes!",
    },
  ];
   const handleViewMenu = () => {
    navigate("/nonveg-starters");  
   }

  return (
    <div className="about-container">
      {/* Company Story */}
      <h2>About Delight Food</h2>
      <p className="about-intro">
        Delight Food is dedicated to serving fresh, delicious meals to our customers. 
        Our mission is to bring restaurant-quality food straight to your doorsteps, 
        ensuring quality, speed, and satisfaction every time.
      </p>

      {/* Core Values / Highlights */}
      <div className="about-info-boxes">
        <div className="info-box">
          <h4>🍽️ Quality Ingredients</h4>
          <p>We use only the freshest ingredients in all our dishes.</p>
        </div>
        <div className="info-box">
          <h4>⚡ Fast Delivery</h4>
          <p>Get your favorite food delivered to your doorsteps quickly.</p>
        </div>
        <div className="info-box">
          <h4>🛡️ Secure Ordering</h4>
          <p>Your personal information and orders are safe with us.</p>
        </div>
        <div className="info-box">
          <h4>❤️ Customer Satisfaction</h4>
          <p>We care about our customers and their experience.</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="about-testimonials">
        <h3>What Our Customers Say</h3>
        <div className="testimonials-cards">
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <p>"{item.review}"</p>
              <h5>- {item.name}</h5>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="about-cta">
        <h3>Ready to taste the delight?</h3>
        <button className="btn-order" onClick={handleViewMenu}>
          View Menu
        </button>
      </div>
    </div>
  );
}

export default AboutUs;
