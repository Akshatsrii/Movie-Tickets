import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 bg-white border-b border-zinc-200/80 shadow-sm'>
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36 h-auto"/>
      </Link>
    </div>
  )
}

export default AdminNavbar