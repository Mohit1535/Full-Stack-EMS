import React, { useEffect,useState } from 'react'
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from '../assets/assests'
import Loading from '../components/Loading'
import EmployeeDashboard from '../components/Employee_Dashboard'
import AdminDashboard from '../components/Admin_Dashboard'
import toast from 'react-hot-toast'
import api from '../api/assests'
const Dashboard = () => {
  const[data,setData]=useState(null)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
// setData(dummyEmployeeDashboardData)
// setData(dummyAdminDashboardData)

api.get("/dashboard")
  .then((res) => {
    setData(res.data);
  })
  .catch((error) => {
    toast.error(
      error.response?.data?.error || error.message
    );
  })
  .finally(() => {
    setLoading(false);
  });
// setTimeout(()=>{
// setLoading(false)
// },1000)
  },[])

  if(loading) return <Loading/> 
  if(!data) return <p className='text-center text-slate-500 py-12'>Failed to load dashboard</p>
  
  if(data.role==="ADMIN"){
    return <AdminDashboard data={data}/>
  }
  else{
return    <EmployeeDashboard data={data}/>
  }
  
  

}

export default Dashboard
