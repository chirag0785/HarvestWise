import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const data = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
      if(!data.isLoggedIn){
        navigate('/login');
      }
    }, [data, navigate])

    if (!data.user || Object.keys(data.user).length === 0) {
      return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="text-center py-4 px-6 bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        </div>
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <p className="text-gray-600">{data.user.username}</p>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <p className="text-gray-600">{data.user.email}</p>
          </div>
        </div>
      </div>
    )
}

export default Profile