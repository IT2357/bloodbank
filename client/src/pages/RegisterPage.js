import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/shared/FormInput";
import { userRegister } from "../redux/features/auth/authActions";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    role: "donor",
    email: "",
    password: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    hospitalName: "",
    licenseNumber: "",
  });

  const [pendingApproval, setPendingApproval] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(userRegister({ ...form, setPendingApproval }));

    if (res?.payload?.success && form.role !== "hospital") {
      window.location.replace("/login");
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundColor: "#FDFDFD",
        borderRadius: "12px",
        padding: "2.5rem",
        maxWidth: "520px",
        margin: "4rem auto",
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
        Register with BloodCare
      </h2>

      {pendingApproval ? (
        <div style={{ textAlign: "center", color: "#333" }}>
          <p>Your hospital registration is under review.</p>
          <p>We'll notify you once it's been approved.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <div className="form-group" style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#333",
              }}
            >
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{
                padding: "0.5rem",
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="donor">Donor</option>
              <option value="hospital">Hospital</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <FormInput
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <FormInput
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <FormInput
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          {form.role === "donor" && (
            <>
              <FormInput
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
              />
              <FormInput
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              />
              <FormInput
                label="Blood Group"
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
              />
            </>
          )}

          {form.role === "hospital" && (
            <>
              <FormInput
                label="Hospital Name"
                name="hospitalName"
                value={form.hospitalName}
                onChange={handleChange}
              />
              <FormInput
                label="License Number"
                name="licenseNumber"
                value={form.licenseNumber}
                onChange={handleChange}
              />
            </>
          )}

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
            Register
          </button>
        </form>
      )}

      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555" }}>
        Already have an account?
        <Link
          to="/login"
          style={{
            color: "#D94343",
            marginLeft: "5px",
            textDecoration: "underline",
          }}
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
