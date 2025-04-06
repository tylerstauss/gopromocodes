import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

interface TableRow {
  tablename: string;
}

async function main() {
  // Create a client for the source database
  const sourceClient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // Create a client for the destination database
  const destClient = new Client({
    connectionString: process.env.HEROKU_DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    // Connect to both databases
    await sourceClient.connect();
    await destClient.connect();

    // Get tables from source database
    const sourceResult = await sourceClient.query<TableRow>('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = \'public\'');
    console.log('Tables in source database:');
    sourceResult.rows.forEach(row => {
      console.log(`- ${row.tablename}`);
    });

    // Get tables from destination database
    const result = await destClient.query<TableRow>('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = \'public\'');
    console.log('\nTables in Heroku database:');
    result.rows.forEach(row => {
      console.log(`- ${row.tablename}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connections
    await sourceClient.end();
    await destClient.end();
  }
}

main(); 