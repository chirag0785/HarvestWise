import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addnewMsg, newMsg } from '../../functions/RoomSlice/RoomSlice';
import { connectSocket } from '../../SocketManager/SocketManager';

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState();
    const { id } = useParams();
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.room.room);
    const user = useSelector(state => state.user.user);
    const socket = useMemo(() => connectSocket(), []);
    const lastMessageRef = useRef(null);
    const fileInputRef = useRef(null);
    const [imgSent, setImgSent] = useState(false);
    const [imgRec, setImgRec] = useState(false);
    const [activeUsers, setActiveUsers] = useState(0);
    const currentRoom = useMemo(() => rooms.find(r => r._id === id) || {}, [rooms, id]);

    const scrollIntoView = useCallback(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    const replyHandler=()=>{
        
    }
    useEffect(() => {
        scrollIntoView();
    }, [currentRoom.messages, scrollIntoView]);

    useEffect(() => {
        if (currentRoom._id) {
            socket.emit('joinroom', { room: currentRoom._id });

            const handleUserJoined = ({ count }) => {
                setActiveUsers(count);
            };

            const handleUserLeft = ({ count }) => {
                setActiveUsers(count);
            };

            const handleNewChat = async ({ msg, username, imgUrl }) => {
                if (user.username !== username) {
                    await dispatch(newMsg({
                        msg: {
                            text: msg,
                            sender: { username },
                            img: imgUrl
                        },
                        roomId: currentRoom._id
                    }));
                    setImgRec(false);
                }
                scrollIntoView();
            };

            socket.on('newuserjoined', handleUserJoined);
            socket.on('userleft', handleUserLeft);
            socket.on('newchat', handleNewChat);

            return () => {
                socket.off('newuserjoined', handleUserJoined);
                socket.off('userleft', handleUserLeft);
                socket.off('newchat', handleNewChat);
                socket.emit('leaveroom', { room: currentRoom._id });
            };
        }
    }, [currentRoom._id, dispatch, socket, user.username, scrollIntoView]);

    const submitHandler = async (ev) => {
        ev.preventDefault();
        if (currentRoom._id && message.trim()) {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
                setImgSent(true);
            }
            formData.append('msg', message.trim());
            formData.append('roomId', currentRoom._id);
            formData.append('username', user.username);
            
            try {
                const result = await dispatch(addnewMsg({ room: currentRoom, msg: message.trim(), username: user.username, formData }));
                const imgUrl = result?.message?.img || '';
                
                socket.emit('newmsg', { 
                    msg: message.trim(),
                    room: currentRoom._id,
                    username: user.username,
                    imgUrl
                });

                setMessage('');
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setImgSent(false);
            } catch (error) {
                console.error('Failed to send message:', error);
                setImgSent(false);
            }
        }
    };

    return (
        <div className="w-2/3 right-0 border h-screen flex flex-col bg-[url('https://res.cloudinary.com/dytld8d0r/image/upload/v1720176568/chatback_ovgfgs.avif')] text-black">

            <div className='flex-1 overflow-y-auto'>
                {Object.keys(currentRoom).length === 0 ? (
                    <div className='flex items-center justify-center h-full'>No room selected</div>
                ) : (
                    <div className='space-y-2 relative'>
                        Active Users: {activeUsers}
                        {currentRoom.messages && currentRoom.messages.map((msg, index) => {
                            return (
                                <div key={index} className={`max-w-fit min-w-40 flex ${msg.sender.username === user.username ? 'ml-auto mr-10' : 'ml-10'}`}>
                                    <button onClick={replyHandler}>⬇️</button>
                                    <div className={`border border-slate-800 rounded p-2 max-w-fit min-w-40 ${msg.sender.username === user.username ? 'bg-green-300' : 'bg-gray-400'}`}>
                                        <div className='font-bold text-sm '>{msg.sender.username}</div>
                                        {msg.img && <img src={msg.img} alt="Shared image" onError={(e) => {
                                            e.target.src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHVncWlzc2J1N2FqNDZoZmFxMG5vYWtmaDRyeTgwdnNjY3FxOGF2MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.webp';
                                            e.target.onerror = null;
                                        }} className="w-80 h-auto mb-2 hover:w-screen" />}
                                        <div>{msg.text}</div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={lastMessageRef} />
                    </div>
                )}
            </div>

            <form onSubmit={submitHandler} className="flex items-center px-4 py-2 bg-white">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                />
                <label className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer">
                    <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                    <span>Upload</span>
                </label>
                <button type="submit" className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;
