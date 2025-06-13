import React from 'react'
import '../App.css'
const PomodoroTimer = () => {
  return (
      <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
        <h3 className='font-semibold text-lg mb-4'>Pomodoro Timer</h3>

        <div className='flex flex-col items-center'>
            <div className='relative w-48 h-48 mb-4'>
                <svg className='w-full h-full' viewBox='0 0 100 100'>
                    <circle cx={50} cy={50} r={45} fill='none' stroke='#e2e8f0' strokeWidth={8} />
                    <circle id='pomodoro-progress' className='pomodoro-progress' cx={50} cy={50} r={45} fill='none' stroke='url(#pomodoro-gradient)' />
                    <defs>
                        <linearGradient id='pomodoro-gradient' x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor='#0068c6' />
                            <stop offset="100%" stopColor='#6627cc' />
                        </linearGradient>
                    </defs>
                </svg>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center'>
                        <p id='timer-display' className='text-3xl font-bold'>20:00</p>
                        <p className='text-[#64748b] text-sm'>Focus Time</p>
                    </div>
                </div>
            </div>

            <div className='flex space-x-3'>
                <button id='start-timer' className='px-4 py-2 bg-[#7738ea] text-white rounded-lg hover:bg-[#6627cc] transition-colors duration-200'>Start</button>
                <button id='pause-timer' className='px-4 py-2 bg-gray-200 text-[#475569] rounded-lg hover:bg-gray-300 transition-colors duration-200'>Pause</button>
                <button id='reset-timer' className='px-4 py-2 bg-gray-200 text-[#475569] rounded-lg hover:bg-gray-300 transition-colors duration-200'>Reset</button>
            </div>
        </div>
      </div>
  )
}

export default PomodoroTimer
