import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { migrationStatus, addMigrationLog } from '../migration-status/route';
import { PrismaClient } from '@prisma/client';

// Create Prisma client for source
const sourceDb = new PrismaClient({
  datasources: {
    db: {
      url: process.env.HEROKU_DATABASE_URL
    }
  }
});

// We'll create the destination client in performMigration based on the environment
let destDb: PrismaClient;

// Store ID mapping to maintain relationships between tables
let storeIdMapping: Record<number, number> = {};

export async function POST(request: Request) {
  try {
    // Verify the user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin privileges required.' },
        { status: 403 }
      );
    }

    // Get request body
    const body = await request.json();
    const { 
      tables = ['all'], 
      resetDatabase = false,
      destinationEnv = 'local'
    } = body;

    // Check if migration is already in progress
    if (migrationStatus.inProgress) {
      return NextResponse.json(
        { error: 'Migration already in progress.' },
        { status: 400 }
      );
    }

    // Reset migration status
    migrationStatus.inProgress = true;
    migrationStatus.lastRun = new Date();
    migrationStatus.logs = [];
    migrationStatus.error = null;
    migrationStatus.success = false;

    // Reset mapping for each migration
    storeIdMapping = {};

    // Start migration in a non-blocking way
    performMigration(tables, resetDatabase, destinationEnv).catch(error => {
      migrationStatus.inProgress = false;
      migrationStatus.error = error.message;
      addMigrationLog(`Migration failed: ${error.message}`);
      console.error('Migration error:', error);
    });

    return NextResponse.json({
      message: 'Migration started',
      statusEndpoint: '/api/admin/migration-status'
    });
  } catch (error: any) {
    migrationStatus.inProgress = false;
    migrationStatus.error = error.message;
    addMigrationLog(`Error: ${error.message}`);
    
    console.error('Error triggering migration:', error);
    return NextResponse.json(
      { error: 'Failed to start migration', details: error.message },
      { status: 500 }
    );
  }
}

// Create a function to get the destination database URL
function getDestinationDbUrl(destinationEnv: string): string {
  switch (destinationEnv) {
    case 'prod':
      return process.env.PROD_DATABASE_URL || '';
    case 'local':
    default:
      return process.env.DATABASE_URL || '';
  }
}

