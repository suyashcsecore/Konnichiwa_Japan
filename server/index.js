const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectDB();

const userRoutes = require('./routes/userRoutes');
const garbageRoutes = require('./routes/garbageRoutes');

app.use('/api/users', userRoutes);
app.use('/api/garbage', garbageRoutes);

const healthRoutes = require("./routes/healthRoutes");
app.use("/api/health", healthRoutes);

app.get('/', (req, res) => {
  res.send('Konnichiwa Japan API is running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});