import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../components/Loading";
import api from "../api/assests";

const Printpayslips = () => {
  const { id } = useParams();

  const [payslips, setpayslips] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  console.log("Token:", localStorage.getItem("token"));

  api.get(`/payslips/${id}`)
    .then((res) => {
      console.log(res.data);
      setpayslips(res.data.data);
    })
    .catch((err) => {
      console.log("ERROR:", err.response?.data);
      console.log("STATUS:", err.response?.status);
    })
    .finally(() => setLoading(false));
}, [id]);

  // Safe date formatter — won't crash if year/month are missing
  const formatPeriod = (year, month) => {
    if (!year || !month) return "N/A";
    const date = new Date(Number(year), Number(month) - 1);
    if (isNaN(date.getTime())) return "N/A";
    return format(date, "MMMM yyyy");
  };

  if (loading) {
    return <Loading className="w-4 h-4" />;
  }

  if (!payslips) {
    return (
      <p className="text-center py-12 text-slate-400">
        payslips not found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 print:bg-white">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 print:shadow-none print:border-none">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-orange-600 px-8 py-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">payslips</h1>
              <p className="text-orange-100 mt-1 text-sm">
                {formatPeriod(payslips.year, payslips.month)}
              </p>
            </div>

            <img
              src="/images/sundigo.png"
              alt="Company Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">

          {/* Employee Details */}
          <div className="grid grid-cols-2 gap-6 mb-10">

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-slate-400 mb-1">Employee Name</p>
              <p className="font-semibold text-slate-900">
                {payslips.employee?.firstName ?? "—"}{" "}
                {payslips.employee?.lastName ?? ""}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-slate-400 mb-1">Position</p>
              <p className="font-semibold text-slate-900">
                {payslips.employee?.position ?? "—"}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-slate-400 mb-1">Email</p>
              <p className="font-semibold text-slate-900">
                {payslips.employee?.email ?? "—"}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4">
              <p className="text-xs text-slate-400 mb-1">Period</p>
              <p className="font-semibold text-slate-900">
                {formatPeriod(payslips.year, payslips.month)}
              </p>
            </div>

          </div>

          {/* Salary Table */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left py-4 px-5 font-medium">Description</th>
                  <th className="text-right py-4 px-5 font-medium">Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-5 text-slate-700">Basic Salary</td>
                  <td className="text-right py-4 px-5 font-semibold text-slate-900">
                    ₹{(payslips.basicSalary ?? 0).toLocaleString()}
                  </td>
                </tr>

                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-5 text-slate-700">Allowances</td>
                  <td className="text-right py-4 px-5 font-semibold text-green-600">
                    + ₹{(payslips.allowances ?? 0).toLocaleString()}
                  </td>
                </tr>

                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-5 text-slate-700">Deductions</td>
                  <td className="text-right py-4 px-5 font-semibold text-red-500">
                    - ₹{(payslips.deductions ?? 0).toLocaleString()}
                  </td>
                </tr>

                <tr className="border-t-2 border-slate-300 bg-orange-50">
                  <td className="py-5 px-5 font-bold text-slate-900 text-base">
                    Net Salary
                  </td>
                  <td className="text-right py-5 px-5 font-bold text-orange-600 text-lg">
                    ₹{(payslips.netSalary ?? 0).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-slate-400">
              This is a system generated payslips.
            </p>

            <button
              onClick={() => window.print()}
              className="print:hidden px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              Print payslips
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Printpayslips;
