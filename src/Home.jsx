import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate("/veg");
  };

  const products = useSelector((state) => state.Products);

  // anni categories combine chestham
  const allItems = [
    ...products.Veg,
    ...products.Nonveg,
    ...products.Vegstraters,
    ...products.Nonvegstraters,
    ...products.desserts,
  ];
   const [showIntro, setShowIntro] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,   // oka sari 4 items chupisthundi
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
  };
  const categories = [
    { name: "Veg", image: products.Veg[0].image, path: "/veg" },
    { name: "Non-Veg", image: products.Nonveg[0].image, path: "/nonveg" },
    { name: "Veg Starters", image: products.Vegstraters[0].image, path: "/veg-starters" },
    { name: "Non Veg Starters", image: products.Nonvegstraters[0].image, path: "/nonveg-starters" },
    { name: "Desserts", image: products.desserts[0].image, path: "/desserts" },
  ];

  return (
<>
{/* ===== Intro Video Overlay ===== */}
    {showIntro && (
      <div className="intro-video-container">
        <video
          src="/videos/introfood3.mp4"
          autoPlay
          muted
          loop 
          className="intro-video"
        />
      </div>
    )}


    <div className="container mt-4">
      <h2 className="text-center mb-4">🍴 Welcome to Delight Food</h2>


      <Slider {...settings}>
        {allItems.map((item) => (
          <div key={item.id} className="p-2">
            <div
              className="card text-center"
              style={{
                height: "250px",       // 👈 fixed equal height
                width: "100%",         // 👈 same width
                cursor: "pointer",
              }}
              onClick={() => alert(`${item.name} clicked!`)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{
                  height: "180px",      // 👈 image same size
                  objectFit: "cover",
                }}
              />
              <div className="card-body p-2">
                <h6 className="card-title">{item.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {/* ===== Offer Container ===== */}
      <div className="offer-container">
        <div className="offer-left">
          <h2>🔥 50% OFF on Biryani</h2>
          <p>Order now and enjoy delicious hot biryani delivered fast!</p>
          <button className="btn-order" onClick={handleOrderNow}>
    Order Now </button>
        </div>
        <div className="offer-right">
          <img
            src="https://media.istockphoto.com/id/1097373338/photo/close-up-portrait-of-beautiful-cute-attractive-she-her-girl-with-finger-in-top-of-empty-space.jpg?s=170667a&w=0&k=20&c=BAsxehU_RkO1UP2VHpHkYOOBQy5A25MKU24pUB7bSXY="
            alt="Biryani Offer"
          />
        </div>
      </div>


             {/* ===== Reviews Section ===== */}
      <div className="reviews-container mt-5 p-4 rounded shadow bg-light">
        <h3 className="mb-4 text-center">⭐ Customer Reviews</h3>
        <div className="row">
          {[
            { name: "Ram", comment: "Super tasty biryani, must try!", rating: "⭐⭐⭐⭐⭐" },
            { name: "Anitha", comment: "Very good quantity and quality.", rating: "⭐⭐⭐⭐" },
            { name: "Aravindh", comment: "Delivery was very quick.", rating: "⭐⭐⭐⭐⭐" },
          ].map((review, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="review-card p-3 border rounded bg-white h-100 text-center">
                <p className="mb-1"><strong>{review.name}</strong></p>
                <p className="text-warning">{review.rating}</p>
                <p className="text-muted">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  );
}

export default Home;
