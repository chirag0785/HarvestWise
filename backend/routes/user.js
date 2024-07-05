const express=require('express');
const User = require('../models/user');
const router=express.Router();
const jwt=require('jsonwebtoken');
router.post('/signup',async (req,res,next)=>{
    const {username,password,email}=req.body;
    try{
        let user=await User.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        if(user){
            return res.status(200).json({userExists:true,msg:'User already exists'});
        }
        let newUser=await User.create({
            username,
            password,
            email
        })
        return res.status(200).json(newUser);

    }catch(err){
        throw new Error(err);
    }
})

router.post('/login',async (req,res,next)=>{
    const {username,email,password}=req.body;
    try{
        let user=await User.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        if(!user){
            return res.status(200).json({userExists:false,msg:"User doesnot exists"});
        }

        const isPasswordCorrect=await user.checkPassword(password);
        if(!isPasswordCorrect){
            return res.status(200).json({userExists:true,passwordCorrect:false,msg:'Password Incorrect'});
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        user.token=token;
        await user.save();

        console.log("idhar");
        res
        .cookie('jwt',token,{
            httpOnly:true,
            secure:true,
            maxAge:86400000
        })
        .status(200)
        .json({isLoggedIn:true,msg:"Success",user})

    }catch(err){
        console.log(err);
        res.status(500).json({msg:"internal server error"});
    }
})

router.post('/logout',async (req,res,next)=>{
    const {username,password,email}=req.body;
    try{
        let user=await User.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })

        user.token=undefined;
        await user.save();
        res.clearCookie('jwt').json({msg:"logged out"});
    }catch(err){
        res.status(500).json({msg:"internal server error"});
    }
})
module.exports=router;