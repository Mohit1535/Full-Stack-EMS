import { CalendarDays, FileTextIcon, Send, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import Loading from '../Loading';

const ApplyLeaveModel = ({onClose,open,onSuccess}) => {
  
  const [loading,setLoading]=useState(false);
  const today=new Date()
  const tomorrow=new Date(today)
  tomorrow.setDate(today.getDate()+1)
  const minDate=tomorrow.toISOString().split('T')[0];

const handleSubmit=async(e)=>{
    e.preventDefault();
}

if(!open) return null
    return (
  <>
  <div className='fixed inset-0 z-50 flex items-center justify-center p-4
  bg-black/40 backdrop-blur-sm ' onClick={onClose}>

   <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
{/* Header */}
<div className='flex items-center justify-between p-6 pb-0'>
    <div>
        <h2 className='text-lg font-semibold text-slate-800'>
Apply for Leave
        </h2>
 <p className='text-sm text-slate-400 mt-0.5'>Submit your leave request for approval</p>
 
    </div>

<button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400
hover:text-slate-600'>
<XIcon className='w-5 h-5 '/>
</button>
</div>

<form onSubmit={handleSubmit} className='p-6 space-y-5'>
    {/* Leave Type */}
<div>
<label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-2'>
    
    <FileTextIcon className='w-4 h-4 text-slate-400'/>
Leave Type
</label>
<select name="type" required>
<option value="SICK">Sick Leave</option>
<option value="CASUAL">Casual Leave</option>
<option value="ANNUAL">Annual Leave</option>

</select>
</div>
    {/* duration  */}
<div>
  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
    <CalendarDays className="w-4 h-4 text-slate-400" />
    Duration
  </label>

  <div className="grid grid-cols-2 gap-4">
    {/* From */}
    <div>
      <span className="block text-xs text-slate-400 mb-1">From</span>
      <input
        type="date"
        name="startDate"
        required
        min={minDate}
        className="w-full border rounded-lg p-2"
      />
    </div>

    {/* To */}
    <div>
      <span className="block text-xs text-slate-400 mb-1">To</span>
      <input
        type="date"
        name="endDate"
        required
        min={minDate}
        className="w-full border rounded-lg p-2"
      />
    </div>
  </div>
</div>
    {/* reason */}
<div className="div">
  <label className="text-sm font-medium text-slate-700 mb-2 block">
Reason
  </label>
<textarea  required name="reason" rows={3} className='resize-none' placeholder='Briefly describe why you need this leave...'/>

</div>

{/* button */}
<div className="flex gap-3 pt-2">
  <button
    type="button"
    onClick={onClose}
    className="btn-secondary flex items-center justify-center gap-2"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={loading}
    className="btn-primary flex items-center justify-center gap-2"
  >
    {loading ? (
      <Loading className="w-4 h-4" />
    ) : (
      <Send className="w-4 h-4" />
    )}
    {loading ? "Submitting..." : "Submit"}
  </button>
</div>
</form>
              </div>
  </div>

  </>
  )
}

export default ApplyLeaveModel