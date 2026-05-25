import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js"
export const createPayslip=async(req,res)=>{

  try{
const {employeeId,basicSalary,month,year, allowances,deductions}=req.body
if(!employeeId,!basicSalary,!month,!year,!allowances,!deductions){
  return res.status(400).json({error:"Missing field"});
}

const netSalary=Number(basicSalary)+Number(allowances || 0)-Number(deductions || 0)
const payslips=await Payslip.create({
  employeeId,
  basicSalary:Number(basicSalary),
  allowances:Number(allowances || 0),
  deductions:Number(deductions ||  0),
  netSalary,
  month:Number(month),
  year:Number(year)

})
return res.json({data:payslips,success:true});
}
catch(error){
  return res.status(500).json({error:"Operation failed"});
}
}


export const getPayslip=async(req,res)=>{
const session=req.session;
const isAdmin=session.role=="ADMIN";
if(isAdmin){
const payslips=await Payslip.find().populate("employeeId").sort({createdAt:-1}).lean();
const data=payslips.map((p)=>{
  const obj=p.toObject();
  return{
 ...obj,
    id:obj._id.toString(),
    employee:obj.employeeId,
    employeeId:obj.employeeId?._id?.toString(),
  }
})
return res.json({data:payslips,sucess:true})
}
else{
  const session=req.session;
const employee=await Employee.findOne({
  userId:session.userId
})
if(!employee){
  return res.status(400).json({error:"Employee not found"})
}
const payslips=await Payslip.find({employeeId:employee._id}).sort({createdAt:-1}).lean()
return res.json({data:payslips})
}
}
export const getPayslipById=async(req,res)=>{
try{
const payslips=await Payslip.findById(req.params.id).populate(employeeId).sort({createdAt:-1}).lean()
if(!payslips){
  return res.status(400).json({error:"Payslip data not found"});
}
const result={
  ...payslips,
  id:payslips._id.toString(),
  employee:payslips.employeeId
}
return res.json({success:true,data:result});
}
catch(error){
return res.status(500).json({error:"Operation failed"})

}
}