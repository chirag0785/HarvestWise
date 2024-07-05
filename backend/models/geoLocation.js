const mongoose=require('mongoose');
const {Schema}=mongoose;

let geoLocationSchema=new Schema({
    name:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model('GeoLocation',geoLocationSchema);