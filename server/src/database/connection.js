import mongoose from "mongoose";
import { configKeys } from "../config.js";

const connectToDb = () => {
  try {
    mongoose.connect(configKeys.DB_URL, { dbName: configKeys.DB_NAME });
    console.log(`Database connected successfully`);
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

export default connectToDb;
