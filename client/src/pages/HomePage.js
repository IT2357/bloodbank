import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#F8F9FA",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Top Bar with Logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1rem 2rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <button
          onClick={() => navigate("/logout")}
          style={{
            backgroundColor: "#B00020",
            color: "#fff",
            padding: "0.5rem 1rem",
            fontWeight: "600",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#8A0018")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#B00020")}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1 style={{ color: "#B00020", fontSize: "2.5rem" }}>
          Welcome to BloodCare
        </h1>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem", color: "#555" }}>
          You're successfully logged in. Explore the features, manage your
          profile, or donate blood to save lives.
        </p>

        <div style={{ marginTop: "2rem" }}>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#B00020",
              color: "#fff",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#8A0018")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#B00020")}
            onClick={() => alert("You clicked Explore!")}
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
