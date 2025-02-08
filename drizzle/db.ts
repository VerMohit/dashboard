import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';

config();

const sql = neon(process.env.DATABASE_URL!);   // Use the connection string from .env
export const db = drizzle({ client: sql });    // Initialize Drizzle ORM with Neon Postgres client
