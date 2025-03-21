import pg from 'pg';
import { config } from 'dotenv';
config();

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log('✅ Connected to PostgreSQL (Neon)'))
  .catch((err) => console.error('❌ Database connection error:', err));

export default client;
