import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToRooms } from '../../functions/RoomSlice/RoomSlice';
import { useNavigate } from 'react-router-dom';
import { connectSocket } from '../../SocketManager/SocketManager';

const AddRoom = () => {
    const [room, setroom] = useState('');
    const [description, setdescription] = useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch()
    function submitHandler(ev){
        ev.preventDefault();
        dispatch(addToRooms({name:room,description}));
        const socket=connectSocket();
        socket.emit('newRoomAdded');
        navigate(`/discuss`);
    }
  return (
    <>
        <form onSubmit={submitHandler} className='w-2/5 mx-auto flex flex-col gap-y-5 border border-stone-500 px-7 py-4 mt-16 text-black'>
            <input className='p-2 bg-orange-100' type='text' placeholder='Enter Room name' value={room} onChange={(ev)=>setroom(ev.target.value)}/>
            <input className='p-2 bg-orange-100' type='text' placeholder='Enter description' value={description} onChange={(ev)=>setdescription(ev.target.value)}/>
            <button className='w-32 mx-auto bg-zinc-950 p-1.5 rounded-2xl text-white'>Submit</button>
        </form>
    </>
  )
}

export default AddRoom