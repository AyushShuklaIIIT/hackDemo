import React from 'react'

const Gamification = () => {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <h3 className='font-semibold text-lg mb-4'>Your Achievements</h3>

      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-3'>
            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-[#8a5cf5] to-pink-500 flex items-center justify-center text-white font-semibold shadow-md'>Lv 8</div>
            <div>
                <p className='font-medium'>Productivity Master</p>
                <div className='w-32 h-2 bg-gray-200 rounded-full mt-1'>
                    <div className='h-2 bg-gradient-to-r from-[#8a5fc5] to-pink-500 rounded-full' style={{width: "75%"}}></div>
                </div>
            </div>
        </div>
        <p className='text-sm text-[#64748b]'>750/1000 XP</p>
      </div>

      <div className='grid grid-cols-3 gap-2 mb-4'>
        <div className='p-2 bg-gray-50 rounded-lg text-center'></div>
      </div>
    </div>
  )
}

export default Gamification
