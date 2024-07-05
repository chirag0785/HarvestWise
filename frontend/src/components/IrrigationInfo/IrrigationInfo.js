import React from 'react';
import IrrigationSchedules from '../IrrigationSchedules/IrrigationSchedules';
import GeneralAdvice from '../GeneralAdvice/GeneralAdvice';
import { useSelector } from 'react-redux';

const IrrigationInfo = () => {
  const data = useSelector((state) => state.croptype.cropRecom);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h2 className="text-3xl font-extrabold text-white-900 mb-8 text-center">
        Irrigation Information
      </h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Irrigation Schedules</h3>
          <IrrigationSchedules data={data.schedules} />
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">General Advice</h3>
          <GeneralAdvice data={data.generaladvice} />
        </div>
      </div>
    </div>
  );
};

export default IrrigationInfo;
