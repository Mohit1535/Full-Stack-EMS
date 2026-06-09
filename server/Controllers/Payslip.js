import Employee from "../models/Employee.js";
import Payslip from "../models/Payslip.js"
export const createPayslip = async (req, res) => {
  try {
    const {
      employeeId,
      basicSalary,
      month,
      year,
      allowances,
      deductions,
    } = req.body;

    if (
      !employeeId ||
      !basicSalary ||
      !month ||
      !year
    ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    const netSalary =
      Number(basicSalary) +
      Number(allowances || 0) -
      Number(deductions || 0);

    const payslip = await Payslip.create({
      employeeId,
      name: `${employee.firstName} ${employee.lastName}`,
      basicSalary: Number(basicSalary),
      allowances: Number(allowances || 0),
      deductions: Number(deductions || 0),
      netSalary,
      month: Number(month),
      year: Number(year),
    });

    return res.json({
      success: true,
      data: payslip,
    });
  } catch (error) {
    console.error("Create Payslip Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getPayslip=async(req,res)=>{
const session=req.session;
const isAdmin=session.role=="ADMIN";
if (isAdmin) {
  const payslips = await Payslip.find()
    .populate("employeeId")
    .sort({ createdAt: -1 })
    .lean();

  const data = payslips.map((obj) => ({
    ...obj,
    id: obj._id.toString(),
    employee: obj.employeeId,
    employeeId: obj.employeeId?._id?.toString(),
  }));

  return res.json({
    data,
    success: true,
  });
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



export const getPayslipById = async (req, res) => {
  try {
    const payslips = await Payslip.findById(req.params.id)
      .populate("employeeId")
      .lean();

    if (!payslips) {
      return res.status(404).json({
        error: "Payslip data not found",
      });
    }

    const result = {
      ...payslips,
      id: payslips._id.toString(),
      employee: payslips.employeeId,
    };

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error: "Operation failed" });
  }
};
