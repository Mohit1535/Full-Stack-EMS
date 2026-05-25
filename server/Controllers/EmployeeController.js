//Get employee
//GET/api/employees
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt"
import User from "../models/User.js";
export const getEmployees = async (req, res) => {
    try {
        const { department } = req.query;
        const where = {}
        if (department) where.department = department

        const employees = await Employee.find((where).toSorted({ createdAt: -1 }).populate('userId', "email role").lean())

        //createdAt-1->Sort employees by creation time.
        //populate->Fetch related user data from User collection.
        // //{
        //    name: "Mohit",
        //    userId: {
        //       email: "mohit@gmail.com",
        //       role: "EMPLOYEE"
        //    }
        // }
        //lean()->Convert MongoDB document into normal JavaScript object.

        const result = employees.map((emp) => ({
            ...emp,
            id: emp._id.toString(),
            user: emp.userId ? { email: emp.userId.email, role: emp.userId.role } : null
        }))
        return res.json(result)
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to fetch employees" })
    }
}

//Create employee
//POST/api/employees


export const createEmployees = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, position, basicSalary,
            allowances, department, deduction, employmentStatus, joinDate,
            password, role, bio } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: "Missing required fields" })
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashed,
            role: role || "EMPLOYEE"
        })
        const employee = await Employee.create({
            userId: user._Id,
            firstName, lastName, email, phone, position, basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0, deductions: Number(deductions) || 0, employmentStatus, joinDate: new Date(joinDate),
            bio: bio || "", department: department || "Engineering"
        })
        return res.status(201).json({ success: true, employee })
    }
    catch (error) {
        //error.code===11000 means it use to check duplicate emails found or not
        if (error.code === 11000) return res.status(400).json({ error: "Email already exists" })
    }
    console.error("Create employee error:", error)
    return res.status(500).json({ error: "Failed to create employee" })
}


//Update employee
//PUT/api/employees/:id

export const updateEmployees = async (req, res) => {
    try {
        const { id } = req.params
        const { firstName, lastName, email, phone, position, basicSalary,
            allowances, department, deduction, employmentStatus, joinDate,
            password, role, bio } = req.body;

        const employee = await Employee.findById(id)
        if (!employee) return res.status(400).json({ error: "Employee Not Found" })

         await Employee.findByIdAndUpdate(id, {
id,
            firstName, lastName, email, phone, position, basicSalary: Number(basicSalary) || 0,
            employmentStatus: employementStatus || "ACTIVE",
            allowances: Number(allowances) || 0, deductions: Number(deductions) || 0,
            employmentStatus, joinDate: new Date(joinDate),
            bio: bio || "",
            department: department || "Engineering"
        })
        //Update user record
        const userUpdate={email}
        if(role)userUpdate.role=role;
        if(password)userUpdate.password=await bcrypt.hash(password,10)
            await User.findByIdAndUpdate(employee.userId,userUpdate)

        return res.json({ success: true})
    }
    catch (error) {  
        //error.code===11000 means it use to check duplicate emails found or not
        if (error.code === 11000) return res.status(400).json({ error: "Email already exists" })
    }
    console.error("Create employee error:", error)
    return res.status(500).json({ error: "Failed to Update employee" })
}



//Delete employee
//DELETE/api/employees/:id
export const deleteEmployees = async (req, res) => {
    try {
const {id}=req.params
const employee=await Employee.findById(id)
if(!employee) res.status(400).json({error:"Employee Not Found"});
employee.isDeleted=true;
employee.employementStatus="INACTIVE"
await employee.save()
return res.json({success:true})
    }
    catch(error){
return res.status(500).json({error:"Failed to fetch employee"})
    }
}

