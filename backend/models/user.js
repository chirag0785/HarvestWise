const mongoose = require("mongoose");
const {Schema}=mongoose;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
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
    image:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    },
    admin:{
        type:Boolean,
        default:false
    },
    cart:[
        {
            id:{
                type:Schema.Types.ObjectId,
                ref:'Inventory',
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    orders:[
        {
            id:{
                type:Schema.Types.ObjectId,
                ref:'Inventory',
            },
            quantity:{
                type:Number,
                required:true
            },
            time:{
                type:Date,
                default:Date.now
            }
        }
    ]
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
        return next(err);
    }
})

userSchema.methods.checkPassword=async function (password){
    try{
        const user=this;
        const isPassword=await bcrypt.compare(password,user.password);
        return isPassword;
    }catch(err){
        throw new Error(err.message);
    }
}
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            userId: this._id
        },
        process.env.REFRESH_TOKEN_KEY
        ,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });
}

userSchema.methods.generateAccessToken=async function (){
    return jwt.sign(
        {
            userId:this._id,
            email:this.email,
            username:this.username,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
)
}

module.exports=mongoose.model('User',userSchema);
