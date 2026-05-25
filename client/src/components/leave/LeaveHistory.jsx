import React, { useState } from 'react'
import Loading from '../Loading'
import { Check, CheckIcon, XIcon } from 'lucide-react'
import {format} from 'date-fns'
const LeaveHistory = ({leaves,isAdmin,onUpdate}) => {
    const [processing,setProcessing]=useState(null)
    const handleStatusUpdate=async(id, status)=>{
        setProcessing(id)
    }
  return (
<>  
<div className='card overflow-hidden'>
    <h3 className='px-6 py-4 border-b border-slate-100'>Recent Activity</h3>
</div>
<div className="overflow-x-auto">
<table className='table-modern'>
<thead>
    <tr>
{isAdmin&& <><th>Employee</th>
<th>Department</th>
</>}
<th>Type</th>
<th>Dates</th>
<th>Reason</th>
<th>Status</th>  
<th>Type</th>
    </tr>
</thead>
<tbody>
  {leaves.length===0?(
    <tr>
        <td colSpan={isAdmin?6:4} className='text-center py-12 text-slate-400'>No Leave Application Found</td>
    </tr>
  ):(
    leaves.map((leaves)=>{

return (
    <tr key={leaves._id || leaves.id}>
        {isAdmin && (
            <>
       <td className='text-slate-900'>
           {leaves.employee?.firstName}
           {leaves.employee?.lastName}

        </td>
        <td>{leaves.employee?.department}</td>
    </>    )}
 
         <td className=' text-slate-600'>
        <span className='badge bg-slate-100 text-slate-600'>{leaves.type}</span>
            
        </td>

              <td className='  text-slate-600'>
   {format(new Date(leaves.startDate),"MMM dd, yyyy")}-   {format(new Date(leaves.endDate),"MMM dd, yyyy")}
            
        </td>

            <td className=' text-slate-600 title={leaves.reason'>

            {leaves.reason}
        </td>

    

            <td className={`${leaves.status==="APPROVED"?"badge-success":"badge-warning"}`}>
{leaves.status}

            
        </td>
{isAdmin &&(
    <td>
{leaves.status==="PENDING" && (
    <div className="flex justify-center gap-2">
<button disabled={!processing} onClick={()=>handleStatusUpdate(leaves.id||leaves._id,"APPROVED")} className='p-1.5 rounded-md bg-emerald-50 text-emerald-600
hover:bg-emerald-100
transition-colors'>
    {processing===(leaves.id||leaves._id) ?
    <Loading className='w-4 h-4'/>:
    <CheckIcon className='w-4 h-4'/>}
</button>

<button disabled={!processing} onClick={()=>handleStatusUpdate(leaves.id || leaves._id, "REJECTED")} className='p-1.5 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors'>
    {processing===(leaves.id||leaves._id) ?
    <Loading className='w-4 h-4'/>:
    <XIcon className='w-4 h-4'/>}
</button>
    </div>
)}
    </td>
)}
    </tr>
)
    })
  )}
</tbody>
</table>

</div>
</>
  )
}

export default LeaveHistory