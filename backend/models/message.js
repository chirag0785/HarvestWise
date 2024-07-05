const mongoose=require('mongoose');
const {Schema} = mongoose;
const messageSchema=new Schema({
    text:{
        type:String,
    },
    img:{
        type:String,
        default:'',
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
})

module.exports=mongoose.model('Message',messageSchema);