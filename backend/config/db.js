// use mongoose
import mongoose from "mongoose";

// set connectDB to async function that connects to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
