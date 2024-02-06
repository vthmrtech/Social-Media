import mongoose from "mongoose";

const conectToDB = async ()  => {
  const url: string = process.env.MONGO_DB || "";
  try {
    return await mongoose.connect(url).then(() =>console.log("Database Connected"))
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
};

export default conectToDB