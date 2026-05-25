import { PlusIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import Loading from '../Loading'

const GeneratePayslipsForm = ({employees,onSuccess}) => {

    const [isOpen, setIsOpen]=useState(false)
    const [loading, setLoading]=useState(false)
    
    if(!isOpen)
       { return(
        <button className='btn-primary flex items-center gap-2 'onClick={()=>setIsOpen(true)}>
            <PlusIcon className='w-4 h-4'/> Generate Payslips
        </button>)
    }

const handleSubmit=async(e)=>{
    e.preventDefault();
}
  return (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex
items-center justify-center z-50 p-4">

<div className='card max-w-lg w-full p-6 animate-slide-up'>
<div className='flex justify-between items-center mb-6'>
<h3 className='text-lg font-bold text-slate-900'>Generate Monthly Pay Slip</h3>
<button  onClick={()=>setIsOpen(false)}>
    <XIcon size={20}/>
</button>
</div>
<form onSubmit={handleSubmit} className='space-y-4'>
{/* Select employee */}
<div>
<label required className='space-y-4'>Employee</label>
<select required name="employeeId">
    <option value=""> Select Employee</option>
{employees.map((e)=>(

<option value={e.id} key={e.id}>{e.firstName} {e.lastName} ({e.position})</option>

))}
</select>

</div>
{/* Select month and year */}
<div>
    <label required className='block text-sm font-medium text-slate-700 mb-2'>Month</label>
<select>
  <option value="">Select Month</option>

  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
    <option key={m} value={m}>
      {m}
    </option>
  ))}
</select>

</div>

<div>
<label required className='block text-sm font-medium text-slate-700 mb-2'>Year</label>
<input type='number' name="year" defaultValue={new Date().getFullYear()}/>
</div>
{/* Basic Salary */}
<div>
<label required className='block text-sm font-medium text-slate-700 mb-2'>Basic Salary</label>
<input type='number' name="basicSalary"/>
</div>
{/* Allowance & Deductions */}
<div className="grid grid-cols-2 gap-4">

    <div>
<label required className='block text-sm font-medium text-slate-700 mb-2'>Allowances</label>
<input type='number' required defaultValue='0' name="allowances"/>
</div>


    <div>
<label required className='block text-sm font-medium text-slate-700 mb-2'>Deductions</label>
<input type='number' required defaultValue='0' name="deductions"/>
</div>

</div>
{/* Buttons */}
<div>
    <div className="flex justify-end gap-3 pt-2">
<button type='button'className=' btn-secondary' onClick={()=>setIsOpen(false)}>
    Cancel
</button>
<button disabled={loading} type='submit' className='btn-primary' onClick={onSuccess}>
{loading && (
    <Loading className='w-4 h-4'/>
)}
    Save
</button>
        </div>

  






</div>
</form>
</div>

</div>
  )
}

export default GeneratePayslipsForm

