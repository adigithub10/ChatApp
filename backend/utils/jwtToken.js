const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const jwtToken = (id, res) => {
    try {
        // Generate a JWT token
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '15d', // Token expires in 15 days
        });

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days in milliseconds
            httpOnly: true, // Ensures the cookie is only sent over HTTP(S), not client JS
            secure: process.env.NODE_ENV === 'production', // Use secure flag if in production
        });

        return token; // Return the generated token
    } catch (error) {
        console.error('Error generating JWT:', error);
        return null;
    }
};

module.exports = jwtToken;
