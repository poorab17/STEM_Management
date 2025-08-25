// const express = require('express');
// const router = express.Router();

// const studentRoutes = require('./studentRoutes');

// // Student routes
// router.use('/students', studentRoutes);

// // Test route
// router.get('/test', (req, res) => {
//   res.json({ message: 'API route working!' });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

const studentRoutes = require('./studentRoutes');

// Log when /students route is mounted
console.log('Mounting /students route');
router.use('/students', studentRoutes);

// Test route
router.get('/test', (req, res) => {
  console.log('GET /api/test called');
  res.json({ message: 'API route working!' });
});

module.exports = router;