async function performMigration(tables: string[], resetDatabase: boolean, destinationEnv: string) {
  try {
    addMigrationLog('Starting migration process...');
    addMigrationLog(`Tables to migrate: ${tables.join(', ')}`);
    addMigrationLog(`Reset database: ${resetDatabase}`);
    addMigrationLog(`Destination environment: ${destinationEnv}`);

    // Get destination database URL and create client
    const destDbUrl = getDestinationDbUrl(destinationEnv);
    if (!destDbUrl) {
      throw new Error(`No database URL found for environment: ${destinationEnv}`);
    }

    // Create destination database client
    destDb = new PrismaClient({
      datasources: {
        db: {
          url: destDbUrl
        }
      }
    });

    // Log database information (without credentials)
    const sourceUrl = process.env.HEROKU_DATABASE_URL?.replace(/\/\/.*@/, '//[hidden]@').split('?')[0] || 'not set';
    const destUrl = destDbUrl.replace(/\/\/.*@/, '//[hidden]@').split('?')[0] || 'not set';
    addMigrationLog('Database Configuration:');
    addMigrationLog(`- Source: ${sourceUrl}`);
    addMigrationLog(`- Destination (${destinationEnv}): ${destUrl}`);

    // Test database connections
    try {
      await sourceDb.$queryRaw`SELECT 1`;
      addMigrationLog('✓ Source database connection successful');
    } catch (error: any) {
      addMigrationLog(`✗ Source database connection failed: ${error.message}`);
      throw error;
    }

    try {
      await destDb.$queryRaw`SELECT 1`;
      addMigrationLog(`✓ Destination (${destinationEnv}) database connection successful`);
    } catch (error: any) {
      addMigrationLog(`✗ Destination database connection failed: ${error.message}`);
      throw error;
    }

    // Check destination database connection and create schema
    addMigrationLog('Connected to destination database');
    
    if (resetDatabase) {
      addMigrationLog('Resetting destination database...');
      // Drop all tables if they exist
      await destDb.$executeRaw`DROP SCHEMA public CASCADE;`;
      await destDb.$executeRaw`CREATE SCHEMA public;`;
      
      // Push the Prisma schema to create all tables
      addMigrationLog('Creating database schema using Prisma...');
      await destDb.$executeRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
      
      // Use prisma push to create the schema
      const { execSync } = require('child_process');
      
      try {
        execSync(`DATABASE_URL="${destDbUrl}" npx prisma db push --skip-generate`, { stdio: 'inherit' });
        addMigrationLog('Database schema created successfully');
      } catch (error: any) {
        addMigrationLog(`Error creating schema: ${error.message}`);
        throw error;
      }
    }
    
    // Configure tables to migrate
    const migrationFunctions = [
      { name: 'users', migrate: migrateUsers },
      { name: 'categories', migrate: migrateCategories },
      { name: 'stores', migrate: migrateStores },
      { name: 'promo_codes', migrate: migratePromoCodes },
      { name: 'store_blogs', migrate: migrateStoreBlogs },
      { name: 'category_promo_codes', migrate: migrateCategoryPromoCodes },
      { name: 'subscribers', migrate: migrateSubscribers },
      { name: 'click_logs', migrate: migrateClickLogs }
    ];
    
    // Filter tables if specified
    const tablesToProcess = tables.includes('all') 
      ? migrationFunctions
      : migrationFunctions.filter(table => tables.includes(table.name));
    
    // Process each table
    for (const table of tablesToProcess) {
      addMigrationLog(`Migrating ${table.name}...`);
      try {
        await table.migrate();
        addMigrationLog(`Migration of ${table.name} completed`);
      } catch (error: any) {
        addMigrationLog(`Error migrating ${table.name}: ${error.message}`);
        throw error;
      }
    }
    
    addMigrationLog('Migration completed successfully');
    migrationStatus.success = true;
  } catch (error: any) {
    migrationStatus.error = error.message;
    addMigrationLog(`Migration failed: ${error.message}`);
    throw error;
  } finally {
    // Disconnect from databases
    await sourceDb.$disconnect();
    if (destDb) {
      await destDb.$disconnect();
    }
    migrationStatus.inProgress = false;
  }
}

async function checkTableExists(tableName: string) {
  try {
    const result = await sourceDb.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = ${tableName}
      );
    `;
    const exists = Array.isArray(result) && result.length > 0 && result[0].exists;
    addMigrationLog(`Table check - "${tableName}": ${exists ? 'exists' : 'does not exist'}`);
    return exists;
  } catch (error: any) {
    addMigrationLog(`Error checking table "${tableName}": ${error.message}`);
    return false;
  }
}

async function migrateUsers() {
  try {
    const tableName = 'users';
    addMigrationLog(`Starting user migration...`);
    
    const tableExists = await checkTableExists(tableName);
    if (!tableExists) {
      throw new Error(`Table "${tableName}" does not exist in source database`);
    }

    const query = `SELECT * FROM "${tableName}"`;
    const users = await sourceDb.$queryRawUnsafe(query);
    const count = Array.isArray(users) ? users.length : 0;
    addMigrationLog(`Found ${count} users to migrate`);
    
    let successCount = 0;
    let skipCount = 0;
    let firstError = null;
    
    for (const user of (Array.isArray(users) ? users : [])) {
      try {
        // Check if user already exists by username or email
        const existingUser = await destDb.user.findFirst({
          where: {
            OR: [
              { username: user.username },
              { email: user.email }
            ]
          }
        });

        if (existingUser) {
          skipCount++;
          continue;
        }

        await destDb.user.create({
          data: {
            email: user.email,
            username: user.username || '',
            password: user.password_digest || '',
            googleId: user.google_id || null,
            isAdmin: Boolean(user.admin),
            createdAt: new Date(user.created_at),
            updatedAt: new Date(user.updated_at)
          }
        });
        successCount++;
      } catch (error: any) {
        if (!firstError) {
          firstError = error;
          addMigrationLog(`First error encountered: ${error.message}`);
          if (error.meta) {
            addMigrationLog(`Error details: ${JSON.stringify(error.meta, null, 2)}`);
          }
          // Log the problematic record
          addMigrationLog(`Problem record: ${JSON.stringify({
            email: user.email,
            username: user.username,
            // Exclude password for security
            googleId: user.google_id,
            isAdmin: user.admin,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          }, null, 2)}`);
        }
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} users (${skipCount} skipped as already existing)`);
    if (firstError) {
      throw firstError;
    }
  } catch (error: any) {
    addMigrationLog(`Error in migrateUsers: ${error.message}`);
    if (error.meta) {
      addMigrationLog(`Additional error details: ${JSON.stringify(error.meta, null, 2)}`);
    }
    throw error;
  }
}

