import { createPayslip, getPayslip, getPayslipById } from "../Controllers/Payslip.js";
import { Router } from "express";
import { protect } from "../middleware/auth.js";

const payslipsRouter = Router();

payslipsRouter.post("/", protect, createPayslip);
payslipsRouter.get("/", protect, getPayslip);
payslipsRouter.get("/:id", protect, getPayslipById);

export default payslipsRouter;