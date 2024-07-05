import React from 'react'
import CategoryCrops from './CategoryCrops/CategoryCrops'

const IrrigationSchedules = ({data}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Irrigation Schedules Recommendations
      </h3>
      <div className="space-y-4">
        {data.map((c) => (
          <div key={c._id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
            <CategoryCrops crop={c} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default IrrigationSchedules