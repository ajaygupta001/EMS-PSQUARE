import express from "express";
const employeeRoutes = express.Router();
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

employeeRoutes.get("/get", protect, authorize(["admin"]), getEmployees);
employeeRoutes.put("/:id", protect, authorize(["admin"]), updateEmployee);
employeeRoutes.delete("/:id", protect, authorize(["admin"]), deleteEmployee);

export default employeeRoutes;
