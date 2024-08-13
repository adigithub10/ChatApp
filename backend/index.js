const express = require('express');
const connectDB = require('./Models/db'); // Adjust the path as necessary
const authRouter = require('./Routes/Auth');
const {messageRouter} = require('./Routes/messageroute');
const {UserRouter} = require('./Routes/UserRoute');
const cookieParser = require('cookie-parser');
// Adjust the path as necessary

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',UserRouter)
// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
