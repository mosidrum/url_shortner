import { logger } from "../services";
import * as mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING || "");
    logger.info(
      `Database connected: ${connect.connection.host}, ${connect.connection.name}`,
    );
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
