import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase } from 'lucide-react'

export default function Loading(){
  return (
      <div className="min-h-screen flex items-center justify-center p-6">
      <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-white shadow-lg border border-slate-200">
        <div className="relative w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-indigo-400"
            animate={{ x:['-100%','100%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease:'linear' }}
          />
          <Users className="w-5 h-5 relative z-10" />
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-800">HRMS Portal</div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{ scale:[0.8,1.3,0.8], opacity:[0.5,1,0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            Loading workspace...
          </div>
        </div>

        <motion.div
          animate={{ rotate:[0,10,-10,0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-slate-400"
        >
          <Briefcase className="w-5 h-5" />
        </motion.div>
      </div>
    </div>
  )
}
