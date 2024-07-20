const { HttpStatusCode } = require("axios");

const ErrorWrapper=function(cb){
    return async function (req,res,next){
        try{
            await cb(req,res,next);
        }catch(err){
            const statusCode=err.statusCode||500;
            res.status(statusCode).json({
                statusCode:statusCode,
                message:err.message,
                success:false
            })
        }
    }
}

module.exports=ErrorWrapper;