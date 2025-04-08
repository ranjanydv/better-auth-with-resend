import 'dotenv/config';
import type { Config } from "drizzle-kit"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
	dialect: "postgresql",
	schema: ["./src/lib/db/schemas/*.ts"],
	out: "./drizzle/migrations",
	verbose: true,
	dbCredentials: {
		url: process.env.DATABASE_URL as string,
	},
	strict: true,
}) satisfies Config
