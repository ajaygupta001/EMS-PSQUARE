import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnect from "../config/db.js";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "../routes/authRoutes.js";
import candidateRoutes from "../routes/candidatesRoutes.js";
import employeeRoutes from "../routes/employeesRoutes.js";
import attendanceRoutes from "../routes/attendanceRoutes.js";
import leaveRoutes from "../routes/leavesRoutes.js";

//Required for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dbConnect();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Serve uploads folder as static
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "middlewares/uploads"))
// );

// Serve uploads folder as static
app.use("/uploads", express.static("middlewares/uploads"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);

// Default
app.get("/", (req, res) => {
  res.send("HRMS API is running...");
});

const Port = process.env.PORT || 6000;

app.listen(Port, async () => {
  console.log(`Server is running on port ${Port}`);
});
