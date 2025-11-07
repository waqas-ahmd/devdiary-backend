import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
