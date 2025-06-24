import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/shared/FormInput";
import { handleLogin } from "../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  const Login = (e) => {
    e.preventDefault();
    if (!email || !password)
      return alert("Please provide both email and password.");
    handleLogin(e, email, password);
  };

  useEffect(() => {
    if (user?.role === "hospital" && !user?.isApproved) {
      alert("Your hospital registration is still under review.");
      return;
    }

    if (user) navigate("/home");
  }, [user, navigate]);

  return (
    <div
      className="auth-container"
      style={{
        backgroundColor: "#FDFDFD",
        borderRadius: "12px",
        padding: "2.5rem",
        maxWidth: "420px",
        margin: "5rem auto",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#B00020",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        Login to BloodCare
      </h2>
      <form onSubmit={Login}>
        <FormInput
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#B00020",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            marginTop: "1rem",
            width: "100%",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#8A0018")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#B00020")}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555" }}>
        Don't have an account?
        <span
          onClick={() => navigate("/register")}
          style={{
            color: "#D94343",
            cursor: "pointer",
            marginLeft: "5px",
            textDecoration: "underline",
          }}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
