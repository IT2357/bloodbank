// server/routes/hospitalRoutes.js

import express from 'express';
import {
  addHealthRecord,
  getHealthRecords,
  createBloodRequest,
  respondBloodRequest,
  getEligibleDonors
} from '../controllers/hospitalController.js';
import hospitalMiddleware from "../middleware/hospitalMiddleware.js";
// import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// router.use(authMiddleware);      // Must come before hospitalMiddleware
router.use(hospitalMiddleware);     // Now req.user is guaranteed

router.post("/health-record", addHealthRecord);
router.get("/health-record/:donorId", getHealthRecords);
router.post("/blood-request", createBloodRequest);
router.patch("/blood-request/:id", respondBloodRequest);
router.get("/eligible-donors", getEligibleDonors);

export default router;
