import React from 'react';
import { FaCheckCircle, FaHome, FaFileAlt } from 'react-icons/fa';

const PaymentSuccess = ({ orderNumber=0, amount=0 }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-medium text-gray-800">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium text-gray-800">${amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
            <FaFileAlt className="mr-2" />
            View Order Details
          </button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center justify-center">
            <FaHome className="mr-2" />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;