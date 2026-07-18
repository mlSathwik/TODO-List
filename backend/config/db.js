const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todo-db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Please ensure MongoDB is running locally on your system, or provide a valid MONGO_URI in backend/.env');
    // We will not exit the process immediately so that the server can still run or report errors gracefully.
    throw error;
  }
};

module.exports = connectDB;
