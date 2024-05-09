import mongoose from "mongoose";
import "dotenv/config";

async function connectDB() {
  try {
    const MONGODB_URI = process.env.URI;
    await mongoose.connect(MONGODB_URI, {});
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
}

export { connectDB };
