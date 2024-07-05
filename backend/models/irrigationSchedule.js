const mongoose=require('mongoose');
const {Schema}=mongoose;
let waterSchema=new Schema({
    period:{
        type:String,
    },
    quantity:{
        type:String,
    },
    frequency:{
        type:String
    }
},{_id:false})
let irrigationScheduleSchema=new Schema({
    germinationEmergence:waterSchema,
    vegetativeStage:waterSchema,
    floweringBlooming:waterSchema,
    fruitGrainDevelopment:waterSchema,
    maturationHarvest:waterSchema
})
module.exports=mongoose.model('IrrigationSchedule',irrigationScheduleSchema);