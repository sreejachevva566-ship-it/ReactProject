import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // using same styles
import {login} from "./store";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username.trim().length < 3) {
      alert("❌ Username must be at least 3 characters");
      return;
    }

    if (formData.password.length < 6) {
      alert("❌ Password must be at least 6 characters");
      return;
    }
dispatch(login(formData.username.trim()));
    alert(`✅ Welcome back, ${formData.username}!`);
    navigate("/"); // after signin go to home (you can change route)
  };

  return (
    <div className="signup-container">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signup-btn">
          Sign In
        </button>
      </form>

      <p className="switch-auth">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign Up</span>
      </p>
    </div>
  );
}
