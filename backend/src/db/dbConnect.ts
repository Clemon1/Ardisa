import mongoose from "mongoose";

// MongoDB Database configuration
export const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("Connected to DB");
  } catch (err: any) {
    console.log(err.message);
  }
};
