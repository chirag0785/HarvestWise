import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addReview, editReview } from '../../functions/UserSlice/UserSlice';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FaPaperPlane } from 'react-icons/fa';

const Review = () => {
    const location=useLocation();
  const [review, setReview] = useState('');
  const [files, setFiles] = useState([]);
  const { orderId } = useParams();
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const navigate = useNavigate();
    useEffect(()=>{
        const reviewText=location.state?.reviewText;
        if(reviewText){
            setReview(reviewText);
        }
    },[location]);
  const reviewAddHandler = async (ev) => {
    ev.preventDefault();
    if(review.length==0) return;
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('username', user.username);
    formData.append('itemId', orderId);
    formData.append('review', review);

    if (!location.state) {
        files.forEach(file => formData.append('files', file));
        await dispatch(addReview(formData));
    } else {
        await dispatch(editReview({reviewId:location.state.reviewId,review,itemId:orderId}));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setReview('');
    setFiles([]);
    navigate('/inventory');
  };

  const handleFileChange = (ev) => {
    setFiles((prev) => [...prev, ...Array.from(ev.target.files)]);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 flex items-center justify-center">
      <form onSubmit={reviewAddHandler} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">Submit Your Review</h2>
        <div className="space-y-2">
          <label htmlFor="review" className="block text-sm font-bold">
            Enter Review
          </label>
          <textarea
            id="review"
            placeholder="Enter review"
            onChange={(ev) => setReview(ev.target.value)}
            value={review}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
            rows="4"
          ></textarea>
        </div>
        {!location.state?.reviewId && <div className="space-y-2">
          <label htmlFor="files" className="block text-sm font-bold">
            Upload Files
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              id="files"
              onChange={handleFileChange}
              multiple
              className="hidden"
              ref={fileInputRef}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
            >
              <AiOutlineFileAdd className="text-lg" />
              <span>Add Files</span>
            </button>
          </div>
          {files.length > 0 && (
            <div className="mt-3 text-sm text-gray-400">
              <p>Selected files:</p>
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          
        </div>}
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <FaPaperPlane className="text-lg" />
          <span>Submit Review</span>
        </button>
      </form>
    </div>
  );
};

export default Review;
