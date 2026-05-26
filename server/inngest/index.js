import { Inngest } from "inngest";

import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";

// Create Inngest client
export const inngest = new Inngest({
  id: "HRMS",
});

// ======================================================
// AUTO CHECK-OUT FUNCTION
// ======================================================

const autoCheckOut = inngest.createFunction(
  {
    id: "auto-check-out",
    triggers: [
      {
        event: "employee/check-out",
      },
    ],
  },

  async ({ event, step }) => {
    const { employeeId, attendanceId } = event.data;

    // Wait for 9 hours
    await step.sleepUntil(
      "wait-for-9-hours",
      new Date(Date.now() + 9 * 60 * 60 * 1000)
    );

    // Get attendance data
    let attendance = await Attendance.findById(
      attendanceId
    );

    // If employee has not checked out
    if (!attendance?.checkOut) {
      const employee = await Employee.findById(
        employeeId
      );

      // Send reminder email here
     await sendEmail({
      to:employee.email,
      subject:"Attendance Check-out Reminder",
      body: `
<div
  style="
    max-width: 600px;
    margin: auto;
    padding: 24px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    background: #ffffff;
  "
>
  <h2
    style="
      color: #111827;
      margin-bottom: 16px;
    "
  >
    Hi ${employee.firstName},
  </h2>

  <p
    style="
      font-size: 16px;
      color: #374151;
      margin-bottom: 12px;
    "
  >
    You have a check-in in
    <strong>${employee.department}</strong>
    today:
  </p>

  <p
    style="
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
      margin: 8px 0 20px;
    "
  >
    ${
      attendance?.checkIn
        ? new Date(
            attendance.checkIn
          ).toLocaleTimeString()
        : "No Check-In Time"
    }
  </p>

  <p
    style="
      font-size: 16px;
      color: #374151;
      margin-bottom: 12px;
    "
  >
    Please make sure to check-out in one hour.
  </p>

  <p
    style="
      font-size: 16px;
      color: #374151;
      margin-bottom: 20px;
    "
  >
    If you have any questions, please contact your admin.
  </p>

  <br />

  <p
    style="
      font-size: 16px;
      color: #111827;
      margin: 0;
    "
  >
    Best Regards,
  </p>

  <p
    style="
      font-size: 16px;
      font-weight: bold;
      color: #111827;
      margin-top: 5px;
    "
  >
    HRMS
  </p>
</div>
`
     })

    // Wait for 1 more hour
    await step.sleepUntil(
      "wait-for-1-more-hour",
      new Date(Date.now() + 1 * 60 * 60 * 1000)
    );

    // Fetch latest attendance data again
    attendance = await Attendance.findById(
      attendanceId
    );

    // Auto check-out if still not checked out
    if (attendance && !attendance.checkOut) {
      attendance.checkOut = new Date(
        new Date(attendance.checkIn).getTime() +
          4 * 60 * 60 * 1000
      );

      attendance.workingHours = 4;
      attendance.dayType = "Half Day";
      attendance.status = "LATE";

      await attendance.save();

      console.log(
        `Auto check-out completed for ${employeeId}`
      );
    }
  }
  }
);

// ======================================================
// LEAVE APPLICATION REMINDER
// ======================================================

