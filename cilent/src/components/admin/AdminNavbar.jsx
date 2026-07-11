import React from 'react'
import { Link } from 'react-router-dom'
import { Ticket } from 'lucide-react'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 bg-white border-b border-zinc-200/80 shadow-sm'>
      <Link to="/" className="flex items-center gap-2 select-none group">
        <Ticket className="w-7 h-7 text-[#e51e25] transition-transform duration-300 group-hover:rotate-12" />
        <span className="text-2xl font-black tracking-tight text-zinc-950">
          Movie<span className="text-[#e51e25] ml-0.5">Dekho</span>
          <span className="ml-2 bg-[#e51e25]/10 text-[#e51e25] text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider">
            Admin
          </span>
        </span>
      </Link>
    </div>
  )
}

export default AdminNavbar