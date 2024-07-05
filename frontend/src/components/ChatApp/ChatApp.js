import React, { useEffect } from 'react'
import { socket } from '../../socket'
const ChatApp = () => {
    useEffect(()=>{
        socket.connect();
    },[])
  return (
    <div>ChatApp</div>
  )
}

export default ChatApp