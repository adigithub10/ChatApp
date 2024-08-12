const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const jwtToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie('token', token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days in milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure if in production
    });

    return token;
};

module.exports = jwtToken;  // Ensure this is exporting the jwtToken function correctly
