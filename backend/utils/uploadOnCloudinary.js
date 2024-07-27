require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports.uploadOnCloudinary=async function (filePath){
    try{
        const uploadResponse = await cloudinary.uploader.upload(filePath);
        return uploadResponse.secure_url;
    }catch(err){
        return err;
    }
}

module.exports.uploadBatchOnCloudinary=async function (filePaths){
    try{
        const promises=filePaths.map(async (filePath)=>{
            const response=await cloudinary.uploader.upload(filePath);
            return response;
        })

        const results=await Promise.all(promises);

        return results;
    }catch(err){
        return err;
    }
}