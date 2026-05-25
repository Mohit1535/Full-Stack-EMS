import "dotenv/config"
import User from "./models/User.js";
import bcrypt from 'bcrypt'
import connectDB from "./config/db.js";

async function registerAdmin(){
    try{
const ADMIN_EMAIL=process.env.ADMIN_EMAIL;
if(!ADMIN_EMAIL){
    console.log("Missing ADMIN-EMAIL env variables")
    process.exit(1);
}
// process.exit(1)

// Ends the program with an error/failure.
// Non-zero values usually indicate something went wrong.


// process.exit(0)

// Ends the program successfully.
// 0 means “no error”.

await connectDB()
const existingAdmin=await User.findOne({email:process.env.ADMIN_EMAIL})
if(existingAdmin){
    console.log("User already exists as role", existingAdmin.role);
    process.exit(0)
}
const TemporaryPassword="admin@123"
const hashedPassword=await bcrypt.hash(TemporaryPassword,10)
const admin=await User.create({
    email:process.env.ADMIN_EMAIL,
    password:hashedPassword,
    role:"ADMIN",
})
console.log("Admin user created");
console.log("\nemail:",admin.email);
console.log("password:",TemporaryPassword);
console.log("\nchange the password afetr login.");
process.exit(0)

    }
    catch(error){
console.error("Seed failed",error);
    }
}
registerAdmin();