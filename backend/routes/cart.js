const express=require('express');
const { postAddToCart, postupdateCart, postCartBuy } = require('../controllers/cart');
const router=express.Router();
router.post('/addToCart',postAddToCart);
router.post('/updatecart',postupdateCart);
router.post('/buy',postCartBuy);
module.exports=router;