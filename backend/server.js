const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const taskRoutes = require('./routes/taskRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Set up CORS
app.use(cors({
  origin: '*', // In development, we can allow all origins or specifically the frontend dev server (e.g. http://localhost:5173)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');

// API Routes
app.use('/api/tasks', taskRoutes);

// Serve Frontend Static Assets
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

// Fallback to React Router Client-Side Routing
app.get('*', (req, res, next) => {
  // If request targets API routes, pass to API 404 handler
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.resolve(frontendDistPath, 'index.html'));
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);


// Connect database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    // Start server anyway on port but with database warning
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (Database Offline)`);
    });
  }
};

startServer();
