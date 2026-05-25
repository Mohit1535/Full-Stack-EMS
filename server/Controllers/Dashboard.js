import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
import Payslip from "../models/Payslip.js";
import { DEPARTMENTS } from "../models/Employee.js";

export const getDashboard = async (req, res) => {
    try {
        const session = req.session;
        const isAdmin = session.role === "ADMIN";

        // ================= ADMIN =================
        if (isAdmin) {

            const [totalEmployees, todayAttendance, pendingLeaves] =
                await Promise.all([

                    Employee.countDocuments({
                        isDeleted: { $ne: true } //$ne->not equal
                    }),

                    Attendance.countDocuments({
                        date: {
                            $gte: new Date(new Date().setHours(0, 0, 0, 0)),//$gte-> greater then or equal to
                            $lt: new Date(new Date().setHours(24, 0, 0, 0)),//$lt-> //less than or qual to
                        }
                    }),

                    Leave.countDocuments({
                        status: "PENDING"
                    })
                ]);

            return res.json({
                role: "ADMIN",
                totalEmployees,
                totalDepartments: DEPARTMENTS.length,
                todayAttendance,
                pendingLeaves
            });
        }

        // ================= EMPLOYEE =================

        const employee = await Employee.findOne({
            userId: session.userId
        }).lean();

        if (!employee) {
            return res.status(500).json({
                error: "Employee not found"
            });
        }

        const today = new Date();

        const [
            currentMonthAttendance,
            pendingLeave,
            latestPayslip
        ] = await Promise.all([

            Attendance.countDocuments({
                employeeId: employee._id,
                date: {
                    $gte: new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        1
                    ),

                    $lt: new Date(
                        today.getFullYear(),
                        today.getMonth() + 1,
                        1
                    )
                }
            }),

            Leave.countDocuments({
                employeeId: employee._id,
                status: "PENDING"
            }),

            Payslip.findOne({
                employeeId: employee._id
            })
                .sort({ createdAt: -1 })
                .lean()
        ]);

        return res.json({
            role: "EMPLOYEE",

            employee: {
                ...employee,
                id: employee._id.toString()
            },

            currentMonthAttendance,

            pendingLeave,

            latestPayslip: latestPayslip
                ? {
                    ...latestPayslip,
                    id: latestPayslip._id.toString()
                }
                : null
        });

    } catch (error) {

        return res.status(500).json({
            error: "Operation failed"
        });
    }
};