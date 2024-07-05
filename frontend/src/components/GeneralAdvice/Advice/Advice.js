import React from 'react'

const Advice = ({advice}) => {
  return (
    <div className="p-4">
      <h4 className="text-lg font-semibold text-indigo-600 mb-3">
        Temperature Range: {advice.TMin} - {advice.TMax} °C
      </h4>
      <ul className="space-y-2 text-gray-700">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>{advice.advice}</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Irrigation must be done {advice.interval}</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Quantity must be {advice.quantity}</span>
        </li>
      </ul>
    </div>
  )
}

export default Advice