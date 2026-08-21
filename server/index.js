const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount User Routes
app.use('/api/users', userRoutes);

// Database connection
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Konnichiwa Japan API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
