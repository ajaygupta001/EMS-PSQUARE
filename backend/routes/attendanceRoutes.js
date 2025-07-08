import express from "express";
const attendanceRoutes = express.Router();
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
  getAttendance,
  markAttendance,
} from "../controllers/attendanceController.js";

attendanceRoutes.post("/", protect, authorize(["admin"]), markAttendance);
attendanceRoutes.get(
  "/",
  protect,
  authorize(["admin", "employee"]),
  getAttendance
);

export default attendanceRoutes;
