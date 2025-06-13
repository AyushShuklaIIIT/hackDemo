import React from 'react'
import PomodoroTimer from './PomodoroTimer'
import Calendar from './Calendar'
import Gamification from './Gamification'

const MainContentRightCol = () => {
  return (
    <div className='space-y-6'>
      <PomodoroTimer></PomodoroTimer>
      <Calendar></Calendar>
      <Gamification></Gamification>
    </div>
  )
}

export default MainContentRightCol
