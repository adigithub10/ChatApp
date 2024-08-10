const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
let jwtToken = require('../utils/jwtToken');
// Import the User model
// Ensure bcrypt is imported if used

const userRegister = async (req, res) => {
    try {
        const { username, email, password, gender, profilepic } = req.body;

        // Check if user exists
        let user = await User.findOne({ username, email });

        if (user) { 
            return res.status(400).json("User already registered");
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 12);

        // Set default profile pictures
        const profileboy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profilegirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create a new user
        const newUser = new User({ 
            username, 
            email, 
            password: hashPassword, 
            gender,
            profilePic: gender === "Male" ? profileboy : profilegirl
        });

        // Save the new user to the database
        await newUser.save();
        jwtToken=jwtToken(newUser._id,res);


        // Send response
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            err: err.message
        });
    }
};
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });


  	    if (!user) { 		 	    
             return res.status(400).json("User not found"); }
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json("Invalid credentials");
        }
        
        jwtToken=jwtToken(user._id,res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            message: "Login Success"
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            err: err.message
        });
    };
};
const userLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: "Logged out"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            err: err.message
        });
    }
}

module.exports = { userRegister, userLogin ,userLogout};
