import React from "react";
import { format } from "date-fns";

const AttendanceHistory = ({ history, isAdmin }) => {
  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="table-modern w-full">
          <thead>
            <tr>
              {isAdmin && (
                <>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Department</th>
                </>
              )}

              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4">Working Hours</th>
              <th className="px-6 py-4">Day Type</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 8 : 6}
                  className="text-center py-12 text-slate-400"
                >
                  No Records Found
                </td>
              </tr>
            ) : (
              history.map((record) => (
                <tr key={record.id || record._id}>
                  {isAdmin && (
                    <>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {record.employee
                          ? `${record.employee.firstName || ""} ${
                              record.employee.lastName || ""
                            }`
                          : "-"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {record.employee?.department || "-"}
                      </td>
                    </>
                  )}

                  <td className="px-6 py-4 font-medium text-slate-900">
                    {record.date
                      ? format(new Date(record.date), "MMM dd, yyyy")
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {record.checkIn
                      ? format(new Date(record.checkIn), "hh:mm a")
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {record.checkOut
                      ? format(new Date(record.checkOut), "hh:mm a")
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {record.workingHours
                      ? `${Math.floor(record.workingHours)}h ${Math.round(
                          (record.workingHours % 1) * 60
                        )}m`
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {record.dayType || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={
                        record.status === "PRESENT"
                          ? "badge-success"
                          : record.status === "LATE"
                          ? "badge-warning"
                          : "badge-danger"
                      }
                    >
                      {record.status || "-"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;
