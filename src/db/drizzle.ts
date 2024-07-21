import { config } from "dotenv";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: ".env.local" });

const sql = neon(process.env.DB_CONNECTION_URL!);
export const db = drizzle(sql);
