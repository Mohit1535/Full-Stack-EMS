import React, { useEffect } from "react";
import { dummyEmployeeDashboardData } from "../assets/assests";
import toast from "react-hot-toast";
import api from "../api/assests"

const EmployeeCard = ({ employee,  onEdit, onDelete }) => {
const isDeleted=false;

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete the record?")) {
    return;
  }

  try {
    const res = await api.delete(`/employees/${employee.id}`);

    console.log("DELETE SUCCESS:", res.data);

    if (onDelete) {
      await onDelete();
    }

    toast.success("Employee deleted");
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    console.error(error);

    toast.error(error.response?.data?.error || error.message);
  }
};
  return (
   
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* Top Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
        
        {/* Avatar */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-slate-100 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl font-semibold text-indigo-500 uppercase">
              {employee.firstName?.[0]}
              {employee.lastName?.[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">
          {employee.firstName} {employee.lastName}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {employee.position}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          {employee.department}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(employee)}
            className="flex-1 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition text-sm font-medium"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            
            className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition text-sm font-medium"
          >
        {isDeleted===true? "Deleted" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
