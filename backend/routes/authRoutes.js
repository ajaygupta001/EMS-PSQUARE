import express from "express";
const authRoutes = express.Router();
import { protect, authorize } from "../middlewares/authMiddleware.js";
import { login, signup } from "../controllers/authController.js";


authRoutes.post("/signup", signup);
authRoutes.post("/login", login);


export default authRoutes;
