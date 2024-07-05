import React from 'react'
import Advice from './Advice/Advice'

const GeneralAdvice = ({data}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        General Watering Interval and Quantity
      </h2>
      <div className="space-y-4">
        {data.map((g) => (
          <div key={g._id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
            <Advice advice={g} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GeneralAdvice