async function migrateCategories() {
  try {
    const tableName = 'categories';
    addMigrationLog(`Starting categories migration...`);

    const categories = await sourceDb.$queryRawUnsafe(`SELECT * FROM "${tableName}"`);
    const count = Array.isArray(categories) ? categories.length : 0;
    addMigrationLog(`Found ${count} categories to migrate`);
    
    let successCount = 0;
    let firstError = null;
    for (const category of (Array.isArray(categories) ? categories : [])) {
      try {
        await destDb.category.create({
          data: {
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            metaKeywords: category.meta_keywords || '',
            metaTitle: category.meta_title || '',
            metaDescription: category.meta_description || '',
            createdAt: new Date(category.created_at),
            updatedAt: new Date(category.updated_at)
          }
        });
        successCount++;
      } catch (error: any) {
        if (!firstError) {
          firstError = error;
          addMigrationLog(`First error encountered: ${error.message}`);
          if (error.meta) {
            addMigrationLog(`Error details: ${JSON.stringify(error.meta, null, 2)}`);
          }
          addMigrationLog(`Problem record: ${JSON.stringify(category, null, 2)}`);
        }
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} categories`);
    if (firstError) {
      throw firstError;
    }
  } catch (error: any) {
    addMigrationLog(`Error in migrateCategories: ${error.message}`);
    if (error.meta) {
      addMigrationLog(`Additional error details: ${JSON.stringify(error.meta, null, 2)}`);
    }
    throw error;
  }
}

async function migrateStores() {
  try {
    const tableName = 'stores';
    addMigrationLog(`Starting stores migration...`);

    const stores = await sourceDb.$queryRawUnsafe(`SELECT * FROM "${tableName}"`);
    const count = Array.isArray(stores) ? stores.length : 0;
    addMigrationLog(`Found ${count} stores to migrate`);
    
    let successCount = 0;
    let firstError = null;
    for (const store of (Array.isArray(stores) ? stores : [])) {
      try {
        const sourceStoreId = Number(store.id);
        
        // Create the store in the destination database
        const createdStore = await destDb.store.create({
          data: {
            name: store.name,
            url: store.url,
            description: store.description || '',
            active: Boolean(store.active),
            userSubmit: Boolean(store.user_submit),
            metaKeywords: store.meta_keywords || '',
            metaTitle: store.meta_title || '',
            metaDescription: store.meta_description || '',
            categoryId: store.category_id ? Number(store.category_id) : null,
            createdAt: new Date(store.created_at),
            updatedAt: new Date(store.updated_at),
            slug: store.slug,
            topStore: Boolean(store.top_store),
            oldSlug: store.old_slug || '',
            searchTerms: store.search_terms || '',
            networkId: store.network_id || '',
            network: store.network || '',
            domain: store.domain || '',
            viglinkId: store.viglink_id ? Number(store.viglink_id) : null,
            viglinkGroupId: store.viglink_group_id ? Number(store.viglink_group_id) : null,
            viglinkName: store.viglink_name || '',
            paths: store.paths || ''
          }
        });
        
        // Store the mapping between source ID and destination ID
        storeIdMapping[sourceStoreId] = createdStore.id;
        addMigrationLog(`Mapped store ${store.name} from ID ${sourceStoreId} to ${createdStore.id}`);
        
        successCount++;
      } catch (error: any) {
        if (!firstError) {
          firstError = error;
          addMigrationLog(`First error encountered: ${error.message}`);
          if (error.meta) {
            addMigrationLog(`Error details: ${JSON.stringify(error.meta, null, 2)}`);
          }
          addMigrationLog(`Problem record: ${JSON.stringify(store, null, 2)}`);
        }
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} stores`);
    addMigrationLog(`Created ID mapping for ${Object.keys(storeIdMapping).length} stores`);
    if (firstError) {
      throw firstError;
    }
  } catch (error: any) {
    addMigrationLog(`Error in migrateStores: ${error.message}`);
    if (error.meta) {
      addMigrationLog(`Additional error details: ${JSON.stringify(error.meta, null, 2)}`);
    }
    throw error;
  }
}

