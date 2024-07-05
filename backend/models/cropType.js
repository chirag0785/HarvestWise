const mongoose=require('mongoose');
const {Schema}=mongoose;

let cropTypeSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    irrigationSchedule:{
        type:Schema.Types.ObjectId,
        ref:'IrrigationSchedule'
    },
})
module.exports=mongoose.model('CropType',cropTypeSchema);