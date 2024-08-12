const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL; // Your MongoDB connection URL

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

module.exports =  connectDB ;