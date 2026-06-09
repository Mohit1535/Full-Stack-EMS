import { format } from 'date-fns'
import { DownloadIcon } from 'lucide-react'
import React from 'react'

const PayslipList = ({ payslips, isAdmin,employee }) => {


  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin &&
              <>
                 <th>Employee</th>
                 <th>Department</th>

              </>
           }
              <th>Period</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="text-center py-12 text-slate-400"
                >
                  No Payslips Found
                </td>
              </tr>
            ) : (
              payslips.map((p) => (
                <tr key={p.id || p._id}>
                  {isAdmin && (
                    <>
                    <td className="text-slate-900">
                      {p.employee?.firstName} {p.employee?.lastName}

                      
                    </td>
                    <td>{p.employee?.department}</td>
                    </>
                  )}

                  <td className="text-xs text-slate-500">
                    {format(new Date(p.year, p.month - 1), "MMMM yyyy")}
                  </td>

                  <td className="text-slate-500">
                      ₹{p.basicSalary?.toLocaleString()}
                  </td>

                  <td className="font-medium text-slate-800">
                      ₹{p.netSalary?.toLocaleString()}
                  </td>
<td className="text-center">
  <button
    onClick={() =>
window.open(`/payslips/print/${p.id || p._id}`, "_blank")
    }
    className="btn-primary flex items-center gap-2 justify-center"
  >
    <DownloadIcon className="h-4 w-4" />
    Download
  </button>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PayslipList