async function migratePromoCodes() {
  try {
    const tableName = 'promo_codes';
    addMigrationLog(`Starting promo codes migration...`);

    const promoCodes = await sourceDb.$queryRawUnsafe(`SELECT * FROM "${tableName}"`);
    const count = Array.isArray(promoCodes) ? promoCodes.length : 0;
    addMigrationLog(`Found ${count} promo codes to migrate`);
    
    let successCount = 0;
    let skippedCount = 0;
    
    for (const code of (Array.isArray(promoCodes) ? promoCodes : [])) {
      try {
        const sourceStoreId = Number(code.store_id);
        // Get the new store ID from the mapping
        const newStoreId = storeIdMapping[sourceStoreId];
        
        if (!newStoreId) {
          addMigrationLog(`Skipping promo code for store ID ${sourceStoreId} - no mapping found`);
          skippedCount++;
          continue;
        }
        
        await destDb.promoCode.create({
          data: {
            storeId: newStoreId, // Use the new mapped store ID
            title: code.title,
            description: code.description || '',
            starts: new Date(code.starts),
            code: code.code || '',
            link: code.link || '',
            homepage: Boolean(code.homepage),
            freeShipping: Boolean(code.free_shipping),
            createdAt: new Date(code.created_at),
            updatedAt: new Date(code.updated_at),
            expires: code.expires ? new Date(code.expires) : null,
            userSubmit: Boolean(code.user_submit),
            approved: Boolean(code.approved),
            orderId: code.order_id ? Number(code.order_id) : null
          }
        });
        successCount++;
      } catch (error: any) {
        // Skip individual error logs
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} promo codes (${skippedCount} skipped due to missing store mapping)`);
  } catch (error: any) {
    addMigrationLog(`Error in migratePromoCodes: ${error.message}`);
    throw error;
  }
}

async function migrateStoreBlogs() {
  try {
    const tableName = 'store_blogs';
    addMigrationLog(`Using store blogs table: ${tableName}`);

    const storeBlogs = await sourceDb.$queryRawUnsafe(`SELECT * FROM "${tableName}"`);
    const count = Array.isArray(storeBlogs) ? storeBlogs.length : 0;
    addMigrationLog(`Found ${count} store blogs to migrate`);
    
    let successCount = 0;
    let skippedCount = 0;
    
    for (const blog of (Array.isArray(storeBlogs) ? storeBlogs : [])) {
      try {
        const sourceStoreId = Number(blog.store_id);
        // Get the new store ID from the mapping
        const newStoreId = storeIdMapping[sourceStoreId];
        
        if (!newStoreId) {
          addMigrationLog(`Skipping store blog for store ID ${sourceStoreId} - no mapping found`);
          skippedCount++;
          continue;
        }
        
        await destDb.storeBlog.create({
          data: {
            storeId: newStoreId, // Use the new mapped store ID
            publishDate: blog.publish_date ? blog.publish_date.toString() : '',
            post: blog.post,
            author: blog.author || 'Tyler',
            createdAt: new Date(blog.created_at),
            updatedAt: new Date(blog.updated_at),
            pubDate: new Date(blog.pub_date)
          }
        });
        successCount++;
      } catch (error: any) {
        addMigrationLog(`Error migrating store blog ${blog.id}: ${error.message}`);
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} store blogs (${skippedCount} skipped due to missing store mapping)`);
  } catch (error: any) {
    addMigrationLog(`Error in migrateStoreBlogs: ${error.message}`);
    throw error;
  }
}

