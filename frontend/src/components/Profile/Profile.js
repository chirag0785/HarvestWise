import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { updateUserInfo } from '../../functions/UserSlice/UserSlice';

const Profile = () => {
    const data = useSelector(state => state.user);
    const [username, setUsername] = useState(data.user.username);
    const [email, setEmail] = useState(data.user.email);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateInfoHandler = async (ev) => {
        // Check if the info updated or not
        if (username === data.user.username && email === data.user.email) {
            setDisabled(true);
            return;
        }

        await dispatch(updateUserInfo({
            username: data.user.username,
            updates: {
                username,
                email
            }
        }));
        setDisabled(true);
    };

    useEffect(() => {
        if (!data.isLoggedIn) {
            navigate('/login');
        }
    }, [data, navigate]);

    if (!data.user || Object.keys(data.user).length === 0) {
        return <div className="text-center text-gray-400">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="text-center py-6 bg-gray-700">
                    <h1 className="text-3xl font-bold text-white">User Profile</h1>
                    <button
                        onClick={() => setDisabled(false)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Update Profile
                    </button>
                </div>
                <div className="px-6 py-8">
                    <div className="mb-6 flex justify-center">
                        <img
                            src={data.user.image}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
                        />
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <FaUser className="text-blue-500 mr-2" />
                            <label className="text-gray-400 text-sm font-semibold">Username</label>
                        </div>
                        <input
                            className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:border-blue-500"
                            value={username}
                            onChange={(ev) => setUsername(ev.target.value)}
                            disabled={disabled}
                        />
                    </div>
                    <div>
                        <div className="flex items-center mb-2">
                            <FaEnvelope className="text-blue-500 mr-2" />
                            <label className="text-gray-400 text-sm font-semibold">Email</label>
                        </div>
                        <input
                            className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:border-blue-500"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            disabled={disabled}
                        />
                    </div>

                    {!disabled && (
                        <button
                            onClick={updateInfoHandler}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
