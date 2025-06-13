import React from 'react'

const Calendar = () => {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <h3 className='font-semibold text-lg mb-4'>Upcoming Schedule</h3>

        <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 rounded-lg bg-purple-100 flex flex-col items-center justify-center'>
                    <span className='text-xs text-[#7738ea] font-medium'>MAY</span>
                    <span className='text-lg font-bold text-[#6627cc]'>15</span>
                </div>
                <div>
                    <p className='font-medium'>Client Presentation</p>
                    <p className='text-sm text-[#64748b]'>10:30 AM - 11:30 AM</p>
                </div>
            </div>

            <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 rounded-lg bg-purple-100 flex flex-col items-center justify-center'>
                    <span className='text-xs text-[#7738ea] font-medium'>MAY</span>
                    <span className='text-lg font-bold text-[#6627cc]'>16</span>
                </div>
                <div>
                    <p className='font-medium'>Team Brainstorming</p>
                    <p className='text-sm text-[#64748b]'>2:00 PM - 3:30 PM</p>
                </div>
            </div>

            <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 rounded-lg bg-purple-100 flex flex-col items-center justify-center'>
                    <span className='text-xs text-[#7738ea] font-medium'>MAY</span>
                    <span className='text-lg font-bold text-[#6627cc]'>18</span>
                </div>
                <div>
                    <p className='font-medium'>Project Deadline</p>
                    <p className='text-sm text-[#64748b]'>All day</p>
                </div>
            </div>
        </div>

        <div className='mt-4 text-center'>
            <button className='text-[#7738ea] hover:text-[#6627cc] text-sm font-medium'>View Calendar</button>
        </div>
    </div>
  )
}

export default Calendar
