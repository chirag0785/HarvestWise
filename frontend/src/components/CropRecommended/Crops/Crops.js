import React from 'react'

const Crops = ({crop}) => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{crop.name}</h3>
      <p className="text-sm font-medium text-indigo-600 mb-3">{crop.cropType.name}</p>
      <p className="text-gray-600 text-sm">{crop.description}</p>
    </div>
  )
}

export default Crops