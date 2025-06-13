import React from 'react'

const ProductivityInsights = () => {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='font-semibold text-lg'>Productivity Insights</h3>
        <div className='flex space-x-2'>
            <button className='px-3 py-1 text-sm bg-purple-50 text-[#7738ea] rounded-md'>Week</button>
            <button className='px-3 py-1 text-sm text-[#64748b] hover:bg-gray-100 rounded-md'>Month</button>
            <button className='px-3 py-1 text-sm text-[#64748b] hover:bg-gray-100 rounded-md'>Year</button>
        </div>
      </div>

      <div className='h-64'>
        <canvas id='productivityChart'></canvas>
      </div>
    </div>
  )
}

export default ProductivityInsights
