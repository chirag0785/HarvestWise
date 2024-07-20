import React from 'react';
import { useNavigate } from 'react-router-dom';

const Room = ({ room }) => {
    const navigate = useNavigate();

    const joinRoomHandler = () => {
        navigate(`/discuss/${room._id}`);
    };

    return (
        <button
            onClick={joinRoomHandler}
            className="block w-full bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 p-4 rounded-lg shadow-lg focus:outline-none"
        >
            <div className="text-center font-semibold text-lg text-gray-800 mb-2">{room.name}</div>
            <div className="text-gray-600 text-sm overflow-auto">{room.description}</div>
        </button>
    );
};

export default Room;
