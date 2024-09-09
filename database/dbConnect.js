import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false; 

export const connectDB = async () => {
  if (isConnected) {
    // console.log("Using cached database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(MONGO_URI);
    isConnected = conn.connections[0].readyState === 1; 
    if (isConnected) {
      console.log("DB Connected");
    }
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw new Error("Database connection failed");
  }
};
