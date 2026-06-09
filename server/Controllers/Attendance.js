import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// POST /api/attendance
export const clockInOut = async (req, res) => {
  try {
    const session = req.session;

    const employee = await Employee.findOne({
      userId: session.userId,
    });

    if (!employee) {
      return res.status(400).json({
        error: "Employee not found",
      });
    }

    if (employee.isDeleted) {
      return res.status(403).json({
        error: "You are deactivated",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const now = new Date();

    const existing = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    // CLOCK IN
    if (!existing) {
      const isLate =
        now.getHours() > 9 ||
        (now.getHours() === 9 && now.getMinutes() > 30);

      const attendance = await Attendance.create({
        employeeId: employee._id,
        date: today,
        checkIn: now,
        status: isLate ? "LATE" : "PRESENT",
      });

      return res.json({
        success: true,
        type: "CHECK_IN",
        data: attendance,
      });
    }

    // CLOCK OUT
   
if (!existing.checkOut) {
  const checkInTime = new Date(existing.checkIn).getTime();

  const diffMilliseconds = now.getTime() - checkInTime;

  // Convert milliseconds to hours
  const workingHours = Number(
    (diffMilliseconds / (1000 * 60 * 60)).toFixed(2)
  );

  existing.checkOut = now;

  let dayType = "SHORT_DAY";

  if (workingHours >= 8) {
    dayType = "FULL_DAY";
  } else if (workingHours >= 6) {
    dayType = "THREE_QUARTER_DAY";
  } else if (workingHours >= 4) {
    dayType = "HALF_DAY";
  }

  existing.workingHours = workingHours;
  existing.dayType = dayType;

  await existing.save();

  return res.json({
    success: true,
    type: "CHECK_OUT",
    data: existing,
  });
}
    return res.status(400).json({
      error: "Attendance already completed for today",
    });
  } catch (error) {
    console.error("Attendance Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

// GET /api/attendance
export const getAttendance = async (req, res) => {
  try {

    const session = req.session;
           const isAdmin = session.role === "ADMIN";
 if (isAdmin) {
  const attendance = await Attendance.find()
    .populate("employeeId")
    .sort({ createdAt: -1 })
    .lean();

  const history = attendance.map((obj) => ({
    ...obj,
    id: obj._id.toString(),
    employee: obj.employeeId,
    employeeId: obj.employeeId?._id?.toString(),
  }));

  return res.json({
    data:history,
    success: true,
  });
}
    const employee = await Employee.findOne({
      userId: session.userId,
    });

    if (!employee) {
      return res.status(400).json({
        error: "Employee not found",
      });
    }

    const limit = parseInt(req.query.limit || 30);

    const history = await Attendance.find({
      employeeId: employee._id,
    })
      .sort({ date: -1 })
      .limit(limit);

    return res.json({
      data: history,
      employee: {
        isDeleted: employee.isDeleted,
      },
    });
  } catch (error) {
    console.error("Get Attendance Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};
