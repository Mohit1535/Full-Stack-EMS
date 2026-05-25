import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dummyProfileData } from '../assets/assests'
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon
} from 'lucide-react'

const handleLogout=()=>{
    window.location.href="/login"
}
const Sidebar = () => {

    const role = "ADMIN" || "EMPLOYEE";

    const navItems = [
        {
            name: "Dashboard",
            icon: LayoutGridIcon,
            href: "/dashboard"
        },

        role === "ADMIN"
            ? {
                name: "Employees",
                icon: UserIcon,
                href: "/employees"
            }
            : {
                name: "Attendance",
                icon: CalendarIcon,
                href: "/attendance"
            }
        ,

        {
            name: "Leave",
            icon: FileTextIcon,
            href: "/leave"
        },
        {
            name: "Payslips",
            icon: DollarSignIcon,
            href: "/payslips"
        },
        {
            name: "Settings",
            icon: SettingsIcon,
            href: "/settings"
        },
    ]

    const { pathname } = useLocation()
    const [userName, setUserName] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false)

    const sidebarContent = (
        <>
            {/* Brand header */}
            <div className="px-5 pt-6 pb-5 border-b border-white/6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/images/sundigo.png" className='text-white size-17' />
                        <div>
                            <p className='font-semibold text-[13px] text-white tracking-wide'>
                                Employee MS
                            </p>
                            <p className='text-[11px] text-slate-500 font-medium'>
                                Management System
                            </p>
                        </div>
                    </div>

                    <button
                        className='lg:hidden text-slate-400 hover:text-white'
                        onClick={() => setMobileOpen(false)}
                    >
                        <XIcon size={20} />
                    </button>
                </div>
            </div>

            {/* User profile card */}
            {userName && (
                <div className='mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4'>
                    <div className='flex items-center gap-3'>

                        <div className='w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0'>
                            <span className='text-slate-100 text-xl font-semibold'>
                                {userName.charAt(0).toUpperCase()}
                            </span>
                        </div>

                        <div className='min-w-0'>
                            <p className='text-[13px] font-medium text-slate-200 truncate'>
                                {userName}
                            </p>

                            <p className='text-[11px] text-slate-500 truncate'>
                                {role === "ADMIN" ? "Administrator" : "Employee"}
                            </p>
                        </div>

                    </div>
                </div>
            )}

            {/* Section label */}
            <div className='px-5 pt-5 pb-2'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500'>
                    Navigation
                </p>
            </div>

            {/* Navigation List */}
            <div className='flex-1 px-3 space-y-0.5 overflow-y-auto'>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className='relative flex items-center gap-3 px-3 py-2 rounded-lg group'
                        >
                            {isActive && (
                                <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-500' />
                            )}

                            <item.icon
                                className={`w-[17px] h-[17px] shrink-0 ${
                                    isActive
                                        ?    "text-slate-400 group-hover:text-slate-300"
                                        :     "text-indigo-300  hover:bg-rose-500/8 "  
                                }`}
                            />

                            <span className='flex-1'>{item.name}</span>

                            {isActive && (
                                <ChevronRightIcon className='w-3.5 h-3.5 text-indigo-500/50' />
                            )}
                        </Link>
                    )
                })}
            </div>


            {/* Logout */}

            <div className="p-3 border-t border-white/6">
            <button onClick={handleLogout} className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] 
            font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all
            duration-150'>
<LogOutIcon className='w-[17px] h-[17px]'/>
<span>Log out</span>
            </button>
            
            </div>
        </>
    )

    useEffect(() => {
        setUserName(
            dummyProfileData.firstName + " " + dummyProfileData.lastName
        )
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

    return (
        <>
            {/* Mobile hamburger button */}
   <button
  type="button"
  onClick={() => setMobileOpen(true)}
  className="lg:hidden fixed top-4 right-4 z-50 p-2 
             bg-slate-900 text-white rounded-lg shadow-lg 
             border border-white/10 hover:bg-slate-800 
             transition-all duration-200"
  aria-label="Open menu"
>
  <MenuIcon size={20} />
</button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40'
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar Desktop */}
            <aside className='hidden lg:flex flex-col h-full w-[260px] bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/4'>
                {sidebarContent}
            </aside>

            {/* Sidebar Mobile */}
            <aside
                className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {sidebarContent}
            </aside>
        </>
    )
}

export default Sidebar