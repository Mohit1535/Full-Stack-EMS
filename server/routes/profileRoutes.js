import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getProfile, updateProfile } from "../Controllers/profileController.js";

const profileRouter = Router();

// Update Profile
profileRouter.post("/", protect, updateProfile);

// Get Profile
profileRouter.get("/", protect, getProfile);

export default profileRouter;