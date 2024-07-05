import React from 'react'

const Schedule = ({schedule, irrigationSchedule}) => {
  return (
    <div className='flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition duration-300'>
      <div className='text-xl font-bold text-indigo-600 mb-2'>{schedule}</div>
      <div className='text-gray-700 mb-1'>
        <span className='font-semibold'>Period:</span> {irrigationSchedule[schedule].period}
      </div>
      <div className='text-gray-700 mb-1'>
        <span className='font-semibold'>Quantity:</span> {irrigationSchedule[schedule].quantity}
      </div>
      <div className='text-gray-700'>
        <span className='font-semibold'>Frequency:</span> {irrigationSchedule[schedule].frequency}
      </div>
    </div>
  )
}

export default Schedule