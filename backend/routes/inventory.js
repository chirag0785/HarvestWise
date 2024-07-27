const express=require('express');
const { getInventoryItemById } = require('../controllers/inventory');
const router=express.Router();
router.get('/item/:itemId',getInventoryItemById);
module.exports=router;