const express=require('express');
const router=express.Router();
const {isLogin}=require('../Middleware/isLogin');
const { sendMessage,getMessages } = require('../Controllers/messageroutecontrol');

router.post('/send/:id',isLogin,sendMessage);
router.get('/:id',isLogin,getMessages);
module.exports = { messageRouter: router };