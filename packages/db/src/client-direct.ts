import 'dotenv/config'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

const url = process.env.DATABASE_URL_DIRECT || process.env.DATABASE_URL

if (!url) {
  throw new Error('DATABASE_URL_DIRECT is not set')
}

const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } })
export const dbDirect = drizzle(pool, { schema })
