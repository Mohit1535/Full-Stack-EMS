import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { DEPARTMENTS } from '../assets/assests';
import { Loader, Loader2Icon } from 'lucide-react';
import Loading from './Loading';
import api from "../api/assests"
import toast from 'react-hot-toast';
const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;// this is use to for 
  // both add and edit if
  //  data exists then edit otherwise add

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    const formData=new FormData(e.currentTarget);
    if(isEditMode){
      const pwd=formData.get("password");


      if(!pwd){
        formData.delete("password")
      }

    }
    try{
      const url=isEditMode? `/employees/${initialData.id}` : '/employees';
      const method=isEditMode?"put" :"post"
      await api[method](url,formData)
if (onSuccess) {
  onSuccess();
} else {
  navigate("/employees");
}
   


    }
    catch(error){
toast.error(error?.response?.data?.error || error.message)
console.error("failed to fetch employee")

    }finally{
      setLoading(false)
    }
    
  }
  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-3xl animate-fade-in'>

      {/* Personal Information */}
      <div className='card p-5 sm:p-6'>
        <h3 className='font-medium mb-6 pb-4 border-b
border-slate-100'>Personal Information </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700"></div>

        <div>

          <label className='block mb-'>First Name</label>

          <input name="firstName" required
            defaultValue={initialData?.firstName} />

        </div>


        <div>

          <label className='block mb-'>Last Name</label>

          <input name="lastName" required
            defaultValue={initialData?.lastName} />

        </div>


        <div>

          <label className='block mb-'>Phone No. </label>

          <input name="phone" required
            defaultValue={initialData?.phone} />

        </div>



        <div>
          <label className="block mb-2">Join Date</label>

          <input
            type="date"
            name="joinDate"
            required
            defaultValue={
              initialData?.joinDate
                ? new Date(initialData.joinDate).toISOString().split("T")[0]
                : ""
            }
          />
        </div>
        <div className='sm:col-span-2'>
          <label className='block mb-2'>Bio </label>
          <textarea placeholder="Enter description" name="bio" defaultValue={initialData?.bio} rows={3} className='resize-none' />
        </div>
      </div>

      {/* Employement Details */}
      <div className='card p-5 sm:p-6'>

        <h3 className='text-base font-medium text-slate-900 mb-6 pb-4
border-b border-slate-100'>Employment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm
text-slate-700">
          <label className='block mb-2'>Department</label>
        <select
  name="department"
  className="max-w-40"
  defaultValue={initialData?.department || ""}
>
            <option value="">All Departments</option>

            {DEPARTMENTS.map((deptName) => (
              <option key={deptName} value={deptName}>
                {deptName}
              </option>
            ))}
          </select>

        </div>
        <div>
          <label className='block mb-2'>Position</label>
          <input name="position" required defaultValue={initialData?.position} />
        </div>


        <div>
          <label className='block mb-2'>Basic Salary</label>
          <input min="0" step="0.01 " type="number" name="basicSalary" required defaultValue={initialData?.basicSalary || 0} />
        </div>

        <div>
          <label className='block mb-2'>Allowance</label>
          <input min="0" step="0.01 " type="number" name="allowances" required defaultValue={initialData?.allowance || 0} />
        </div>


        <div>
          <label className='block mb-2'>Deductions</label>
          <input min="0" step="0.01 " type="number" name="deductions" required defaultValue={initialData?.deductions || 0} />
        </div>
        {isEditMode && (
          <div>
            <label className='block mb-2'>Status</label>
            <select name="employmentStatus"  required defaultValue={initialData?.employmentStatus}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>

            </select>
          </div>
        )}
      </div>

      {/* Account Setup */}
      <div className="card p-5 sm:p-6">
        <h3 className='font-medium mb-6 pb-4 border-b border-slate-100'>
          Account Setup</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 
text-sm text-slate-700">
          <div className='sm:col-span-2'>
            <label className='block mb-2'>Work Email</label>
            <input type="email" name="email" required defaultValue={initialData?.email} />
          </div>


          {!isEditMode && (
            <div className='sm:col-span-2'>
              <label className='block mb-2'>Temporary Password</label>
              <input type="password" name="password" required />
            </div>
          )}

          {isEditMode && (
            <div className='sm:col-span-2'>
              <label className='block mb-2'>Change Password (Optional)</label>
              <input type="password" name="password" placeholder='Leave blank to keep current password' required />
            </div>
          )}
          <div className='sm:col-span-2'>
            <label className='block mb-2'>System Role</label>
            <select name='role' defaultValue={initialData?.user?.role || "EMPLOYEE"}>
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>



            </select>
          </div>

        </div>


      </div>


      {/* Buttons */}

      <div className="flex flex-col-reverse sm:flex-row justify-end
gap-3 pt-2">
        <button onClick={() => (onCancel ? onCancel() : navigate(-1))} type="button" className='btn-secondary'>
          Cancel
        </button>
        {/* disable={loading} it will disabled when loading is true  */}
        <button type="Submit" disabled={loading} className='btn-primary flex items-center justify-center'>

          {loading &&
            <Loading />}
          {isEditMode? "Update Employee" : "Create Employee"}
        
        </button>

      </div>
    </form>
  )
}

export default EmployeeForm
