import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const getReviewPage = (orderId) => {
    navigate(`/review/${orderId}`);
  };
  const orders = useSelector((state) => state.order.orders);
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">No Orders</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src={order.id.imageUrl}
              alt={order.id.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="mb-2">
              <h2 className="text-xl font-semibold">{order.id.name}</h2>
              <p className="text-sm text-gray-400">Quantity: {order.quantity}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">₹{order.id.price}</span>
              <span className="text-sm text-gray-400">{new Date(order.time).toDateString()}</span>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              onClick={() => getReviewPage(order.id._id)}
              aria-label={`Add Review for ${order.id.name}`}
            >
              Add Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
