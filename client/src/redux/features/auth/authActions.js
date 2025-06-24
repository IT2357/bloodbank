import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import toast from "react-hot-toast";

// Login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      }

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Register (dynamic route selection based on role)
export const userRegister = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line
      const { role, setPendingApproval, ...rest } = payload;
      let endpoint = "";

      if (role === "donor") {
        endpoint = "/auth/register-donor";
      } else if (role === "hospital") {
        endpoint = "/auth/register-hospital";
      } else if (role === "admin") {
        endpoint = "/auth/register-admin";
      } else {
        throw new Error("Unknown role selected");
      }

      const { data } = await API.post(endpoint, payload);

      if (data.success !== false) {
        toast.success(data.message);

        if (role === "hospital") {
          toast.info(
            "Your hospital registration request is under review. You’ll be notified upon approval."
          );
          if (setPendingApproval) setPendingApproval(true);
        }
      }

      return data;
    } catch (error) {
      const message = error?.response?.data?.message || "Registration failed.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      return res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Unable to fetch user.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
