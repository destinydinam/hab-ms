import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config();

export default defineConfig({
  schema: "db/schema.ts",
  out: "drizzle",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    // url: process.env.TURSO_DATABASE_URL!,
    url:
      process.env.NODE_ENV === "production"
        ? process.env.TURSO_DATABASE_URL!
        : "http://127.0.0.1:8080",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
  verbose: process.env.NODE_ENV === "production" ? false : true,
  strict: process.env.NODE_ENV === "production" ? false : true,
});
