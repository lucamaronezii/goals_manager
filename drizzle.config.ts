import { defineConfig } from 'drizzle-kit'
import { env } from './src/env.ts'

export default defineConfig({
    schema: "./src/db/schema.ts",
    dialect: 'postgresql',
    out: './migrations',
    dbCredentials: {
        url: env.DATABASE_URL,
        port: 5432,
        host: 'postgres',
        password: 'root'
    },
})