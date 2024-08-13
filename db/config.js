import pg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pg

dotenv.config();
 
const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
  });

// let results = await pool.query('SELECT NOW()');
// console.log(results.rows[0]);

export default pool;

   