
const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection with error handling
connectDB().then(() => {
  console.log('✅ Database connected successfully');
}).catch((err) => {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
});

// Routes
app.get('/', (req, res) => res.send('API running'));

app.use('/api', routes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
