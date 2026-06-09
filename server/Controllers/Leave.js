import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import { inngest } from "../inngest/index.js";
//get leave
export const getLeave = async (req, res) => {
    try {

        const session = req.session;
        const isAdmin = session.role === "ADMIN";

        if (isAdmin) {

            const status = req.query.status;
            const where = status ? { status } : {};

            const leaves = await Leave.find(where)
                .populate("employeeId")
                .sort({ createdAt: -1 })
                .lean();

            const data = leaves.map((l) => {
                return {
                    ...l,
                    id: l._id.toString(),
                    employee: l.employeeId,
                    employeeId: l.employeeId?._id?.toString()
                };
            });

            return res.json({ data, success: true });

        } else {

            const employee = await Employee.findOne({
                userId: session.userId
            });

            if (!employee) {
                return res.status(400).json({
                    error: "Not found"
                });
            }

            const leaves = await Leave.find({
                employeeId: employee._id
            }).sort({ createdAt: -1 });

            return res.json({
                data: leaves,
                employee: {
                    ...employee.toObject(),
                    id: employee._id.toString()
                }
            });
        }

    } catch (error) {
        return res.status(500).json({
            error: "Operation failed"
        });
    }
};





//create leave
export const createLeave = async (req, res) => {

    try {

        const session = req.session;

        const employee = await Employee.findOne({
            userId: session.userId
        });

        if (!employee) {
            return res.status(400).json({
                error: "Employee not found"
            });
        }

        if (employee.isDeleted) {
            return res.status(403).json({
                error: "Your account is deactivated"
            });
        }

        const { type, startDate, endDate, reason } = req.body;

        if (!type || !startDate || !endDate) {
            return res.status(400).json({
                error: "Please fill all required fields"
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (
            new Date(startDate) <= today ||
            new Date(endDate) <= today
        ) {
            return res.json({
                error: "please enter the future date"
            });
        }

        if (new Date(endDate) < new Date(startDate)) {
            return res.json({
                error: "please enter the end date more then start date"
            });
        }
   console.log("BODY:", req.body);
        console.log("SESSION:", req.session);
        const leave = await Leave.create({
            
            employeeId: employee._id,
            startDate,
            endDate,
            reason,
            type,
            status: "PENDING"
        });
// await inngest.send({

    // name:"leave/pending",
    // data:{leaveApplicationId:leave._id,}
// })
        return res.json({
            data: leave,
            success: true
        });

} catch (error) {
    console.log("CREATE LEAVE ERROR:", error);

    return res.status(500).json({
        error: error.message
    });
}
}






//update leave
export const updateLeave = async (req, res) => {

    try {

        const { status } = req.body;

        if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
            return res.status(400).json({
                error: "Leave status not found"
            });
        }

        const leave = await Leave.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        return res.json({
            success: true,
            data: leave
        });

    } catch (error) {

        return res.status(500).json({
            error: "Operation failed"
        });
    }
};
