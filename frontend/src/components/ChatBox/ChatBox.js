import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addnewMsg, newMsg } from '../../functions/RoomSlice/RoomSlice';
import { connectSocket } from '../../SocketManager/SocketManager';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';

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
    // const [oldMessagesRoom,setoldMessagesRoom]=useState({});
    // const [showMore,setshowMore]=useState(false);
    const scrollIntoView = useCallback(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const replyHandler = () => {
        
    }
    // const showMoreHandler=async (ev)=>{
    //     //fetch all messages from backend
    //     if(currentRoom._id){
    //         let {data}=await axios.get(`http://localhost:3000/room/getMessages/${currentRoom._id}`);
    //         setoldMessagesRoom(data.room);
    //         setshowMore(false);
    //     }
    // }
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

            const handleNewChat = async ({ msg, username, imgUrl, image }) => {
                // if(currentRoom.messages.length + 1 >15) setshowMore(true);
                if (user.username !== username) {
                    await dispatch(newMsg({
                        msg: {
                            text: msg,
                            sender: { username, image },
                            img: imgUrl,
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
                const result = await dispatch(addnewMsg({ room: currentRoom, msg: message.trim(), username: user.username, formData, image: user.image }));
                const imgUrl = result?.message?.img || '';
                socket.emit('newmsg', { 
                    msg: message.trim(),
                    room: currentRoom._id,
                    username: user.username,
                    imgUrl,
                    image: user.image
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
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
            <div className="bg-gray-800 shadow-md p-4">
                <h2 className="text-2xl font-semibold text-gray-100">{currentRoom.name || 'Chat'}</h2>
                <p className="text-sm text-gray-400">Active Users: {activeUsers}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {Object.keys(currentRoom).length === 0 ? (
                    <div className='flex items-center justify-center h-full text-gray-500'>
                        Select a room to start chatting
                    </div>
                ) : (
                    <>

                            {currentRoom.messages.map((msg, index) => {
                                const isOwnMessage = msg.sender.username === user.username;
                                return (
                                    <div key={index} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex items-end space-x-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                            <img src={msg.sender.image} alt={msg.sender.username} className="w-8 h-8 rounded-full" />
                                            <div className={`rounded-lg p-3 ${isOwnMessage ? 'bg-blue-600 text-white' : 'bg-gray-700'}`}>
                                                <p className={`text-xs mb-1 ${isOwnMessage ? 'text-blue-200' : 'text-gray-400'}`}>{msg.sender.username}</p>
                                                {msg.img && <img src={msg.img} alt="Shared" className="max-w-full rounded-lg mb-2" />}
                                                <p>{msg.text}</p>
                                            </div>
                                        </div>
                                    </div>
                            )})}
                    </>
                )}
                <div ref={lastMessageRef} />
            </div>

            <form onSubmit={submitHandler} className="bg-gray-800 p-4 flex items-center space-x-2">
                <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="p-2 text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                    <FaPaperclip />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit"
                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
};

export default ChatBox