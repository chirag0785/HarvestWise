const express=require('express');
const { postAddInventoryItem } = require('../controllers/admin');
const upload = require('../utils/multer');
const router=express.Router();

router.post('/add-item',upload.single('file'),postAddInventoryItem);

module.exports=router;