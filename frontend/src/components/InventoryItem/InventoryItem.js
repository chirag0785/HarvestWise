import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postAddToCart } from '../../functions/CartSlice/CartSlice';

const InventoryItem = ({ item , isAdmin}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector(state=>state.user.user);
  const cart=useSelector(state=>state.cart.cart);
  const getProductPage=(ev)=>{
      navigate(`/inventory/${item._id}`);
  }
  const addToCartHandler=async (ev)=>{
      await dispatch(postAddToCart({itemId:item._id, userId:user._id}));
      navigate(`/cart`);
  }
  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg" onClick={getProductPage}>
      <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover object-center" />
      <div className="p-6">
        <div className="text-white font-bold text-xl mb-2">{item.name}</div>
        <p className="text-gray-400 text-sm mb-4">{item.category}</p>
        <p className="text-gray-300">₹ {item.price}</p>
        <p className="text-gray-500">{item.seller}</p>
        <p className="text-gray-400 text-sm mt-4 max-w-md overflow-hidden overflow-ellipsis">{item.description}</p>
        {!isAdmin && <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
            aria-label={`Add ${item.name} to cart`}
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            aria-label={`Buy ${item.name} now`}
          >
            Buy Now
          </button>
        </div>}
      </div>
    </div>
  );
};

export default InventoryItem;
