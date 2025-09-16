import React, { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './home'
import Veg from './veg'
import NonVeg from './nonveg' 
import Vegstraters from './Vegstraters'
import Nonvegstraters from './Nonvegstraters'
import Desserts from './Desserts'
import AboutUs from './AboutUs'
import SignIn from './Signin'
import SignUp from './Signup'
import Contact from './Contact'
import { logout } from './store.js'
import './App.css'



import { useDispatch, useSelector } from 'react-redux';
import Cart from './Cart.jsx'
import OrdersHistory from './OrdersHistory.jsx'

function App() {
  let cartItems =useSelector(globalState => globalState.cart)
 let cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

 const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

 const menuItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Veg", path: "/veg", icon: "🥕" },
    { name: "Non Veg", path: "/nonveg", icon: "🍗" },
    { name: "Veg Starters", path: "/veg-starters", icon: "🥗" },
    { name: "Non Veg Starters", path: "/nonveg-starters", icon: "🐓" },
    { name: "Desserts", path: "/desserts", icon: "🍰" },
    {name : "OrdersHistory", path: "/orders", icon: "📦"},
    { name: "About Us", path: "/about", icon: "ℹ️" },
    { name: "Contact Us", path: "/contact", icon: "📞" },
  
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = () => {
  if (filteredMenu.length > 0) {
    // Redirect to the first matching item
    window.location.href = filteredMenu[0].path;
  } else {
    alert("No results found");
  }
};


  return (
    <>
    <BrowserRouter>
     {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">DelightFood</div>
         <div style={{ position: "relative", flex: 1 }}>
        <input
          type="text"
          placeholder="Search items..."
          className="search-input"
          value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        />
       <button className="search-btn" onClick={handleSearch}>🔍</button>

        {showDropdown && searchTerm && (
            <div className="search-dropdown">
              <ul>
                {filteredMenu.length > 0 ? (
                  filteredMenu.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path}>
                        {item.icon} {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="no-result">No results found</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="navbar-right">
         {user ? (
    <>
      <span style={{ color: "white", marginRight: "10px" }}>
        👋 Welcome, {user}
      </span>
      <button
        className="btn btn-danger"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </>
  ) : (
    <>
          <div className="dropdown">
    <button className="account-btn" type="button">
    👤 Account
  </button>
    <div className="dropdown-menu">
      <Link className="dropdown-item" to="/signin">🗝️ Sign In</Link>
      <Link className="dropdown-item" to="/signup">📝 Sign Up</Link>
    </div>
  </div>
  </>
  )}  
          <Link to="/cart" className="cart-link">
            🛒 Cart ({cartCount})
          </Link>
        </div>
        
      
      </nav>

   {/* Navbar */}
      <div className="menu-bar">
        <div className="menu-container">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path}>
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
   <Routes>
      
      <Route path='/' element={<Home/>}/>
       <Route path='/veg' element={<Veg/>} />
        <Route path='/nonveg' element={<NonVeg />} />
       <Route path='/veg-starters' element={<Vegstraters />} />
        <Route path='/nonveg-starters' element={<Nonvegstraters />} />
        <Route path='/desserts' element={<Desserts />} />
        

        <Route path='/cart' element={<Cart/>} />
        <Route path='/orders' element={<OrdersHistory />} /> 
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} /> 

        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
