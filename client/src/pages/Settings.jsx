import React, { useEffect, useState } from 'react'
import { dummyProfileData } from '../assets/assests'
import Loading from '../components/Loading'
import { LockIcon, XIcon } from 'lucide-react'
import ProfileForm from '../components/Settings/ProfileForm'
import ChangePasswordModule from '../components/Settings/ChangePasswordModule'
import api from '../api/assests'
import toast from 'react-hot-toast'

const Settings = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPasswordModel, setShowPasswordModal] = useState(false)

  const fetchProfile = async () => {
 try{
  const res=await api.get("/profile")
  const profile=res.data;
  if(profile)  setProfile(profile);

 }
 catch(error){
  toast.error(error?.response?.data?.error || error?.message)
 }
 finally{
  setLoading(false)
 }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  // ✅ Loading UI
  if (loading) {
    return <Loading className='w-4 h-4' />
  }

  // ✅ Main UI
  return (
    <div className="animate-fade-in">
      <div className='page-header'>
        <h1 className='page-title'>Settings</h1>
        <p className='page-subtitle'>Manage your account and preferences</p>
      </div>

      {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile} />}

      {/* Change password trigger */}
      <div className="card max-w-md p-6 flex items-center justify-between">

        <div className='flex items-center gap-3'>
<div className='p-2.5 bg-slate-100 rounded-lg'>
<LockIcon className='w-5 h-5 text-slate-600'/>
        </div>
</div>
        <div>
<p className='font-medium text-slate-900'>Password</p>
<p className='text-sm text-slate-500'>Update your account Password</p>

        </div>
        <button className='btn-secondary text-sm' onClick={()=>setShowPasswordModal(true)}>

Change 

        </button>
        <ChangePasswordModule open={showPasswordModel} onClose={()=>setShowPasswordModal(false)}/>
      </div>
    </div>
  )
}

export default Settings
