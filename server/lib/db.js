// db.js or connectDB.js
import mongoose from "mongoose";

export const connectB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Optional: stop app if DB fails
  }
};
