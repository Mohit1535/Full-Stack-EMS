import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { createLeave, getLeave, updateLeave } from "../Controllers/Leave.js";

const leaveRouter = Router();

leaveRouter.post("/", protect, createLeave);
leaveRouter.patch("/:id", protect, updateLeave);
leaveRouter.get("/", protect, getLeave);

export default leaveRouter;