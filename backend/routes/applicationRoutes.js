import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../utils/cloudinary.js";
import { postApplication } from "../controllers/postApplication.js";

const router = express.Router();
router.post("/post", isAuthenticated, postApplication);
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);
router.patch("/update-status/:id", isAuthenticated, updateApplicationStatus);

export default router;
