require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports=async function uploadOnCloudinary(filePath){
    try{
        const uploadResponse = await cloudinary.uploader.upload(filePath);
        return uploadResponse.secure_url;
    }catch(err){
        return err;
    }
}