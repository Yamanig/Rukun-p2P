import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from '@neondatabase/serverless';
import * as dotenv from "dotenv";

dotenv.config();

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);

    console.log("⏳ Running migrations...");

    const start = Date.now();
    await migrate(db, { migrationsFolder: "src/db/migrations" });
    const end = Date.now();

    console.log(`✅ Migrations completed in ${end - start}ms`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed");
    console.error(error);
    process.exit(1);
  }
};

runMigrate();