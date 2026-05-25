import mongoose from "mongoose";
export const DEPARTMENTS = ["Engineering", "Human Resources", "Marketing", "Sales", "Finance", "Operations", "IT Support", "Customer Success", "Product Management", "Design"];

const employeeSchema=new mongoose.Schema({
userId:{type:mongoose.Schema.Types.ObjectId,required:true,unique:true,ref:"User"},
firstName:{type:String, required:true},
lastName:{type:String, required:true},
email:{type:String, required:true,unique:true},
phone:{type:String, required:true,unique:true},
position:{type:String, required:true},
basicSalary:{type:Number,default:0},
allowances:{type:Number,default:0},
deduction:{type:Number,default:0},
employementStatus:{type:String,default:"ACTIVE",enum:["ACTIVE","INACTIVE"]},
joinDate:{type:Date,required:true},
isDeleted:{type:Boolean,default:false},
bio:{type:String,default:""},
department:{type:String, enum:DEPARTMENTS}
},


{timestamps:true})


const Employee=mongoose.models.Employee || mongoose
.model("Employee",employeeSchema)
export default Employee;