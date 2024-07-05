import React from 'react';
import Schedule from './Schedule/Schedule';

const CategoryCrops = ({ crop }) => {
  return (
    <div className="space-y-4 p-6 bg-slate-800 text-white rounded-lg shadow-lg">
      <h4 className="text-2xl font-semibold text-white">{crop.name}</h4>
      <p className="text-gray-400">{crop.description}</p>

      <div className="mt-4">
        <h5 className="text-lg font-medium text-gray-300 mb-3">Irrigation Schedules:</h5>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {Object.keys(crop.irrigationSchedule).map((schedule, indx) => {
            if (schedule !== '_id') {
              return (
                <Schedule
                  schedule={schedule}
                  key={indx}
                  irrigationSchedule={crop.irrigationSchedule}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryCrops;
