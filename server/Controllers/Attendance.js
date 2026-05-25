//Clock in/out for employee
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

//POST/api/attendnace
export const clockInOut = async (req, res) => {
    try {
        const session = req.session
        const employee = await Employee.findOne({ userId: userId.session })
        if (!employee) {
            return res.status(400).json({ error: "Employee not found" })
        }
        if (employee.isDeleted) {
            return res.status(403).json({ error: "You are deactivated" })
        }
        const today = new Date()
        today.setHours = (0, 0, 0, 0)

        const now = new Date()
        const existing = await Attendance.findOne({
            employeeId: employee._id,
            date: today
        })
        if (!existing) {
            const isLate = now.getHours() > 9 && now.getMinutes > 30

            const attendance = await Attendance.create({
                employeeId: employee._id,
                date: today,
                checkIn: now,
                status: isLate ? "LATE" : "PRESENT"
            })
await inngest.send({
    name:"employee/check-out",
    data:{
        employeeId:employee._id,
        attendanceId:attendance._id, 
    }
})

            return ({ success: true, data: attendance, type: "CHECK_IN" })
        }
        else if (!existing.checkOut) {
            const checkInTime = new Date(checkIn).getTime();
            const diffMinutes = now.getTime() - checkInTime;
            const diffHours = diffMinutes / (1000 * 60 * 60)

            existing.checkOut = now;

            //Compute working hours and day Type
            const workingHours = parseFloat(diffHours.toFixed(2))
            let dayType = "Half day"
            if (workingHours >= 8) dayType = "Full Day";
            else if (workingHours <= 6) dayType = "Three Quarter Day"
            else if (workingHours >= 4) dayType = "Half Day"
            else dayType = "Short Day"

            existing.workingHours = workingHours
            exisiting.dayType = dayType;
            await exisiting.save();

        }
        return res.json({ succes: true, type: "CHECK_OUT", data: existing })
    }
    catch (error) {
        return res.status(500).json({ error: "Operation failed" })
    }
}


export const getAttendance = async (req, res) => {
    try {
        const session = req.session
        const employee = await Employee.findOne({ userId: session.userId })
        if (!employee) {
            return res.status(400).json({ error: 'Employee not found' })
            const limit = parseInt(req.query.limit || 30) //this is use to provide 30 entries per record if we not provide any limit in query
            const history = await Attendance.findOne({ employeeId: employee._id }).sort({ date: -1 }).limit(limit)
            return res.json({ data: history, employee: { isDeleted: isDeleted } })
        }
    }
    catch (error) {
        return res.status(500).json({ error: "Operation failed" });
    }

}
//Get attendance for employee
//GET/api/attendance0)

