const mongoose=require('mongoose');
const {Schema}=mongoose;

let generalAdviceSchema=new Schema({
    soilType:{
        type:Schema.Types.ObjectId,
        ref:'SoilType'
    },
    TMax:{
        type:Number,
        required:true
    },
    TMin:{
        type:Number,
        required:true
    },
    advice:{
        type:String,
        required:true
    },
    interval:String,
    quantity:String
})
module.exports=mongoose.model('GeneralAdvice',generalAdviceSchema);