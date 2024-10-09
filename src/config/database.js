import mongoose from "mongoose";
import dotenv from 'dotenv'


if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const connectDB = async () => {


  const mongoURI = process.env.MONGODB_URL;
  if (!mongoURI) {
    throw new Error("MongoDB connection string is not defined in environment variables");
  }

  try {
    await mongoose.connect(`${mongoURI}`)
    console.log("Connection to MongoDB established successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error);
  }
};


export default connectDB;
