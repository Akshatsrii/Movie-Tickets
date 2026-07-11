import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#fffaf9] text-zinc-900">
      <AdminNavbar />
      <div className='flex relative'>
        <AdminSidebar/>
        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto bg-transparent'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default Layout;