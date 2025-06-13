import React from 'react'
import Icon from '../SVGs/Icon'
import HomeIcon from '../SVGs/HomeIcon'
import TasksIcon from '../SVGs/TasksIcon'
import CalendarIcon from '../SVGs/CalendarIcon'
import ClockIcon from '../SVGs/ClockIcon'
import InsightsIcon from '../SVGs/InsightsIcon'
import '../App.css'
import SettingsIcon from '../SVGs/SettingsIcon'

const Sidebar = () => {
    return (
        <aside id='sidebar' className='bg-white w-64 border-r border-gray-200 h-full flex-shrink-0 flex flex-col z-20 fixed md:relative transform md:translate-x-0 -translate-x-full transition-transform duration-200 ease-in-out'>
            <div className='p-4 border-b border-gray-200 flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <Icon></Icon>
                    <span className='font-bold text-lg text-[#1e293b]'>Task Mentor</span>
                </div>
                <button id='close-sidebar' className='md:hidden text-[#64748b] hover:text-[#334155]'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </button>
            </div>

            <div className='py-4 flex-1 overflow-y-auto'>
                <nav className='px-4 space-y-1'>
                    <a href="#" className='sidebar-active flex items-center px-4 py-3 rounded-lg group'>
                        <HomeIcon></HomeIcon>
                        <span className='font-medium'>Dashboard</span>
                    </a>

                    <a href="#" className='flex items-center px-4 py-3 rounded-lg text-[#475569] hover:bg-gray-50 group'>
                        <TasksIcon></TasksIcon>
                        <span className='font-medium'>Tasks</span>
                    </a>

                    <a href="#" className='flex items-center px-4 py-3 rounded-lg text-[#475569] hover:bg-gray-50 group'>
                        <CalendarIcon></CalendarIcon>
                        <span className='font-medium'>Calendar</span>
                    </a>

                    <a href='#' className='flex items-center px-4 py-3 rounded-lg text-[#475569] hover:bg-gray-50 group'>
                        <ClockIcon></ClockIcon>
                        <span className='font-medium'>Pomodoro</span>
                    </a>

                    <a href="#" className='flex items-center px-4 py-3 rounded-lg text-[#475569] hover:bg-gray-50 group'>
                        <InsightsIcon></InsightsIcon>
                        <span className='font-medium'>Insights</span>
                    </a>

                    <a href='#' className='flex items-center px-4 py-3 rounded-lg text-[#475569] hover:bg-gray-50 group'>
                        <SettingsIcon></SettingsIcon>
                        <span className='font-medium'>Settings</span>
                    </a>
                </nav>
            </div>

            <div className='p-4 border-t border-gray-200'>
                <div className='bg-gray-50 rounded-lg p-3'>
                    <div className='flex items-center space-x-3'>
                        <div className='relative'>
                            <div className='w-10 h-10 rounded-full flex items-center justify-center text-[#6627cc] font-medium bg-purple-200'>
                                JD
                            </div>
                            <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                        </div>
                        <div>
                            <p className='font-medium text-sm'>John Doe</p>
                            <p className='text-xs text-[#64748b]'>Productivity Master</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
