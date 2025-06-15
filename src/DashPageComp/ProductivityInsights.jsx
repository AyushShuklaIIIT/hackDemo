import React, {useRef, useEffect} from 'react'
import Chart from 'chart.js/auto'

const ProductivityInsights = () => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if(chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }


    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Tasks Completed',
            data: [5, 7, 4, 6, 8, 3, 5],
            backgroundColor: '#0c87e8',
            borderRadius: 4,
          },
          {
            label: 'Focus Hours',
            data: [3, 4, 2, 5, 4, 1, 2],
            backgroundColor: '#6627cc',
            borderRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: '#f1f5f9',
            },
          },
          x: {
            grid: {
              display: false,
            }
          }
        }
      }
    })
  
    return () => {
      if(chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    }
    
  }, [])
  

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
        <canvas id='productivityChart' ref={chartRef}></canvas>
      </div>
    </div>
  )
}

export default ProductivityInsights
