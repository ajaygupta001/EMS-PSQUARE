import express from "express";
const candidateRoutes = express.Router();
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
  createCandidate,
  getCandidates,
  updateCandidateStatus,
  convertToEmployee,
  deleteCandidate,
} from "../controllers/candidateController.js";
import { uploadResume } from "../middlewares/uploadMiddleware.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

// Protected routes
candidateRoutes.post(
  "/create",
  protect,
  authorize(["admin"]),
  //   upload.single("resume"),
  uploadResume,
  createCandidate
);
candidateRoutes.get("/get", protect, authorize(["admin"]), getCandidates);
candidateRoutes.put(
  "/status/:id",
  protect,
  authorize(["admin"]),
  updateCandidateStatus
);
candidateRoutes.post(
  "/convert/:id",
  protect,
  authorize(["admin"]),
  convertToEmployee
);

candidateRoutes.delete(
  "/delete/:id",
  protect,
  authorize(["admin"]),
  deleteCandidate
);

export default candidateRoutes;