const leaveApplicationReminder = inngest.createFunction(
  {
    id: "leave-application-reminder",
    triggers: [
      {
        event: "leave/pending",
      },
    ],
  },

  async ({ event, step }) => {
    const { leaveApplicationId } = event.data;

    // Wait for 24 hours
    await step.sleepUntil(
      "wait-for-24-hours",
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    // Find leave application
    const leaveApplication = await Leave.findById(
      leaveApplicationId
    );

    // If still pending
    if (leaveApplication?.status === "PENDING") {
      const employee = await Employee.findById(
        leaveApplication.employeeId
      );

      // Send reminder email here
   await sendEmail({
    to:process.env.ADMIN_EMAIL,
    sunject:'Leave Application Reminder',
    body:`
    <div ctyle="max-width:600px;">
    <h2>Hi Admin, </h2>
    <p style="font-size:16px;">You have a leave application in ${employee.department} today</p>
    <p style='font-size:18px; font-weight:bold; color:#007bff; margin:8px 0;">${leaveApplication?.startDate?.toLocaleDateString()}</p>
    <p style="font-size:16px;">Please make sure to take action on this leave application.</p>
<br/>
<p style="font-size:16px;">Best Regards,</p>    
<p style="font-size:16px;">SUNdigo Hr</p>    

    
    
    
    
    </div>

    
    `
   })
    }
  }
);

// ======================================================
// ATTENDANCE REMINDER CRON JOB
// ======================================================

const attendanceReminderCron = inngest.createFunction(
  {
    id: "attendance-reminder-cron",
    triggers: [
      {
        cron:"TZ=Asia/Kolkata 30 11  * * *"// 06:00 UTC = 11:30 AM IST
      },
    ],
  },

  async ({ step }) => {
    // Step 1: Get today's IST date range
    const today = await step.run(
      "get-today-date",
      async () => {
        const startUTC = new Date(
          new Date().toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
          }) + "T00:00:00+05:30"
        );

        const endUTC = new Date(
          startUTC.getTime() +
            24 * 60 * 60 * 1000
        );

        return {
          startUTC: startUTC.toISOString(),
          endUTC: endUTC.toISOString(),
        };
      }
    );

    // Step 2: Get active employees
    const activeEmployees = await step.run(
      "get-active-employees",
      async () => {
        const employees = await Employee.find({
          isDeleted: false,
          employmentStatus: "ACTIVE",
        }).lean();

        return employees.map((e) => ({
          _id: e._id.toString(),
          firstName: e.firstName,
          lastName: e.lastName,
          email: e.email,
          department: e.department,
        }));
      }
    );

    // Step 3: Get employees on approved leave
    const onLeaveIds = await step.run(
      "get-on-leave-ids",
      async () => {
        const leaves = await Leave.find({
          status: "APPROVED",
          startDate: {
            $lte: new Date(today.endUTC),
          },
          endDate: {
            $gte: new Date(today.startUTC),
          },
        }).lean();

        return leaves.map((l) =>
          l.employeeId.toString()
        );
      }
    );

    // Step 4: Get employees who already checked in
    const checkedInIds = await step.run(
      "get-checked-in-ids",
      async () => {
        const attendances =
          await Attendance.find({
            date: {
              $gte: new Date(today.startUTC),
              $lt: new Date(today.endUTC),
            },
          }).lean();

        return attendances.map((a) =>
          a.employeeId.toString()
        );
      }
    );

    // Step 5: Filter absent employees
    const absentEmployees =
      activeEmployees.filter(
        (emp) =>
          !onLeaveIds.includes(emp._id) &&
          !checkedInIds.includes(emp._id)
      );

    // Step 6: Send reminder emails
    if (absentEmployees.length > 0) {
      await step.run(
        "send-reminder-emails",
        async () => {
          const emailPromises =
            absentEmployees.map(async (emp) => {
     
             sendEmail({
              to:emp.email,
              subject:`Attendance Reminder-Please Mark your Attendance`,
              body:`
              <div style="max-width; 600px; font-family:Arial,sans-serif;">
              <h2>Hi ${emp.firstName},</h2>
              <p style="font-size:16px;">We noticed you have not marked your attendance yet today.</p>
              <p style="font-size:16px;">The deadline was <strong>11:30 AM</strong> and your attendance is still missing.</p>
<p style="font-size:16px;">Please check in as soon as possible or contact your admin if you're facing any issue.</p>
              <br/>
              <p style="font-size:14px; color:#666;">Department:${emp.department}</p>
              <br/>
              <p style="font-size:16px;">Best Regards,</p>
              <p style="font-size:16px;"><strong>Quick EMS <strong>\
              </p>
              </div>
              `
             })
            });

          await Promise.all(emailPromises);
        }
      );
    }

    // Return summary
    return {
      totalActive: activeEmployees.length,
      onLeave: onLeaveIds.length,
      checkedIn: checkedInIds.length,
      absent: absentEmployees.length,
    };
  }
);

// ======================================================
// EXPORT FUNCTIONS
// ======================================================

export const functions = [
  autoCheckOut,
  leaveApplicationReminder,
  attendanceReminderCron,
];
