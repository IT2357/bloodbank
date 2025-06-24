import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../redux/features/auth/authActions";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isApproved, loading } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <p>Loading user information...</p>;
  }

  if (user?.role === "hospital" && isApproved === false) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Access Restricted</h2>
        <p>
          Your hospital registration is awaiting admin approval. Please try
          again later.
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
