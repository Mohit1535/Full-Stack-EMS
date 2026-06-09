import React, { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assests";
import {
  Plus,
  Search,
  XIcon,
  Users,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import EmployeeCard from "../components/EmployeeCard";
import Loading from "../components/Loading";
import EmployeeForm from "../components/EmployeeForm";
import api from "../api/assests";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [selectDept]);

  const fetchEmployees=useCallback(async()=>{
    
// Before Backend->
    // const data = dummyEmployeeData.filter((emp) =>
    //   selectDept ? emp.department === selectDept : emp
    // );

    // setEmployees(data);

    // setTimeout(() => {
    //   setLoading(false);
    // }, 800);

  //After Backend    
  try{
const url=selectDept? `/employees?department=${selectDept}`:"/employees";
const res=await api.get(url);
setEmployees(res.data)
}
catch(error){
  console.error("Failed to fetch employees")
}
finally{
  setLoading(false)
}
},[selectDept]) 



  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4"
            size={16}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Employee..."
            className="w-full pl-10"
          />
        </div>

        <select
          className="max-w-40"
          value={selectDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">All Departments</option>

          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>

      {/* Loader */}
      {loading ? (
     <Loading/>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.length === 0 ? (
              <p className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                No employees found
              </p>
            ) : (
              filtered.map((emp) => (
                <EmployeeCard
                  key={emp.id}
                  employee={emp}
                  onEdit={setEditEmployee}
                  onDelete={fetchEmployees}
                />
              ))
            )}
          </div>

          {/* Create Modal-> this is use to add new employee in the website it show pop up for adding employee */}
          {showCreateModal && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
              onClick={() => setShowCreateModal (false)}
            >
              <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
 


                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Add New Employee
                    </h2>
             
                  </div>

                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 rounded-lg hover:bg-slate-100"
                  >
                    <XIcon size={18} />
                  </button>
                </div> 

                {/* Body */}
                <div className="p-6">
                
                 <EmployeeForm
               
                 onSuccess={()=>{setShowCreateModal(true)
                            fetchEmployees();
                 }}
       onCancel={()=>setShowCreateModal(false)}
                 />
           
                </div>
              </div>
            </div>
          )}
        </>
      )}


      {/* Edit Employee Model */}
{editEmployee && (
  <div
    className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm"
    onClick={() => setEditEmployee(null)}
  >
    <div
      className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Edit Employee
          </h2>
          <p className="text-sm text-slate-500">
            Update employee profile details
          </p>
        </div>

        <button
          onClick={() => setEditEmployee(null)}
          className="p-2 rounded-lg hover:bg-slate-100 transition"
        >
          <XIcon size={18} />
        </button>
      </div>

    

      {/* Footer */}
<div className="p-6">
<EmployeeForm
  initialData={editEmployee}
  onCancel={() => {
    setEditEmployee(null);
    fetchEmployees();
  }}
onSuccess={() => {
  setEditEmployee(null);
  fetchEmployees();
}}
/>
</div>
    </div>
  </div>

)}

    </div>
  );
};

export default Employees;
