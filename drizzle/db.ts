import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { Customer } from './schema';

config();

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env');
    process.exit(1);  // Exit if the DATABASE_URL is missing
}


const sql = neon(process.env.DATABASE_URL!);   // Use the connection string from .env
export const db = drizzle({ client: sql });    // Initialize Drizzle ORM with Neon Postgres client
