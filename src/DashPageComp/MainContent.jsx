import React from 'react'
import TopBar from './TopBar'
import MainDashboardContent from './MainDashboardContent'

const MainContent = () => {
  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      <TopBar></TopBar>
      <MainDashboardContent></MainDashboardContent>
    </div>
  )
}

export default MainContent
