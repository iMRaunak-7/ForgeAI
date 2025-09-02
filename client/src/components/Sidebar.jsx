import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 
      flex flex-col h-full max-sm:absolute top-14 bottom-0
      ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      transition-all duration-300 ease-in-out`}
    >
      {/* --- Profile (top section) --- */}
      <div className="my-4 px-2 text-center">
        <img
          src={user.imageUrl}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mx-auto border"
        />
        <h1 className="mt-2 text-center text-gray-800 font-medium text-sm">
          {user.fullName}
        </h1>
      </div>

      {/* --- Navigation (scrollable) --- */}
      <div className="flex-1 overflow-y-auto px-4">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/ai"}
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `px-3.5 py-2.5 flex items-center gap-3 rounded mb-1
              ${
                isActive
                  ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                  : "hover:bg-gray-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* --- Footer (sticks to bottom) --- */}
      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img src={user.imageUrl} className="w-8 rounded-full" alt="user" />
          <div>
            <h1 className="text-sm font-medium">{user.fullName}</h1>
            <p className="text-xs text-gray-500">
              {user?.publicMetadata?.plan || "Free"} Plan
            </p>
          </div>
        </div>
        <LogOut
          className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          onClick={signOut}
        />
      </div>
    </div>
  );
}

export default Sidebar
