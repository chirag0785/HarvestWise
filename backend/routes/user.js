const express=require('express');
const router=express.Router();
const { postSignup, postLogin, postLogout, patchUpdateUserInfo, getUserInfo, getInventoryItems, getUserOnRefresh, postAddReview, editReview } = require('../controllers/user');
const upload = require('../utils/multer');
router.post('/signup',upload.single('file'),postSignup);

router.post('/login',postLogin);

router.post('/logout',postLogout);

router.patch('/update/:usernameId',patchUpdateUserInfo);

router.get('/items',getInventoryItems);
router.get('/getUser/:id',getUserInfo);
router.get('/refresh',getUserOnRefresh);

router.post('/addreview',upload.array('files',6),postAddReview);

router.post('/editreview',editReview);
module.exports=router;