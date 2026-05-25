import mongoose from "mongoose";

const leaveSchema=new mongoose.Schema({
employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee",required:true},
leaveType:{type:String,enum:["SICK","CASUAL","ANNUAL"],required:true},
startDate:{type:Date, required:true},
endDate:{type:Date, required:true},
reason:{type:String,required:true},
status:{type:String,enum:["APPROVED","PENDING","REJECTED"],default:"PENDING"}

},{timeStamp:true})
const Leave=mongoose.models.Leave ||mongoose.model("Leave",leaveSchema)
export default Leave;