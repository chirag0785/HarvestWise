const Inventory = require("../models/inventory");
const ErrorHandler = require("../utils/ErrorHandler");
const ErrorWrapper = require("../utils/ErrorWrapper");

module.exports.getInventoryItemById=ErrorWrapper(async (req,res,next)=>{
    const {itemId}=req.params;
    let item;
    try{
        item=await Inventory.findOne({_id:itemId}).populate('reviews.id');
        if(!item){
            throw new ErrorHandler(400,"Error no item found while get inventory by id");
        }
    }catch(err){
        throw new ErrorHandler(500,"db can't be accessed right now while getting inventory item by id");
    }
    console.log(item);
    res.status(200).json({item});
})