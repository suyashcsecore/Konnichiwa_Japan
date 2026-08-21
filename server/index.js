const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const garbageRoutes = require('./routes/garbageRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Mount User Routes
app.use('/api/users', userRoutes);
app.use('/api/garbage', garbageRoutes);

// Database connection
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Konnichiwa Japan API is running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
