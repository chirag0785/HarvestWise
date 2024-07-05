const mongoose=require('mongoose');
const {Schema}=mongoose;

let cropSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    cropType:{
        type:Schema.Types.ObjectId,
        ref:'CropType'
    },
    suitableSoilType:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'SoilType'
        }],
        default:[]
    },
    TMax:{
        type:Number,
        required:true
    },
    TMin:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    preferredLoc:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'GeoLocation'
        }],
        default:[]
    }
})
module.exports=mongoose.model('Crop',cropSchema);