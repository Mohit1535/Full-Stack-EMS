import { LockIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import Loading from '../Loading';

const ChangePasswordModule = ({open,onClose}) => {

  const [message,setMessage]=useState({type:"",text:""})
  const [loading,setLoading]=useState(false);


  const handleSubmit=async(e)=>{
    e.preventDefault()
  }

if(!open) return null;
    return (
<>
    <div onClick={onClose} className='fixed inset-0 z-50 flex items-center justify-center p-4'>

<div className='absolute inset-0 bg-black/40 backdrop-blur-sm'/>

<div 
  className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in" 
  onClick={(e) => e.stopPropagation()}
>

<div className="flex items-center justify-between">
  <h2 className='text-lg font-medium text-slate-900 flex items-center gap-2'>
    <LockIcon className='w-5 h-5 text-slate-400'/> 
    Change Password
  </h2>

  <button className='btn-secondary text-sm' onClick={onClose}>
    <XIcon className='w-4 h-4'/>
  </button>

</div>
<form className='p-6 space-y-5' onSubmit={handleSubmit}>
{message.text && (
<div className={`p-3 rounded-xl text-sm flex items-start gap-3 ${message.type==="success"?"bg-emerald-50 text-emerald-700 border border-emerald-200":"bg-rose-500 text-rose-700 border-border-rose-200"}`}>
  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
    message.type==="success"?'bg-emerald-500':'bg-rose-500'
  }`}/>
  {message.text}
</div>

)}
<div>
<label className='block text-sm font-medium text-slate-700 mb-2'>Current Password</label>
<input type='password'name='currentPassword'required />
</div>
<div>
<label className='block text-sm font-medium text-slate-700 mb-2'>New Password</label>
<input type='newPassword'name='newPassword'required/>
</div>

<div className="flex gap-3 pt-2">
<button type='button' onClick={onClose} className='btn-secondary flex-1'>
Cancel
</button>

<button type='submit' className='btn-primary flex-1 flex justify-center items-center gap-2' disabled={loading}>
{loading && <Loading className='w-4 h-4'/>}
Update Password
</button>

</div>
</form>
</div>
</div>
</>  

  )
}

export default ChangePasswordModule