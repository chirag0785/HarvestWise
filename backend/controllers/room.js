const Room = require("../models/room");
const ErrorHandler = require("../utils/ErrorHandler");
const ErrorWrapper = require("../utils/ErrorWrapper");

module.exports.getRooms=ErrorWrapper(async (req, res, next) => {
        let rooms;
         try{
            rooms = await Room.find().populate({
                path: 'messages',
                populate: {
                    path: 'sender',
                    model: 'User',
                    select: 'username image',
                },
            });
         }catch(err){
            throw new ErrorHandler(500,"Error while finding all rooms");
         }
        return res.status(200).json({ rooms });
})

module.exports.postAddRoom=ErrorWrapper(async (req, res, next) => {
    const { name, description } = req.body;
    try {
        const room = await Room.create({ name, description });
        return res.status(200).json({ room });
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server error" });
    }
})