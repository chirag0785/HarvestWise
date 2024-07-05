import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Room = ({room}) => {
    const navigate=useNavigate();

  const joinRoomHandler = () => {
      navigate(`/discuss/${room._id}`)
  };
  return (
    <>
        <button onClick={joinRoomHandler} className='border hover:bg-slate-400'>
            <div>{room.name}</div>
            <div className='overflow-auto'>{room.description}</div>
        </button>
    </>
  )
}

export default Room