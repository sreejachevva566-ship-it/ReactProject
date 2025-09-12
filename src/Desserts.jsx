import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Desserts.css"; // Assuming you have some basic styles

function Desserts() {
  const desserts = useSelector(state => state.Products.desserts);
  const dispatch = useDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(desserts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = desserts.slice(startIndex, startIndex + itemsPerPage);

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
      <h1 className="text-center mb-5"> 🍨Desserts</h1>
      <div className="row">
        {currentItems.map((item) => (
          <div key={item.id} className="col-lg-4 col-md-5 col-sm-6 mb-5">
            <div className="card dessert-card">
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
    </div>
  );
}

export default Desserts;
