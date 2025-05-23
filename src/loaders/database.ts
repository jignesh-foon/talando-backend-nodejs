import mongoose from "mongoose";
import config from "../config";

export default async () => {
  const connection = await mongoose.connect(config.database.url);
  return connection.connection.db;
};