async function migrateCategoryPromoCodes() {
  try {
    const tableName = 'category_promo_codes';
    addMigrationLog(`Using category-promo code table: ${tableName}`);

    const categoryPromoCodes = await sourceDb.$queryRawUnsafe(`SELECT * FROM "${tableName}"`);
    const count = Array.isArray(categoryPromoCodes) ? categoryPromoCodes.length : 0;
    addMigrationLog(`Found ${count} category promo codes to migrate`);
    
    let successCount = 0;
    let skippedCount = 0;
    
    for (const categoryPromoCode of (Array.isArray(categoryPromoCodes) ? categoryPromoCodes : [])) {
      try {
        const sourceStoreId = Number(categoryPromoCode.store_id);
        // Get the new store ID from the mapping
        const newStoreId = storeIdMapping[sourceStoreId];
        
        if (!newStoreId) {
          addMigrationLog(`Skipping category promo code for store ID ${sourceStoreId} - no mapping found`);
          skippedCount++;
          continue;
        }
        
        await destDb.categoryPromoCode.create({
          data: {
            categoryId: Number(categoryPromoCode.category_id),
            promoCodeId: Number(categoryPromoCode.promo_code_id),
            storeId: newStoreId, // Use the new mapped store ID
            createdAt: new Date(categoryPromoCode.created_at),
            updatedAt: new Date(categoryPromoCode.updated_at)
          }
        });
        successCount++;
      } catch (error: any) {
        addMigrationLog(`Error migrating category promo code ${categoryPromoCode.id}: ${error.message}`);
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} category promo codes (${skippedCount} skipped due to missing store mapping)`);
  } catch (error: any) {
    addMigrationLog(`Error in migrateCategoryPromoCodes: ${error.message}`);
    throw error;
  }
}

async function migrateSubscribers() {
  try {
    const tableName = 'subscribers';
    addMigrationLog(`Using subscribers table: ${tableName}`);

    const subscribers = await sourceDb.$queryRawUnsafe(`SELECT * FROM "${tableName}"`);
    const count = Array.isArray(subscribers) ? subscribers.length : 0;
    addMigrationLog(`Found ${count} subscribers to migrate`);
    
    let successCount = 0;
    let firstError = null;
    for (const subscriber of (Array.isArray(subscribers) ? subscribers : [])) {
      try {
        await destDb.subscriber.create({
          data: {
            id: subscriber.id || crypto.randomUUID(),
            email: subscriber.email,
            name: subscriber.name || null,
            active: Boolean(subscriber.active),
            createdAt: new Date(subscriber.created_at),
            updatedAt: new Date(subscriber.updated_at)
          }
        });
        successCount++;
      } catch (error: any) {
        if (!firstError) {
          firstError = error;
          addMigrationLog(`First error encountered: ${error.message}`);
          if (error.meta) {
            addMigrationLog(`Error details: ${JSON.stringify(error.meta, null, 2)}`);
          }
          addMigrationLog(`Problem record: ${JSON.stringify({
            email: subscriber.email,
            name: subscriber.name,
            active: subscriber.active,
            createdAt: subscriber.created_at,
            updatedAt: subscriber.updated_at
          }, null, 2)}`);
        }
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} subscribers`);
    if (firstError) {
      throw firstError;
    }
  } catch (error: any) {
    addMigrationLog(`Error in migrateSubscribers: ${error.message}`);
    if (error.meta) {
      addMigrationLog(`Additional error details: ${JSON.stringify(error.meta, null, 2)}`);
    }
    throw error;
  }
}

async function migrateClickLogs() {
  try {
    const tableName = 'click_logs';
    addMigrationLog(`Using click logs table: ${tableName}`);

    const clickLogs = await sourceDb.$queryRawUnsafe(`SELECT * FROM "${tableName}"`);
    const count = Array.isArray(clickLogs) ? clickLogs.length : 0;
    addMigrationLog(`Found ${count} click logs to migrate`);
    
    let successCount = 0;
    let skippedCount = 0;
    
    for (const log of (Array.isArray(clickLogs) ? clickLogs : [])) {
      try {
        const sourceStoreId = Number(log.store_id);
        // Get the new store ID from the mapping
        const newStoreId = storeIdMapping[sourceStoreId];
        
        if (!newStoreId) {
          skippedCount++;
          continue; // Skip if no store mapping exists
        }
        
        await destDb.clickLog.create({
          data: {
            promoCodeId: Number(log.promo_code_id),
            storeId: newStoreId, // Use the new mapped store ID
            timestamp: new Date(log.timestamp),
            date: new Date(log.date)
          }
        });
        successCount++;
      } catch (error: any) {
        // Skip individual error logs
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} click logs (${skippedCount} skipped due to missing store mapping)`);
  } catch (error: any) {
    addMigrationLog(`Error in migrateClickLogs: ${error.message}`);
    throw error;
  }
} 