import React from 'react'
import Progress from '../SVGs/Progress'
import MainContentLeftCol from './MainContentLeftCol'
import MainContentRightCol from './MainContentRightCol'

const MainDashboardContent = () => {
    return (
        <main className='flex-1 overflow-y-auto bg-gray-50 p-4'>
            <div className='max-w-7xl mx-auto'>
                {/* Welcome Section */}
                <div className='mb-6'>
                    <h2 className='text-2xl font-bold mb-1'>Good morning, John!</h2>
                    <p className='text-[#64748b]'>Here's what's happening with your tasks today.</p>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='font-semibold text-[#64748b]'>Tasks Completed</h3>
                            <span className='text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-medium'>+12%</span>
                        </div>
                        <div className='flex items-end justify-between'>
                            <div>
                                <p className='text-3xl font-bold'>24</p>
                                <p className='text-[#94a3b8] text-sm'>This week</p>
                            </div>
                            <div className='w-16 h-16 flex items-center justify-center'>
                                <Progress percent="75" stroke="#0c87e8" fill="#0c87e8"></Progress>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='font-semibold text-[#64748b]'>Focus Time</h3>
                            <span className='text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-medium'>+5%</span>
                        </div>
                        <div className='flex items-end justify-between'>
                            <div>
                                <p className='text-3xl font-bold'>8h 24m</p>
                                <p className='text-[#94a3b8] text-sm'>This week</p>
                            </div>
                            <div className='w-16 h-16 flex items-center justify-center'>
                                <Progress percent={60} stroke="#6627cc" fill="#6627cc"></Progress>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='font-semibold text-[#64748b]'>Current Streak</h3>
                            <span className='text-green-500 bg-green-50 px-2 py-1 rounded text-xs font-medium'>+2 days</span>
                        </div>
                        <div className='flex items-end justify-between'>
                            <div>
                                <p className='text-3xl font-bold'>14 days</p>
                                <p className='text-[#94a3b8] text-sm'>Personal best: 21</p>
                            </div>
                            <div className='flex'>
                                <div className='w-4 h-10 bg-purple-200 rounded-sm mx-0.5'></div>
                                <div className='w-4 h-14 bg-[#c3b5fd] rounded-sm mx-0.5'></div>
                                <div className='w-4 h-8 bg-purple-200 rounded-sm mx-0.5'></div>
                                <div className='w-4 h-12 bg-[#a48afb] rounded-sm mx-0.5'></div>
                                <div className='w-4 h-16 bg-[#8a5cf5] rounded-sm mx-0.5'></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <MainContentLeftCol></MainContentLeftCol>
                    <MainContentRightCol></MainContentRightCol>
                </div>
            </div>
        </main>
    )
}

export default MainDashboardContent
