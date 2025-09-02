import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {useClerk, UserButton,useUser  } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useUser()
  const {openSignIn} = useClerk()


  return (
    <div className='fixed z-30 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      <img
        src={assets.logo1}
        alt="logo"
        className='w-32 sm:w-44 cursor-pointer'
        onClick={() => navigate('/')}
      />

      {
        user ? <UserButton /> : 
        (
            <button onClick={openSignIn}
                  className='flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer 
                   bg-gradient-to-r from-[#00B5D8] via-[#4A90E2] to-[#9B5DE5] text-white 
                   px-5 py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-lg'
                   >Get Rolling
        <ArrowRight className='w-4 h-4 ml-2' />
      </button>
        )
      }
      
    </div>
  )
}

export default Navbar
