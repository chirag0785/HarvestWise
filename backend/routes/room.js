const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const Message = require('../models/message');
require('dotenv').config();
const User = require('../models/user');
const multer = require('multer');
const DatauriParser = require('datauri/parser');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const { getRooms, postAddRoom } = require('../controllers/room');

const upload = multer();
const parser = new DatauriParser();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
router.get('/getrooms', getRooms);

router.post('/addroom', postAddRoom);
router.get('/getMessages/:id',async (req,res,next)=>{
    const {id}=req.params;
    try{
        let room=await Room.findOne({_id:id}).populate({
            path: 'messages',
            populate: {
                path: 'sender',
                model: 'User',
                select: 'username image',
            },
        })

        res.json({room});
    }catch(err){
        res.status(500).json({ msg: "Internal server error" });
    }
})
router.post('/addMsg', upload.single('file'), async (req, res, next) => {
    try {
        const { msg, roomId, username } = req.body;
        const file = req.file;

        let room = await Room.findOne({ _id: roomId });
        let user = await User.findOne({ username });

        let message = await Message.create({
            text: msg,
            sender: user._id
        });

        room.messages.push(message._id);
        await room.save();

        const popMessage = await Message.findOne({ _id: message._id }).populate('sender', 'username image');
        console.log("Message created and populated:", popMessage);

        if (file) {
            console.log("Received file:", file);
            const IMG_URI = parser.format(path.extname(file.originalname), file.buffer);
            console.log("Data URI created:", IMG_URI.content);

            try {
                const uploadResponse = await cloudinary.uploader.upload(IMG_URI.content);
                console.log("Upload response:", uploadResponse);

                popMessage.img = uploadResponse.secure_url;
                await popMessage.save();
            } catch (uploadError) {
                console.error("Error uploading to Cloudinary:", uploadError);
                return res.status(500).json({ msg: "Error uploading image" });
            }
        }

        res.status(200).json({ 
            message: {
                ...popMessage.toObject(),
                sender: {
                    username: popMessage.sender.username,
                    image: popMessage.sender.image
                }
            } 
        });
    } catch (err) {
        console.error("Error handling addMsg:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
