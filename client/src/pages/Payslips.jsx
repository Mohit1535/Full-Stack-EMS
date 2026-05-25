import React, { useEffect,useState } from 'react'
import { dummyEmployeeData, dummyPayslipData } from '../assets/assests'
import Loading from '../components/Loading'
import PayslipList from '../components/Payslip/PayslipList'
import GeneratePayslipsForm from '../components/Payslip/GeneratePayslipsForm'

   const Payslips = () => {
   const [payslips,setPayslips]=useState([])
   const [employees,setEmployees]=useState([])
   const [loading,setLoading]=useState(true)
   const isAdmin=false;

   const fetchPaySlips=async()=>{
    setPayslips(dummyPayslipData)
    setTimeout(()=>{
      setLoading(false)
      
    },1000)
   }
   useEffect(()=>{
fetchPaySlips()
   },[fetchPaySlips])

   useEffect(()=>{
    if(isAdmin) setEmployees(dummyEmployeeData)
   },[isAdmin])

   if(loading) return <Loading className="w-4 h-4"/>
  return (
<div className="animate-fade-in">
<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
<div className="div">
  <h1 className='page-title'>Payslip</h1>
  <p className='page-subtitle'>{isAdmin? "Generate and manage the payslips":"Your payslips"}</p>
</div>
{isAdmin && <GeneratePayslipsForm employees={employees} onSuccess={fetchPaySlips}/>}
</div>
<p>Paylslip List</p>
<div>

<PayslipList payslips={payslips} isAdmin={isAdmin}/>

</div>
</div>

  )
}

export default Payslips