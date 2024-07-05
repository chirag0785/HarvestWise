const express=require('express');
const mongoose = require('mongoose');
const app=express();
const path=require('path');
const cors=require('cors');
const {createServer}=require('http');
const cropRouter=require('./routes/crop');
const weatherRouter=require('./routes/weather');
const userRouter=require('./routes/user');
const roomRouter=require('./routes/room');
const cookieParser=require('cookie-parser');
const {Server}=require('socket.io');
const Message=require('./models/message');
require('dotenv').config();
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3001',
    credentials: true
}))
app.use('/crops',cropRouter);
app.use('/getweather',weatherRouter);
app.use('/user',userRouter);
app.use('/room',roomRouter);
const httpServer=createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3001',
        credentials: true
    }
});
io.on('connection', (socket) => {

    socket.on('joinroom', async ({ room }) => {
        socket.join(room);
        const sockets=await io.in(room).fetchSockets();
        console.log(sockets.length);
        io.emit('newuserjoined',({count:sockets.length}));
    });

    socket.on('leaveroom', async ({ room }) => {
        socket.leave(room);
        const sockets=await io.in(room).fetchSockets();
        io.emit('userleft',({count:sockets.length}));
    });
    socket.on('newRoomAdded',()=>{
        io.emit('newRoomCreated');
    })
    socket.on('newmsg', async ({ msg, room,username,imgUrl }) => {
        io.to(room).emit('newchat', { msg,username,imgUrl });
    });
    socket.on('disconnect', () => {
        
    });
});
const PORT=3000;
mongoose.connect('mongodb://127.0.0.1:27017/FarmerDB')
.then(()=>{
    httpServer.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})