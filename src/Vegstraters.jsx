import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store.js";
import "./Vegstraters.css"; // Assuming you have some basic styles
import "@fortawesome/fontawesome-free/css/all.min.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Vegstraters() {
const vegStraters = useSelector(globalState => globalState.Products.Vegstraters);
  let dispatch = useDispatch();
  
  const itemsPerPage = 3;
  const totalPages = Math.ceil(vegStraters.length / itemsPerPage);
  const [currentPage,setCurrentPage] = useState(1);
  const indexofLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexofLastItem - itemsPerPage;
  const currentItems = vegStraters.slice(indexofFirstItem,indexofLastItem);
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
    <div className="container-fluid mt-4 px-5">
<div className="page-content">
      <h1 className="text-center mb-5">🍲 Veg Straters</h1>
      <div className="row justify-content-center">
        {currentItems.map((item) => (
          <div key={item.id} className="col-auto mb-5 d-flex justify-content-center">
            <div
              className="card h-100 shadow-sm border-0"
              style={{width: "21rem", transition: "transform 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={item.image}
                alt={item.name}
                 className="vegStraters-card-img"
              />
               <div className="card-body text-center">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">{item.description}</p>
                <p className="fw-bold text-success">₹{item.price}</p>
                <button
                  className="btn btn-success w-100"
                  onClick={() => {
                    dispatch(addToCart(item));
                    toast.success(`${item.name} added to cart!`);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
       {/* Pagination Controls */}
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
       
             {/* Toast container */}
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
export default Vegstraters;
