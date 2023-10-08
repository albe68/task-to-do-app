import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const current_dir = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(current_dir, "..", ".env");
dotenv.config({ path: envPath });

export const configKeys = {
  DB_URL: process.env.DATABASE,
  PORT: process.env.PORT,
  DB_NAME:process.env.DB_NAME,
  NODE_ENV:process.env.NODE_ENV
};
