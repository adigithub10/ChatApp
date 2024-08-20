const express = require('express');
const connectDB = require('./Models/db'); // Adjust the path as necessary
const authRouter = require('./Routes/Auth');
const {messageRouter} = require('./Routes/messageroute');
const {UserRouter} = require('./Routes/UserRoute');
const cookieParser = require('cookie-parser');
const cors=require('cors');
// Adjust the path as necessary

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',UserRouter)
// Connect to MongoDB
connectDB();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React frontend URL
  methods: 'GET,POST', // Specify allowed methods
  allowedHeaders: 'Content-Type,Authorization' // Specify allowed headers
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
