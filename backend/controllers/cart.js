const Inventory = require("../models/inventory");
const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const ErrorWrapper = require("../utils/ErrorWrapper");
require('dotenv').config();
const stripe=require('stripe')(process.env.STRIPE_PAYMENT_KEY);
module.exports.postAddToCart=ErrorWrapper(async (req,res,next)=>{
    const {userId,itemId}=req.body;
    if(!userId || !itemId){
        throw new ErrorHandler(400,"Missing fields");
    }

    let user;
    try{
        user=await User.findOne({_id:userId});
        if(!user){
            throw new ErrorHandler(400,"User not found");
        }
    }catch(err){
        throw new ErrorHandler(500,"Error while accessing the db while post adding to cart");
    }

    let item;
    try{
        item=await Inventory.findOne({_id:itemId});
        if(!item){
            throw new ErrorHandler(400,"Item not found that is to be added to cart");
        }
    }catch(err){
        throw new ErrorHandler(500,"Error while accessing the db while post adding to cart");
    }
    let alreadyThereInCart=false;
    let ind=-1;
    console.log(user.cart);
    console.log(itemId);
    user.cart.forEach((c,indx)=>{
        if(c.id==itemId){
            alreadyThereInCart=true;
            ind=indx;
        }
    })
    if(!alreadyThereInCart){
        user.cart.push({
            id:itemId,
            quantity:1
        })
    }
    else{
        user.cart[ind].quantity++;
    }
    await user.save();
    user=await User.findOne({_id:userId}).populate('cart.id');
    res.status(200).json({cart:user.cart});
})


module.exports.postupdateCart=ErrorWrapper(async (req,res,next)=>{
    const {cart,userId}=req.body;
    if(!cart){
        throw new ErrorHandler(400,"Cart not provided to update");
    }
    let user;
    try{
        user=await User.findOne({_id:userId}).populate('cart.id');
        if(!user){
            throw new ErrorHandler(400,"User not found while updating cart");
        }
    }catch(err){
        throw new ErrorHandler(500,"Error while accessing user from db while updating the cart");
    }

    user.cart=cart;
    await user.save();
    user=await User.findOne({_id:userId});
    res.status(200).json({cart:user.cart});
})

module.exports.postCartBuy=ErrorWrapper(async (req,res,next)=>{
    const {cart,userId}=req.body;
    console.log(cart);
    let user;
    try{
        user=await User.findOne({_id:userId});
        if(!user){
            throw new ErrorHandler(400,"User not found while cart buy");
        }
    }catch(err){
        throw new ErrorHandler(500,"Can't access db right now while cart buy");
    }
    try{
        const session=await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items: cart.map((item) => ({
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name: item.id.name
                  },
                  unit_amount: item.id.price * 100
                },
                quantity: item.quantity
              })),
            mode:'payment',
            success_url:`http://localhost:4000/payment/success`,
            cancel_url:`http://localhost:4000/payment/failed`
        })

        //now load the items to the order:
        //and empty the cart

        if(session.id){
            user.cart=[];
            cart.forEach((item)=>{
                user.orders.push({
                    id:item.id._id,
                    quantity:item.quantity
                })
            })
            await user.save();
        }

        user=await User.findOne({_id:userId}).populate('cart.id orders.id');
        res.status(200).json({id:session.id,user});
    }catch(err){
        throw new ErrorHandler(500,"Error while creating checkout sessions");
    }
})