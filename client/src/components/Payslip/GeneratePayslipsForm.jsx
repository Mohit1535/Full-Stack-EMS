import { PlusIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import Loading from "../Loading";
import toast from "react-hot-toast";
import api from "../../api/assests";

const GeneratePayslipsForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) {
    return (
      <button
        className="btn-primary flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon className="w-4 h-4" />
        Generate Payslip
      </button>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("Payslip Data:", data);

    try {
      await api.post("/payslips", data);

      toast.success("Payslip generated successfully");

      setIsOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error.response?.data);

      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex
      items-center justify-center z-50 p-4"
    >
      <div className="card max-w-lg w-full p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Generate Monthly Payslip
          </h3>

          <button type="button" onClick={() => setIsOpen(false)}>
            <XIcon size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>

            <select
              required
              name="employeeId"
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Employee</option>

              {employees.map((employee) => (
                <option key={employee.id || employee._id} value={employee.id || employee._id}>
                  {employee.firstName} {employee.lastName} (
                  {employee.position})
                </option>
              ))}
            </select>
          </div>

          {/* Month */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Month
            </label>

            <select
              required
              name="month"
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select Month</option>

              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Year
            </label>

            <input
              required
              type="number"
              name="year"
              defaultValue={new Date().getFullYear()}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Basic Salary
            </label>

            <input
              required
              min="0"
              type="number"
              name="basicSalary"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Allowances & Deductions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Allowances
              </label>

              <input
                required
                min="0"
                type="number"
                defaultValue="0"
                name="allowances"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deductions
              </label>

              <input
                required
                min="0"
                type="number"
                defaultValue="0"
                name="deductions"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              {loading && <Loading className="w-4 h-4" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslipsForm;
