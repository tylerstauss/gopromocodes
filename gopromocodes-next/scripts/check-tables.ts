const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.migration');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error('Error: .env.migration file not found');
  process.exit(1);
}

async function checkTables() {
  const client = new Client({
    connectionString: process.env.HEROKU_DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Heroku PostgreSQL
  });

  try {
    await client.connect();
    console.log('Connected to Heroku database');

    // Query to list all tables
    const result = await client.query(`
      SELECT tablename 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);

    console.log('Tables in Heroku database:');
    result.rows.forEach(row => {
      console.log(`- ${row.tablename}`);
    });

  } catch (error) {
    console.error('Error querying tables:', error);
  } finally {
    await client.end();
    console.log('Connection closed');
  }
}

checkTables(); 