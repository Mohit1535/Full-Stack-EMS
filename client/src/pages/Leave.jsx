import React, { useCallback, useEffect, useState } from 'react'
import { dummyLeaveData } from '../assets/assests'
import Loading from '../components/Loading'
import { PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon } from 'lucide-react'
import LeaveHistory from '../components/leave/LeaveHistory'
import ApplyLeaveModel from '../components/leave/ApplyLeaveModel'
import { useAuth } from '../context/AutoContext'   
import toast from 'react-hot-toast'
import api from '../api/assests'
const Leave = () => {

  const [leaves, setLeaves] = useState([])   // ❗ missing state
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

 const {user}=useAuth()
 const isAdmin=user?.role==="ADMIN"

const fetchLeaves = async () => {
  try {
    const res = await api.get("/leave");

    setLeaves(res.data.data || []);
    console.log(res.data);

    if (res.data.employee?.isDeleted) {
      setIsDeleted(true);
    }
  } catch (error) {
    toast.error(error?.response?.data?.error || error.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLeaves()
  }, [])   // ❗ removed dependency issue

  if (loading) return <Loading />

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED");
  const sickCount = approvedLeaves.filter((l) => l.type === "SICK").length;
  const casualCount = approvedLeaves.filter((l) => l.type === "CASUAL").length;
  const annualCount = approvedLeaves.filter((l) => l.type === "ANNUAL").length;

  const leaveStats = [
    { label: "Sick Leave", value: sickCount, icon: ThermometerIcon },
    { label: "Casual Leave", value: casualCount, icon: UmbrellaIcon },
    { label: "Annual Leave", value: annualCount, icon: PalmtreeIcon }
  ]

  return (
    <>
      <div className='animate-fade-in'>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className='page-title'>Leave Management</h1>
            <p className='page-subtitle'>{isAdmin ? "Manage leave application" : "Your leave history and requests"}</p>
          </div>

          {!isAdmin && !isDeleted && (
            <button
              className='gap-2 w-full sm:w-auto justify-content btn-primary flex items-center'
              onClick={() => setShowModal(true)}
            >
              <PlusIcon className='w-4 h-4' />
              Apply for Leave
            </button>
          )}
        </div>

        {!isAdmin && (
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8'>
            {leaveStats.map((item) => (
              <div key={item.label} className='card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group'>
                <div>
                  <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70' />
                  <p className='text-sm font-medium text-slate-700'>{item.label}</p>
                  <p className='text-2xl font-bold text-slate-900 mt-1'>
                    {item.value}
                    <span className='text-sm font-normal text-slate-400'> taken</span>
                  </p>
                </div>

                <item.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200" />
              </div>
            ))}
          </div>
        )}

        <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />
      <ApplyLeaveModel open={showModal} onClose={()=>setShowModal(false)} onSuccess={fetchLeaves}/>
      
      </div>
    </>
  )
}

export default Leave
