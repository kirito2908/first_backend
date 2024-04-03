import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(connectionInstance.connection.host);
  } catch (error) {
    console.log(`Database Connection Error : ${error}`);
  }
};

export default connectDB;
