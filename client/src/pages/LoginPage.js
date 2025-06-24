import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/shared/FormInput";
import { userLogin } from "../redux/features/auth/authActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please provide both email and password.");
      return;
    }

    const res = await dispatch(userLogin({ email, password }));

    if (res?.meta?.requestStatus === "rejected") {
      const msg = res?.payload?.message || "Login failed.";
      alert(msg);
      return;
    }

    // Optional: extra client-side check if backend ever returns 200 with unapproved hospital
    if (
      res?.payload?.user?.role === "hospital" &&
      res?.payload?.user?.isApproved === false
    ) {
      alert("Your hospital registration is still under review.");
      return;
    }

    if (res?.payload?.success || res?.payload?.token) {
      alert(res?.payload?.message || "Login successful");
      navigate("/home");
    }
  };

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

      <form onSubmit={handleLogin}>
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
