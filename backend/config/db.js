const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb+srv://keshukumar1909_db_user:Keshu%401234@test.fhbchaz.mongodb.net/assignment_testify?appName=test";
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('Backend is running without a database connection.');
  }
};

module.exports = connectDB;
