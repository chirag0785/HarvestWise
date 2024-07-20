const Inventory = require("../models/inventory");
const ErrorHandler = require("../utils/ErrorHandler");
const ErrorWrapper = require("../utils/ErrorWrapper");
const getDataUri=require('../utils/datauriparser');
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");



module.exports.postAddInventoryItem=ErrorWrapper(async (req,res,next)=>{
    const {name,category,price,seller,description}=req.body;
    const file=req.file;
    //search for missing fields
    if(!name || !category || !price || !seller ){
        throw new ErrorHandler(400,"Missing fields");
    }

    let item;
    const IMG_URI=getDataUri(file);
    let url;
    try{
         url=await uploadOnCloudinary(IMG_URI);
    }catch(err){
        throw new ErrorHandler(500,"Error while uploading to cloudinary");
    }
    try{
        item=await Inventory.create({
            name,
            category,
            price,
            seller,
            description:description?description:'',
            imageUrl:url
        })
    }catch(err){
        throw new ErrorHandler(500,"Error while adding item to DB");
    }
    res.status(200).json({item});
})