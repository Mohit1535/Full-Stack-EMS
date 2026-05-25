import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { format } from "date-fns";
import { dummyPayslipData } from "../assets/assests";

// Import Company Logo


const PrintPayslip = () => {
  const { id } = useParams();

  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPayslip(dummyPayslipData.find((s) => s.id === id));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <Loading className="w-4 h-4" />;

  if (!payslip)
    return (
      <p className="text-center py-12 text-slate-400">
        Payslip not found
      </p>
    );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 print:bg-white">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 animate-fade-in print:shadow-none print:border-none">

        {/* Top Header */}
       <div className="bg-gradient-to-r from-slate-900 to-orange-600 px-8 py-8 text-white relative">

          {/* Logo */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-wide">
                PAYSLIP
              </h1>

              <p className="text-orange-100 mt-1 text-sm">
                {format(
                  new Date(payslip.year, payslip.month - 1),
                  "MMMM yyyy"
                )}
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/20">
              <img
                src="/images/sundigo.png" 
                alt="Company Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">

          {/* Employee Details */}
          <div className="grid grid-cols-2 gap-6 mb-10">

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Employee Name
              </p>

              <p className="font-semibold text-slate-900 text-lg">
                {`${payslip.employee?.firstName} ${payslip.employee?.lastName}`}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Position
              </p>

              <p className="font-semibold text-slate-900 text-lg">
                {payslip.employee?.position}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Email
              </p>

              <p className="font-semibold text-slate-900">
                {payslip.employee?.email}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Period
              </p>

              <p className="font-semibold text-slate-900">
                {format(
                  new Date(payslip.year, payslip.month - 1),
                  "MMMM yyyy"
                )}
              </p>
            </div>
          </div>

          {/* Salary Table */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left py-4 px-5 font-medium tracking-wide">
                    Description
                  </th>

                  <th className="text-right py-4 px-5 font-medium tracking-wide">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-5 text-slate-700">
                    Basic Salary
                  </td>

                  <td className="text-right py-4 px-5 font-semibold text-slate-900">
                    ${payslip.basicSalary?.toLocaleString()}
                  </td>
                </tr>

                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-5 text-slate-700">
                    Allowances
                  </td>

                  <td className="text-right py-4 px-5 font-semibold text-green-600">
                    + ${payslip.allowances?.toLocaleString()}
                  </td>
                </tr>

                <tr className="border-t border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-5 text-slate-700">
                    Deductions
                  </td>

                  <td className="text-right py-4 px-5 font-semibold text-red-500">
                    - ${payslip.deductions?.toLocaleString()}
                  </td>
                </tr>

                <tr className="border-t-2 border-slate-300 bg-orange-50">
                  <td className="py-5 px-5 font-bold text-slate-900 text-base">
                    Net Salary
                  </td>

                  <td className="text-right py-5 px-5 font-bold text-orange-600 text-lg">
                    ${payslip.netSalary?.toLocaleString()}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center justify-center gap-4">

            <p className="text-xs text-slate-400 text-center">
              This is a system generated payslip.
            </p>

            <button
              className="print:hidden px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              onClick={() => window.print()}
            >
              Print Payslip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPayslip;