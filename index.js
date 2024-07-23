require('dotenv/config');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connect = require('./config/Db');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Middleware setup
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(cors());

// Routes setup
app.use('/api/v1', authRoute);   // Authentication routes
app.use('/api/v1/user', userRoute);  // User routes

// Database connection
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Betahouse server is connected and running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

// Default route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Betahouse server is live' });
});

// 404 Route not found handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route does not exist' });
});
