import { Loader, Save, UserIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import Loading from '../Loading';
const ProfileForm = ({initialData, onSuccess}) => {
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("");
    const [message,setMessage]=useState("");
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
    }
 
  return (
    <form onSubmit={handleSubmit} className='card p-5 sm:p-6 mb-6'>
        <h2 className='text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2'>
           <UserIcon  className='w-4 h-4 text-slate-400'/>Public Profile 
   </h2>
{error && (
    <div className='bg-rose-50 text-rose-700 p-4 rounded-xl text-sm border border-rose-200 mb-6 flex items-start gap-3'>
        <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'/>
{error}
    </div>
)}


{message && (
    <div className='bg-emerald-50 text-emerald-700 p-4 rounded-xl
    text-sm border-emerald-200 mb-6 flex items-start gap-3'>
        <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'/>
{message}
    </div>
)}

<div className='space-y-5'>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<label className='block text-sm font-medium text-slate-700 mb-2'>Name</label>
<input className='bg-slate-50 text-slate-400 cursor-not-allowed' disabled value={`${initialData?.firstName}  ${initialData?.lastName}`} />
</div>

<div>
<label className='block text-sm font-medium text-slate-700 mb-2'>Email</label>
<input className='bg-slate-50 text-slate-400 cursor-not-allowed' disabled value={`${initialData?.email}`} />
</div>

<div>
<label className='block text-sm font-medium text-slate-700 mb-2'>Position</label>
<input className='bg-slate-50 text-slate-400 cursor-not-allowed' disabled value={`${initialData?.position} `} />
</div>


<div>
<label className='block text-sm font-medium text-slate-700 mb-2'>Department</label>
<input className='bg-slate-50 text-slate-400 cursor-not-allowed' disabled value={`${initialData?.department} `} />
</div>

</div>
<div>
<label className='lock text-sm font-medium text-slate-700 mb-2'>Bio</label>
<textarea disabled={initialData.isDeleted} defaultValue={initialData.bio || " "} placeholder='write a brief bio'
className={`resize-now ${initialData.isDeleted?"bg-slate-50 text-slate-400 cursor-not-allowed":" "}`}/>
<p className='text-xs text-slate-400 mt-1.5'>This will be displayed on your profile</p>
</div>
{initialData.isDeleted ?(
<div className='pt-2'>
<div className="p-4 bg-rose-50 border border-rose-200 rouned-xl text-center">
    <p className='text-rose-50 border border-rose-200 rounded-xl text-center'>Account Deactivated</p>
<p className='text-sm text-rose-500 mt-0.5'>You can no longer update your profile</p>

</div>


</div>
):(
<div>
<button className='btn-primary flex items-center gap-2 justify-center w-full sm:w-auto' type='submit' disabled={loading} onClick={onSuccess}>
    {loading?<Loading className='w-4 h-4'/>:<Save/>} 
    Save Changes

</button>


</div>
)}
</div>
    </form>
  )
}

export default ProfileForm