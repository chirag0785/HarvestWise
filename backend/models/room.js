const mongoose=require('mongoose');
const {Schema} = mongoose;
const roomSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true
    },
    activeUsers:{
        type:Number,
        default:0
    },
    messages:{
        type:[
            {
                type:Schema.Types.ObjectId,
                ref:'Message'
            }
        ], 
        default:[]
    }
})

module.exports=mongoose.model('Room',roomSchema);
