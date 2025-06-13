import React from 'react'
import '../App.css'
import EditIcon from '../SVGs/EditIcon'
import TrashIcon from '../SVGs/TrashIcon'

const TodayTasks = () => {
    return (
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
            <div className='flex items-center justify-between mb-6'>
                <h3 className='font-semibold text-lg'>Today's Tasks</h3>
                <button className='text-[#7738ea] hover:text-[#6627cc] text-sm font-medium'>+ Add Task</button>
            </div>

            <div className='space-y-3'>
                <div className='task-item flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                    <div className='flex items-center'>
                        <input type="checkbox" className='w-5 h-5 rounded border-gray-300 text-[#7738ea] focus:ring-[#8a5cf5] mr-3' />
                        <span>Prepare presentation for client meeting</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-[#64748b] text-sm mr-4'>10:30 AM</span>
                        <div className='task-actions'>
                            <button className='text-[#94a3b8] hover:text-[#475569] p-1'>
                                <EditIcon></EditIcon>
                            </button>
                            <button className='text-[#94a3b8] hover:text-[#475569] p-1'>
                                <TrashIcon></TrashIcon>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='task-item flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                    <div className='flex items-center'>
                        <input type="checkbox" className='w-5 h-5 rounded border-gray-300 text-[#7738ea] focus:ring-[#8a5cf5] mr-3' />
                        <span>Review project proposal</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-[#64748b] text-sm mr-4'>1:00 PM</span>
                        <div className='task-actions'>
                            <button className='text-[#94a3b8] hover:text-[#475569] p-1'>
                                <EditIcon></EditIcon>
                            </button>
                            <button className='text-[#94a3b8] hover:text-[#475569] p-1'>
                                <TrashIcon></TrashIcon>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='task-item flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                    <div className='flex items-center'>
                        <input type="checkbox" className='w-5 h-5 rounded border-gray-300 text-[#7738ea] focus:ring-[#8a5cf5] mr-3' />
                        <span>Team meeting</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-[#64748b] text-sm mr-4'>3:30 PM</span>
                        <div className='task-actions'>
                            <button className='text-[#94a3b8] hover:text-[#475569] p-1'>
                                <EditIcon></EditIcon>
                            </button>
                            <button className='text-[#94a3b8] hover:text-[#475569] p-1'>
                                <TrashIcon></TrashIcon>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='task-item flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                    <div className='flex items-center'>
                        <input type="checkbox" className='w-5 h-5 rounded border-gray-300 text-[#7738ea] focus:ring-[#8a5cf5] mr-3' />
                        <span>Update project documentation</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-[#64748b] text-sm mr-4'>5:00 PM</span>
                        <div className='task-actions'>
                            <button className='text-[#94a3b8] hover:text-[#475569] p-1'>
                                <EditIcon></EditIcon>
                            </button>
                            <button className='text-[#94a3b8] hover:text-[#475569] p-1'>
                                <TrashIcon></TrashIcon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-4 text-center'>
                <button className='text-[#7738ea] hover:text-[#6627cc] text-sm font-medium'>View All Tasks</button>
            </div>
        </div>
    )
}

export default TodayTasks
