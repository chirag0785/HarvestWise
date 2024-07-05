import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = () => {
    if (!socket) {
        socket = io('http://localhost:3000');
        socket.connect();
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () => socket;