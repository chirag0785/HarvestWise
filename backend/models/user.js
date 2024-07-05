const mongoose = require("mongoose");
const {Schema}=mongoose;
const bcrypt=require('bcrypt');
const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String,
        default:undefined
    }
})
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    try{
        const user=this;
        const hash=await bcrypt.hash(user.password,10);
        user.password=hash;
        next();
    }
    catch(err){
        throw new Error(err);
    }
})

userSchema.methods.checkPassword=async function (password){
    try{
        const user=this;
        const isPassword=await bcrypt.compare(password,user.password);
        return isPassword;
    }catch(err){
        throw new Error(err);
    }

}
module.exports=mongoose.model('User',userSchema);
