const User = require('../models/user');
const jwt=require('jsonwebtoken');
const ErrorWrapper = require('../utils/ErrorWrapper');
const ErrorHandler = require('../utils/ErrorHandler');
const {uploadOnCloudinary, uploadBatchOnCloudinary} = require('../utils/uploadOnCloudinary');
const getDataUri=require('../utils/datauriparser');
const Inventory=require('../models/inventory');
module.exports.postSignup=ErrorWrapper(async (req,res,next)=>{
    const {username,password,email}=req.body;
        if(!username||!password||!email){
            throw new ErrorHandler(401,'Missing Fields');
        }
        let user=await User.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        if(user){
            throw new ErrorHandler(401,'User already Exists');
        }
        let IMG_URI=getDataUri(req.file);
        let cloudinaryResponse;
        try{
            cloudinaryResponse=await uploadOnCloudinary(IMG_URI);
        }catch(err){
            throw new ErrorHandler(500,`Error while uploading Image ${err.message}`);
        }
        

        try{
            let newUser=await User.create({
                username,
                password,
                email,
                image:cloudinaryResponse
            })
            console.log(newUser);
            let user=await User.findOne({
                _id:newUser._id
            }).select("-password");
            res.status(201).json({
                success:true,
                user:user
            })
        }catch(err){
            throw new ErrorHandler(500,`Error while creating new user`);
        }
})

const generateAccessTokenAndRefreshToken=async (userId)=>{
    try {
        let user = await User.findOne({
            _id: userId
        });
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw new ErrorHandler(500, `Error while generating access token and refresh token`);
    }
}

module.exports.postLogin=ErrorWrapper(async (req,res,next)=>{
    const {username,email,password}=req.body;
    if (!username && !email) {
        throw new ErrorHandler(400, "Please enter either username or email");
    }
    if (!password) {
        throw new ErrorHandler(400, "Please enter password");
    }
    let user = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (!user) {
        throw new ErrorHandler(400, "Invalid username or email");
    }

    const passwordMatch=await user.checkPassword(password);
    if(!passwordMatch){
        throw new ErrorHandler(400,'Password not match');
    }

    const {accessToken,refreshToken}=await generateAccessTokenAndRefreshToken(user._id);
    user.refreshToken=refreshToken;
    await user.save();
    user=await User.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("-password -refreshToken").populate('cart.id orders.id');
    res.cookie("RefreshToken", refreshToken, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.cookie("AccessToken", accessToken, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.status(200).json({
        success: true,
        message: 'Login Success',
        user
    });
})

module.exports.postLogout=ErrorWrapper(async (req,res,next)=>{
    const {username,email}=req.body;
        let user=await User.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        if(!user){
            throw new ErrorHandler(400,'User not exists');
        }
        user.refreshToken=undefined;
        await user.save();
        res.cookie("RefreshToken", "", { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
    
        res.cookie("AccessToken", "", { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({msg:"logged out"});
})
module.exports.patchUpdateUserInfo=ErrorWrapper(async (req,res,next)=>{
    const {usernameId}=req.params;
    
    const {username,email}=req.body;
    let user;
    try{
        user=await User.findOne({
            username:usernameId
        })
    }catch(err){
        throw new ErrorHandler(500,"Can't access DB right now");
    }

    if(!user){
        throw new ErrorHandler(400,"User not exists");
    }
    user.username=username;
    user.email=email;
    await user.save();

    const {accessToken,refreshToken}=generateAccessTokenAndRefreshToken(user._id);

    user.refreshToken=refreshToken;
    await user.save();

    user=await User.findOne({
        username
    }).select("-password -refreshToken -cart -orders");

    res.status(200)
    .cookie("RefreshToken",refreshToken, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })
    .cookie("AccessToken",accessToken, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })
    .json({user,success:true});
})

module.exports.getUserInfo=ErrorWrapper(async (req,res,next)=>{
    const {id}=req.params;
    let user;
    try {
       user=await User.findOne({_id:id}).populate('cart.id orders.id'); 
       res.status(200).json(user);
    } catch (error) {
        throw new ErrorHandler(500,"error while retrieving user info from db");
    }
})
module.exports.getInventoryItems=ErrorWrapper(async (req,res,next)=>{
    let items;
    try{
        items=await Inventory.find();

        res.status(200).json({items});
    }catch(err){
        throw new ErrorHandler(500,"Error while getting items from DB");
    }
})

module.exports.getUserOnRefresh = ErrorWrapper(async (req, res, next) => {
    if (!req.cookies) {
        throw new ErrorHandler(400, "No cookies received");
    }
    const accessToken = req.cookies.AccessToken;
    const refreshToken = req.cookies.RefreshToken;

    if (!accessToken || !refreshToken) {
        throw new ErrorHandler(401, "No tokens provided");
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        const user = await User.findById(decoded.userId).select('-password -refreshToken').populate('cart.id orders.id');
        if (!user) {
            throw new ErrorHandler(404, "User not found");
        }
        res.status(200).json({ user, success: true });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
                const user = await User.findById(decoded.userId).select('-password -refreshToken').populate('cart.id orders.id');
                if (!user) {
                    throw new ErrorHandler(404, "User not found");
                }

                const newAccessToken = await user.generateAccessToken();
                res.cookie('AccessToken', newAccessToken, { 
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });
                res.status(200).json({ user, success: true });
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new ErrorHandler(401, "Refresh token expired");
                } else {
                    throw new ErrorHandler(401, "Invalid refresh token");
                }
            }
        } else {
            throw new ErrorHandler(401, "Invalid access token");
        }
    }
});


module.exports.postAddReview=ErrorWrapper(async (req,res,next)=>{

    const {username,userId,itemId,review}=req.body;
    let user;
    try{
        user=await User.findOne({_id:userId});
        if(!user){
            throw new ErrorHandler(400,"user not exists while post add review");
        }
    }catch(err){
        throw new ErrorHandler(500,"can't access db right now while post add review");
    }

    let item;
    try{
        item=await Inventory.findOne({_id:itemId});
        if(!item){
            throw new ErrorHandler(400,"item not exists while post add review");
        }
    }catch(err){
        throw new ErrorHandler(500,"can't access db right now while post add review");
    }
    
    const fileDataUris=req.files.map((file)=> getDataUri(file));
    let response;
    try{
        response=await uploadBatchOnCloudinary(fileDataUris);
    }catch(err){
        throw new ErrorHandler(500,"error while uploading images of review");
    }
    
    const urls=response.map((image)=> image.secure_url);

    item.reviews.push({username,review,images:urls,id:userId});

    await item.save();
    res.status(200).json({msg:"review added success"});
})


module.exports.editReview=ErrorWrapper(async (req,res,next)=>{
    const {reviewId,review,itemId}=req.body;
    console.log(itemId,"here");
    let item;
    try{
        item=await Inventory.findOne({_id:itemId});
        if(!item){
            throw new ErrorHandler(400,"Item not found while edit review");
        }
    }catch(err){
        throw new ErrorHandler(500,"can't access db right now while edit review");
    }


    const ind=item.reviews.findIndex((r)=> r._id.toString()===reviewId);

    if(ind==-1){
        throw new ErrorHandler(400,"review not found while edit review");
    }

    item.reviews[ind].review=review;

    await item.save();

    res.status(200).json({msg:"review edit successs"});
})