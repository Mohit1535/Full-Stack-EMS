// In full stack development, a model is used to define the structure of data and how 
// that data interacts with the database.

// enum -> it is used when a field can contain only specific predefined values,
// like role can be "ADMIN" or "EMPLOYEE"
import mongoose from "mongoose";

 const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["ADMIN","EMPLOYEE"],default:"EMPLOYEE"}

 },{timestamps:true})

 const User=mongoose.models.User || mongoose.model("User",userSchema)
 export default User;