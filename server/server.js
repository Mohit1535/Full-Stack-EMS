//express-> using this we can create backend server
//cors->allow backend to connect with frontend url
//dotenv->using this we add the environment variables in our project
//multer->using this we can parse the form data
//json web token->it is use for user authentication token
//bcrypt->we will encrypt user password and store in data base
//mongoose->we can connect our project with mongoose

import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

import authRouter from "./routes/authRoute.js";
import employeesRouter from "./routes/employeeRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoute.js";
import payslipsRouter from "./routes/payslipsRoute.js";
import leaveRouter  from "./routes/leaveRoutes.js";
import dashboardRouter from "./routes/dashboard.js";
const app=express()
const PORT=process.env.PORT || 4000;

//Middleware
app.use(cors())
app.use(express.json())
app.use(multer().none())

//Routes
app.get("/",(req,res)=>res.send("server is running"))
app.use("/api/auth",authRouter)
app.use("/api/employees",employeesRouter)
app.use("/api/profile",profileRouter)
app.use("/api/attendance",attendanceRouter)
app.use("/api/leave",leaveRouter)
app.use("/api/payslips",payslipsRouter);
app.use("/api/dashboard",dashboardRouter);
app.use("/api/inngest", serve({ client: inngest, functions }));
await connectDB()


app.listen(PORT, ()=>{
console.log(`{server is running on port ${PORT}}`)
})


