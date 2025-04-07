# Database Migration Tools

This directory contains tools for migrating data between databases.

## Heroku to Local Migration Script

The `migrate-heroku-data.ts` script allows you to migrate data from a Heroku PostgreSQL database to your local Next.js application database.

### Prerequisites

- Node.js installed
- TypeScript installed
- Access to the Heroku database
- Local PostgreSQL database set up

### Setup

1. Copy the `.env.migration.example` file to `.env.migration` in the project root:

   ```bash
   cp .env.migration.example .env.migration
   ```

2. Edit the `.env.migration` file to add your database credentials:

   ```
   HEROKU_DATABASE_URL="postgres://username:password@host:port/database_name"
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   ```

   You can get the Heroku database URL from the Heroku dashboard:
   - Go to your app on Heroku
   - Click on "Resources"
   - Click on your PostgreSQL database
   - Go to "Settings" and view your credentials
   - Use the URI as the `HEROKU_DATABASE_URL`

### Running the Migration

Run the migration script with:

```bash
npm run migrate-data
```

The script will:
1. Connect to both databases
2. Ask for confirmation before proceeding
3. Ask if you want to reset your local database before importing
4. Migrate all data in the right order to maintain referential integrity
5. Reset sequence IDs to prevent conflicts with new data

### Troubleshooting

If you encounter errors:

1. **Database Connection Issues**
   - Make sure your database URLs are correct
   - Verify you have access to the Heroku database
   - Ensure your local database is running

2. **Schema Mismatch**
   - The script assumes your local Prisma schema matches the structure of the data in Heroku
   - If you've made schema changes, you may need to modify the migration script accordingly

3. **Missing Dependencies**
   - Run `npm install` to ensure all dependencies are installed

### Schema Customization

The script is designed to work with your specific Prisma schema. If the schema differs from the assumptions made in the script, you may need to modify the migration functions.

### Safety Considerations

- Always back up your destination database before running migrations
- Consider running a test migration on a non-production database first
- The script includes a confirmation step to prevent accidental data loss 