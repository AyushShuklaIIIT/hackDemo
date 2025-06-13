import React from 'react'
import NotificationBell from '../SVGs/NotificationBell'

const TopBar = () => {
  return (
    <header className='bg-white border-b border-gray-200 flex items-center justify-between p-4'>
        <div className='flex items-center'>
            <button id='open-sidebar' className='md:hidden mr-4 text-[#64748b] hover:text-[#334155]'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
            </button>
            <h1 className='text-xl font-semibold text-[#1e293b]'>Dashboard</h1>
        </div>

        <div className='flex items-center space-x-4'>
            <div className='flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm'>
                <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                Online
            </div>

            <button className='relative text-[#64748b] hover:text-[#334155]'>
                <NotificationBell></NotificationBell>
                <span className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full'></span>
            </button>

            <div className='relative'>
                <button className='w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-[#6627cc] font-medium'>JD</button>
            </div>
        </div>
    </header>
  )
}

export default TopBar
