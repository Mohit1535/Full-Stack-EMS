//Get Profile

import Employee from "../models/Employee.js";

//Get/api/profile
export const getProfile=async(req,res)=>{
try{
const session=req.session;
const employee=await Employee.findOne({userId:session.userId})
if(!employee){
//Authenticated user is not of employee return admin profile
return res.json({
    firstName:"Admin",
    lastName:"",
    email:session.email,
})
}
return res.json(employee)
}
catch(error){
    res.status(400).json({error:"employee not found"})
};

}

//Get Profile
//Put/api/profile
export const updateProfile=async(req,res)=>{
try{
const session=req.session;
const employee=await Employee.findOne({userId:session.userId})
    if(!employee){
        return res.status(400).json({error:"Employee not found"})
    }if(employee.isDeleted){
        res.status(403).json({error:"Your account is deactivated you can not update your account"})
    }
await Employee.findByIdAndUpdate(employee._id,{
bio:req.body.bio
})
return  res.json({success:true})

}
catch(error){
return res.json({error:"Failed to update profile"})
}
}

