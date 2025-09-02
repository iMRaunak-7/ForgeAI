import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full 
                    justify-center items-center text-center 
                    bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat min-h-screen">
      
      <div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold leading-[1.2]">
          Create Mind Blowing Content <br /> using{' '}
          <span className="text-primary">AI Tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Unleash the power of AI to generate stunning visuals and compelling text in seconds.
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate('/ai')}
          className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg 
                       bg-gradient-to-r from-[#00B5D8] via-[#4A90E2] to-[#9B5DE5] 
                       hover:opacity-90 transition duration-300"
        >
          Start developing
        </button>
        <button
          className="bg-white px-10 py-3 rounded-lg border border-gray-300
                     hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          Continue with demo
        </button>
      </div>

      <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
        <img src="{assets.user_group}" alt="" className='h-8'/>Tried and tested by 10k+ users
      </div>
    </div>
  )
}

export default Hero
