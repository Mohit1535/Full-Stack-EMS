import React, { useCallback, useEffect, useState } from 'react'
import { dummyAttendanceData, dummyEmployeeData } from '../assets/assests'
import Loading from '../components/Loading'
import CheckInButton from '../components/Attendance/CheckInButton'
import AttendanceStats from '../components/Attendance/AttendanceStats'
import AttendanceHistory from '../components/Attendance/AttendanceHistory'
import api from '../api/assests.js'
import toast from 'react-hot-toast'
import {useAuth} from "../context/AutoContext.jsx"
const Attendance = () => {
  const [history,setHistory]=useState([])
  const [loading,setLoading]=useState(true)
  const [isDeleted,setIsDeleted]=useState(false)
  const {user}=useAuth();
  const isAdmin=user?.role==="ADMIN"
const fetchData = async () => {
  setLoading(false)

  try {
    const response = await api.get("/attendance");

    setHistory(response.data.data || []);

    if (response.data.employee?.isDeleted) {
      setIsDeleted(true);
    }
  } catch (error) {
    toast.error(error?.response?.data?.error || error?.message);
  } finally {
    setLoading(false);
  }
};
useEffect(()=>{
  fetchData()
  console.log("changed")
},[])
  

const today=new Date()
today.setHours(0,0,0,0)
const todayRecord = history.find(
  (r) => new Date(r.date).toDateString() === today.toDateString()
);
  if (loading) return <Loading />
  return (
<div className="animate-fade-in">
<div className="page-header">

<h1 className="page-title">
Attendance
</h1>
<p className='page-subtitle'>Track your work hours and daily check -ins</p>
</div>
{isDeleted?(
  <div className='mb-8 p-6 bg-rose-50 border-rose-200 rounded-2xl
  text-center'>
<p className='text-rose-600'>You can no longer clock in or out because 
  your employee records have been marked as deleted.
</p>

</div>
):
(
<div className='mb-8'>

{isAdmin ?"": <CheckInButton todayRecord={todayRecord} onAction={fetchData}/> }

</div>
)}

{isAdmin? "" :<AttendanceStats history={history}/>}
<AttendanceHistory history={history}  isAdmin={isAdmin}/>
</div>

  )
}

export default Attendance
