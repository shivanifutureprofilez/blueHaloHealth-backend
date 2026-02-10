import mongoose from "mongoose";

let isConnected = null;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = connection.connections[0].readyState;
    console.log("MongoDB Connected (cached)");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
}

module.exports = {
  connectDB
};
