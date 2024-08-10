const express = require('express');
const router = express.Router();
const {User} = require('../Models/UserModel');
const { userRegister,userLogin,userLogout } = require('../Controllers/usercontrol')
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout',userLogout);
module.exports = router;
