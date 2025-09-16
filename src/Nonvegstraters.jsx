import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./Nonveg.css"; // Assuming you have some basic styles

function Nonvegstraters() {
  const nonVegStraters = useSelector(state => state.Products.Nonvegstraters);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(nonVegStraters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = nonVegStraters.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5">🍗 Non-Veg Straters</h1>
      <div className="row">
        {currentItems.map((item) => (
          <div key={item.id} className="col-lg-4 col-md-5 col-sm-6 mb-5">
            <div className="card nonveg-card">
    <img src={item.image} alt={item.name} className="card-img-top" />
    <div className="card-body">
      <h5 className="card-title">{item.name}</h5>
      <p className="card-text">{item.description}</p>
      <p className="fw-bold text-danger">₹{item.price}</p>
      <button
        className="btn btn-success btn-sm w-100 btn-add-cart"
        onClick={() => handleAddToCart(item)}
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button className="btn btn-dark" onClick={handlePrev} disabled={currentPage === 1}>
          ⬅ Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${currentPage === index + 1 ? "btn-warning" : "btn-outline-dark"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button className="btn btn-dark" onClick={handleNext} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />
       {/* 👇 Footer */}
      
      <footer className="footer">
        <h3 className="brand">Delight Food</h3>
        
        <p>  Our team is made up of professionals dedicated to excellence.</p> 
        <p>  We value collaboration, creativity, and commitment in everything we do.</p>
        

        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>

        {/* White line */}
        <hr className="footer-line" />

        <p>© 2025 Delight Food 🍴 | All Rights Reserved</p>
        <p>
          <a href="/about">About</a> | 
          <a href="/contact">Contact</a> | 
          <a href="/privacy">Privacy</a>
        </p>
      </footer>
    </div>
  
    
  );
}

export default Nonvegstraters;
