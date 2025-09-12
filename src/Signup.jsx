import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { login } from "./store";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { email: "", password: "", confirmPassword: "" };

    if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain '@'";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setError(newErrors);

    if (!valid) return;

    // ✅ Save user in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.find(user => user.email === formData.email)) {
      alert("❌ Email already registered. Please sign in.");
      return;
    }

    const newUser = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password
    };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    // ✅ Automatically log in
    dispatch(login(formData.username.trim()));

    alert(`✅ Signup successful! Welcome, ${formData.username}!`);
    navigate("/"); // redirect to home
  };

  

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {error.email && <p className="error">{error.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {error.password && <p className="error">{error.password}</p>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
        </div>

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>

      <p className="switch-auth">
        Already have an account?{" "}
        <span onClick={() => navigate("/signin")}>Sign In</span>
      </p>
    </div>
  );
}
