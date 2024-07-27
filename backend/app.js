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
const adminRouter=require('./routes/admin');
const cartRouter=require('./routes/cart');
const inventoryRouter=require('./routes/inventory');
const {Server}=require('socket.io');
const Message=require('./models/message');
const { default: axios } = require('axios');
const Room = require('./models/room');
const User=require('./models/user');
const bodyParser=require('body-parser');
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({
    origin:'http://localhost:4000',
    credentials: true
}))
app.use('/crops',cropRouter);
app.use('/getweather',weatherRouter);
app.use('/user',userRouter);
app.use('/room',roomRouter);
app.use('/admin',adminRouter);
app.use('/cart',cartRouter);

app.use('/inventory',inventoryRouter);
const httpServer=createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:4000',
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
    socket.on('newmsg', async ({ msg, room,username,imgUrl ,image}) => {
        io.to(room).emit('newchat', { msg,username,imgUrl ,image});
    });
    socket.on('disconnect', () => {
        
    });
});

app.get('/gpt/tip', async (req, res, next) => {
    const { prompt } = req.query;
    
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "gpt-3.5-turbo",
                prompt: prompt,
                max_tokens: 60
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        
        res.status(200).json({ text: response.data.choices[0].text.trim() });
    } catch (err) {
        if (err.response) {
            console.error('Response error:', err.response.data);
            res.status(err.response.status).json({ error: err.response.data });
        } else if (err.request) {
            console.error('Request error:', err.request);
            res.status(500).json({ error: 'No response received from OpenAI API' });
        } else {
            console.error('Error:', err.message);
            res.status(500).json({ error: 'An error occurred while processing your request' });
        }
    }
});
const PORT=3000;
mongoose.connect(`mongodb+srv://chirag:${process.env.DB_PASSWORD}@cluster0.ows0qor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    httpServer.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
    })
})
.catch((err)=>{
    console.log(err);
})