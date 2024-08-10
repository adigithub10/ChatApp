const express = require('express');
const connectDB = require('./Models/db'); // Adjust the path as necessary
const authRouter = require('./Routes/Auth');

// Adjust the path as necessary

const app = express();
app.use(express.json());
app.use('/api/auth',authRouter)
// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
