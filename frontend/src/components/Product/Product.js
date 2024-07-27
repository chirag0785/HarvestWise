import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { postAddToCart } from '../../functions/CartSlice/CartSlice';

const Product = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const addToCartHandler=async (ev)=>{
    await dispatch(postAddToCart({itemId:item._id, userId:user._id}));
    navigate(`/cart`);
}
  const editHandler = ({ review, _id }) => {
    navigate(`/review/${itemId}`, {
      state: {
        reviewText: review,
        reviewId: _id,
      }
    });
  };

  useEffect(() => {
    const getInventoryItem = async (itemId) => {
      try {
        const { data } = await axios.get(`http://localhost:3000/inventory/item/${itemId}`);
        setItem(data.item);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    getInventoryItem(itemId);
  }, [itemId,user]);

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:items-start lg:space-x-8">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
            <p className="text-xl text-blue-400 mb-4">{item.category}</p>
            <p className="text-lg text-gray-300 mb-6">{item.description}</p>
            <div className="flex items-center justify-between mb-6">
              <p className="text-3xl font-bold text-green-400">₹{item.price}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center" onClick={addToCartHandler}>
                <AiOutlineShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
            <p className="text-lg text-gray-400 mb-4">Seller: {item.seller}</p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
          {item.reviews && item.reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {item.reviews.map((review) => (
                <div key={review._id} className="bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
                  <div className="flex items-center mb-4">
                    <FaUserCircle className="text-3xl mr-3 text-blue-400" />
                    <span className="text-lg font-semibold">{review.id.username}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{review.review}</p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex space-x-2 mb-4">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}
                  <div className="text-gray-500 text-sm mb-4">
                    {new Date(review.timeOfReview).toDateString()}
                  </div>
                  {review.username === user.username && (
                    <button
                      onClick={() => editHandler(review)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-full transition duration-300"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-lg">No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
