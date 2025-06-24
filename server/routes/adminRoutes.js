import express from "express";
import { approveHospital } from "../controllers/adminController.js";
import { authMiddleware, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("testing success");
});
router.put(
  "/approve-hospital/:id",
  authMiddleware,
  restrictTo("admin"),
  approveHospital
);

export default router;
