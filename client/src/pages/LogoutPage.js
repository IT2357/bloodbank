// pages/LogoutPage.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    toast.success("You’ve been logged out.");
    navigate("/login");
  }, [dispatch, navigate]);

  return null;
};

export default LogoutPage;
