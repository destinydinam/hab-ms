import * as dotenv from "dotenv";
import { db } from ".";
import { migrate } from "drizzle-orm/libsql/migrator";

dotenv.config();

(async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
})();
