import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@/lib/db/schemas/auth-schema';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL as string,
});

export const db = drizzle(pool, {
	schema
});
