import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";
dotenv.config();

export const turso = createClient({
  // url: process.env.TURSO_DATABASE_URL!,
  url:
    process.env.NODE_ENV === "production"
      ? process.env.TURSO_DATABASE_URL!
      : "http://127.0.0.1:8080",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso);
