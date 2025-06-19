import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const DateRangePicker = () => {
    const [state, setState] = useState([
        {
            startDate: addDays(new Date(), -29),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [open, setOpen] = useState(false)
  return (
    <div className='relative'>
      <div className='date-range-picker flex items-center cursor-pointer' onClick={() => {setOpen(!open)}}>
        <FontAwesomeIcon icon={faCalendarAlt} className='text-gray-500 mr-2' />
        <span>{format(state[0].startDate, 'MMM d, yyyy')} - {format(state[0].endDate, 'MMM d, yyyy')}</span>
        <FontAwesomeIcon icon={faChevronDown} className='text-gray-500 ml-2 text-xs' />
      </div>
      {open && (
        <div className='absolute z-50 bg-white shadow rounded mt-2'>
            <DateRange editableDateInputs={true} onChange={item => setState([item.selection])} moveRangeOnFirstSelection={false} ranges={state} maxDate={new Date()} />
        </div>
      )}
    </div>
  )
}

export default DateRangePicker
