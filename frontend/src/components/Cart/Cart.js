import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decQuantity, incQuantity, setCart } from '../../functions/CartSlice/CartSlice';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise=loadStripe('pk_test_51Pe9evHsoAoo18IYuEcMEUhlr378mtHxLhKlxBrcIajnRpGm9sBPaOlM8MmqLhPrAXAkgf4U1JuaYt4n8icJXsK500jjAOLGBP')
const Cart = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  if (!user.isLoggedIn) {
    navigate('/login');
    return null;
  }

  const totalAmount = cart.reduce((prevVal, currVal) => prevVal + currVal.quantity * currVal.id.price, 0);

  const incQuantityHandler = (itemId) => {
    dispatch(incQuantity(itemId));
    setConfirm(true);
  }

  const decQuantityHandler = (itemId) => {
    dispatch(decQuantity(itemId));
    setConfirm(true);
  }

  const confirmHandler = async () => {
    await axios.post('http://localhost:3000/cart/updatecart', {
      cart,
      userId: user.user._id
    });
    setConfirm(false);
  }
  const buyNowHandler=async (ev)=>{
      const stripe=await stripePromise;
      const {data}=await axios.post('http://localhost:3000/cart/buy',{
        cart,
        userId:user.user._id
      })
      const result=await stripe.redirectToCheckout({
        sessionId:data.id
      })
      if(result.error){
        console.log(result.error);
      }
      else{
          console.log('idhar');
          await dispatch(setCart(data.user.cart));
      }
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {confirm && (
                <button 
                  onClick={confirmHandler}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Confirm Changes
                </button>
      )}
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="sticky top-0 z-10 bg-gray-900 py-4 mb-8">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-2xl font-semibold">
                Total: ₹{totalAmount}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col">
                <img
                  src={item.id.imageUrl}
                  alt={item.id.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h2 className="text-2xl font-semibold mb-2">{item.id.name}</h2>
                <p className="text-gray-400 mb-1">Category: {item.id.category}</p>
                <div className="text-gray-400 mb-1 flex items-center">
                  <p>Quantity: </p>
                  <button 
                    className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 ml-2 rounded transition duration-300" 
                    onClick={() => incQuantityHandler(item._id)}
                  >
                    +
                  </button>
                  <p className="mx-2">{item.quantity}</p>
                  <button 
                    className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition duration-300" 
                    onClick={() => item.quantity > 0 && decQuantityHandler(item._id)}
                  >
                    -
                  </button>
                </div>
                <p className="text-gray-400 mb-1">Seller: {item.id.seller}</p>
                <p className="text-gray-400 mb-4">Price: ₹{item.id.price.toFixed(2)}</p>
                <p className="text-gray-300 flex-grow">{item.id.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {totalAmount>0 && <button onClick={()=>buyNowHandler(totalAmount)}>Buy Now</button>}
    </div>
  );
};

export default Cart;