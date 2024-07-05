import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRooms } from '../../functions/RoomSlice/RoomSlice';
import Room from '../Room/Room';
import { Outlet, useNavigate } from 'react-router-dom';
import { connectSocket } from '../../SocketManager/SocketManager';

const DiscussForum = () => {
    const user=useSelector(state=>state.user);
    const navigate=useNavigate();
    function addRoomHandler(ev){
        navigate(`/discuss/addroom`);
    }
    if(!user.isLoggedIn){
        navigate(`/login`);
    }
    const data=useSelector(state=>state.room.room);
    const dispatch=useDispatch();
    useEffect(()=>{
        const socket=connectSocket();
        socket.on('newRoomCreated',()=>{
            dispatch(getRooms());
        })

        return ()=>{
            socket.off('newRoomCreated');
        }
    },[data])
    useEffect(()=>{
        dispatch(getRooms());
    },[])
  return (
    <div className='flex'>
        <div className='flex flex-col w-1/4 p-4'>
            {data.map((r)=><Room key={r._id} room={r}/>)}
            <button onClick={addRoomHandler}>Create Room</button>
        </div>
        
        <Outlet/>
    </div>
  )
}

export default DiscussForum