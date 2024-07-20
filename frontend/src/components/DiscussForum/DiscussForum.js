import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../../functions/RoomSlice/RoomSlice';
import Room from '../Room/Room';
import { Outlet, useNavigate } from 'react-router-dom';
import { connectSocket } from '../../SocketManager/SocketManager';

const DiscussForum = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.room.room);

    if (!user.isLoggedIn) {
        navigate('/login');
    }

    useEffect(() => {
        const socket = connectSocket();
        socket.on('newRoomCreated', () => {
            dispatch(getRooms());
        });

        dispatch(getRooms());

        return () => {
            socket.off('newRoomCreated');
        }
    }, [dispatch]);

    function addRoomHandler() {
        navigate('/discuss/addroom');
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 flex-shrink-0">
                    <h2 className="text-2xl font-bold mb-6 text-center">Discussion Rooms</h2>
                    <button 
                        onClick={addRoomHandler}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 mb-8 shadow-lg"
                    >
                        Create New Room
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto px-4">
                    <div className="grid grid-cols-1 gap-4">
                        {rooms.map((room) => (
                            <div key={room._id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                                <Room room={room} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DiscussForum;
