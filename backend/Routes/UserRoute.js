const express=require('express');
const router=express.Router();
const {isLogin}=require('../Middleware/isLogin');
const {getUserBySearch}=require('../Controllers/UserController');
const { currentUsers } = require('../Controllers/UserController');

router.get('/search',isLogin,getUserBySearch);
router.get('/currentChatters',isLogin,currentUsers)
module.exports={UserRouter:router};