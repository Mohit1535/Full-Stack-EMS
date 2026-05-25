import React, { useState } from 'react'
import LoginLeftSide from './LoginLeftSide'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2, Loader2Icon } from 'lucide-react'

const Loginform = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showpassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

      <LoginLeftSide />

      <div className='flex-1 flex items-center justify-center p-6 sm:p-12 bg-white'>
        <div className='w-full max-w-md animate-fade-in'>

          <Link
            to='/login'
            className='inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-10 transition-colors'
          >
            <ArrowLeftIcon size={16} />
            Back to portals
          </Link>

          <div className='mb-8'>
            <h1 className='text-2xl sm:text-3xl font-medium text-zinc-800'>
              {title}
            </h1>
            <p className='text-slate-500 text-sm sm:text-base mt-2'>
              {subtitle}
            </p>
          </div>

          {error && (
            <div className='mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3'>
              <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0' />
              {error}
            </div>
          )}

          <form className='space-y-5' onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter email"
                className='w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500'
              />
            </div>

            {/* Password */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Password
              </label>

              <div className='relative'>

                <input
                  type={showpassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="........"
                  className='w-full border border-slate-300 rounded-lg px-4 py-3 pr-11 outline-none focus:ring-2 focus:ring-indigo-500'
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  onClick={() => setShowPassword(!showpassword)}
                >
                  {showpassword ? 
                    <EyeIcon size={18} />
                   : 
                    <EyeOffIcon size={18} />
                  }
                </button>

              </div>
            </div>

            {/* Button */}
          {/* Button */}
<button
  type="submit"
  disabled={loading}
  className="w-full relative overflow-hidden group bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-300/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
  {/* Shine Effect */}
  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/20 skew-x-12 transition-transform duration-700"></span>

  {loading ? (
    <>
      <Loader2Icon className="animate-spin h-5 w-5" />
      Signing In...
    </>
  ) : (
    <>
      Login
      <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
        →
      </span>
    </>
  )}
</button>

          </form>

        </div>
      </div>

    </div>
  )
}

export default Loginform