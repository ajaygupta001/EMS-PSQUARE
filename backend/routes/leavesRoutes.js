import express from "express";
const leaveRoutes = express.Router();
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
  applyLeave,
  updateLeaveStatus,
  getApprovedLeaves,
} from "../controllers/leaveController.js";
import { uploadLeaveDoc } from "../middlewares/uploadMiddleware.js";

leaveRoutes.post("/", protect, uploadLeaveDoc, applyLeave);
leaveRoutes.put("/:id", protect, authorize(["admin"]), updateLeaveStatus);
leaveRoutes.get("/approved", protect, authorize(["admin"]), getApprovedLeaves);

export default leaveRoutes;
