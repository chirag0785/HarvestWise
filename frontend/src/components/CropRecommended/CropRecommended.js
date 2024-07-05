import React from 'react'
import Crops from './Crops/Crops'
import { useSelector } from 'react-redux'

const CropRecommended = () => {
    const data = useSelector((state) => state.crop.crops);
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-extrabold text-white-500 mb-8 text-center">
                Recommended Crops
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((crop) => (
                    <div key={crop._id} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                        <Crops crop={crop} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CropRecommended