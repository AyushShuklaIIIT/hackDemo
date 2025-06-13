import React from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

const Dashboard = () => {
  return (
    <div className='font-sans bg-gray-50 text-[#1e293b] flex h-screen overflow-hidden'>
      <Sidebar></Sidebar>
      <MainContent></MainContent>
    </div>
  )
}

export default Dashboard
