import React from "react";
import "./Contact.css"; // optional for styling

export default function Contact() {
  return (
    <div className="contact-container">
      <h2>📞 Contact Me</h2>
      
      <div className="contact-details">
        <p><strong>👤 Name:</strong> Sreeja Chevva</p>
        <p><strong>📧 Email:</strong> sreeja@example.com</p>
        <p><strong>📱 Phone:</strong> +91 98765 43210</p>
        <p><strong>📍 Address:</strong> Hyderabad, India</p>
      </div>

      <div className="contact-socials">
        <h3>🌐 Social Links</h3>
        <ul>
          <li>
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer">
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
