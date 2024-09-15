import chalk from "chalk";
import mongoose from "mongoose";

import { DATABASE_URL } from "../config/index.js";

if (!DATABASE_URL) throw new Error("DATABASE_URL must be defined");

const options = { connectTimeoutMS: 30000 };

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, options);
    console.log(chalk.whiteBright("Database connection established"));
  } catch (error) {
    console.log(chalk.red("Error connecting to database:"), error.message);
  }
};

export default connectDB;
