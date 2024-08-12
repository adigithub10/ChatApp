const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const dotenv = require('dotenv');   
dotenv.config();

const isLogin = async (req, res, next) => {
    try {
        console.log(req.cookies.token);
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        req.user = user;
        next();
    } catch (error) {
              if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token expired" });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" });
    } else {
      
        return res.status(500).json({ message: "Internal server error", error });
    }
}
}
module.exports = { isLogin };
