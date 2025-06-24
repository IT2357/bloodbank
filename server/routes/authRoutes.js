// server/routes/authRoutes.js

import express from "express";
import {
  registerDonor,
  registerHospital,
  approveUser,
  registerAdmin,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";
import { authMiddleware, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register-donor", registerDonor);
router.post("/register-hospital", registerHospital);
router.put("/approve/:id", authMiddleware, restrictTo("admin"), approveUser);
router.post(
  "/register-admin",
  authMiddleware,
  restrictTo("admin"),
  registerAdmin
);
router.post("/login", loginUser);
router.get("/current-user", authMiddleware, getCurrentUser);

export default router;
