import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from 'lucide-react';
import { assets } from '../../assets/assets'; // Adjust path if needed

const AdminSidebar = () => {
  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  };

  const adminNavLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon, exact: true },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
  ];

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full bg-white border-r border-zinc-200/60 text-sm">
      <img
        className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto shadow-sm"
        src={user.imageUrl}
        alt="sidebar"
      />
      <p className="mt-2.5 text-base font-bold text-zinc-850 max-md:hidden">
        {user.firstName} {user.lastName}
      </p>

      <div className="w-full">
        {adminNavLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end={link.exact} // ✅ This makes /admin match only exactly, not subpaths
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2.5 w-full py-3.5 min-md:pl-10 first:mt-6 text-zinc-500 hover:text-zinc-800 transition-colors duration-200 ${
                isActive ? 'bg-[#e51e25]/10 text-[#e51e25] font-bold group' : 'hover:bg-zinc-50/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className="w-5 h-5" />
                <p className="max-md:hidden">{link.name}</p>
                <span
                  className={`w-1 h-8 rounded-l right-0 absolute transition-all duration-200 ${
                    isActive ? 'bg-[#e51e25]' : 'bg-transparent'
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
