// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "2rem", color: "#2E2E2E" }}>✅ It works!</h2>
      <p style={{ marginTop: "1rem", color: "#555" }}>
        Welcome to BloodCare. Choose an action below:
      </p>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Link
          to="/login"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#B00020",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#8A0018")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#B00020")}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#D94343",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#B00020")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#D94343")}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
