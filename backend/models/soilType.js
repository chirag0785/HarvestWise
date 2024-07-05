const mongoose=require('mongoose');
const {Schema}=mongoose;

let soilTypeSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    features:{
        type:[{
            type:String,
        }],
        default:[]
    }
})
module.exports=mongoose.model('SoilType',soilTypeSchema);