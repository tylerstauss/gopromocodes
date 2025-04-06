import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { migrationStatus, addMigrationLog } from '../migration-status/route';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const AVAILABLE_TABLES = [
  'users',
  'categories',
  'stores',
  'promo_codes',
  'store_blogs',
  'category_promo_codes',
  'subscribers',
  'click_logs'
];

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
    const tablesToMigrate = tables.includes('all') ? AVAILABLE_TABLES : tables;
    addMigrationLog(`Starting migration with tables: ${tablesToMigrate.join(', ')}`);
    addMigrationLog(`Reset database: ${resetDatabase}`);
    addMigrationLog(`Destination: ${destinationEnv}`);

    // Initialize destination database client
    const destDbUrl = getDestinationDbUrl(destinationEnv);
    if (!destDbUrl) {
      throw new Error('Destination database URL not found');
    }

    destDb = new PrismaClient({
      datasources: {
        db: {
          url: destDbUrl
        }
      }
    });

    addMigrationLog('Connected to destination database');

    if (resetDatabase) {
      addMigrationLog('Resetting destination database...');
      
      if (destinationEnv === 'prod') {
        // For production, use a more robust approach
        try {
          // Disable foreign key checks temporarily and drop all tables in public schema
          await destDb.$executeRawUnsafe(`
            DO $$ DECLARE
              r RECORD;
            BEGIN
              -- Disable triggers
              FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' DISABLE TRIGGER ALL';
              END LOOP;
              
              -- Drop all tables
              FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
              END LOOP;
            END $$;
          `);
          addMigrationLog('Successfully reset production database');
        } catch (error: any) {
          addMigrationLog(`Warning: Error during production database reset: ${error.message}`);
          addMigrationLog('Falling back to Prisma CLI for database reset');
          // Use Prisma CLI as fallback
          execSync('DATABASE_URL="' + destDbUrl + '" npx prisma db push --force-reset --skip-generate', { stdio: 'inherit' });
        }
      } else {
        // For local database, we can use a simpler approach
        await destDb.$executeRawUnsafe('DROP SCHEMA IF EXISTS public CASCADE');
        await destDb.$executeRawUnsafe('CREATE SCHEMA public');
        addMigrationLog('Successfully reset local database');
      }

      // Push the schema to create all tables
      execSync('DATABASE_URL="' + destDbUrl + '" npx prisma db push --skip-generate', { stdio: 'inherit' });
      addMigrationLog('Successfully created database schema');
    }

    // Process each table in sequence
    for (const table of tablesToMigrate) {
      addMigrationLog(`Processing table: ${table}`);
      
      switch (table) {
        case 'categories':
          await migrateCategories();
          break;
        case 'stores':
          await migrateStores();
          break;
        case 'promo_codes':
          await migratePromoCodes();
          break;
        case 'store_blogs':
          await migrateStoreBlogs();
          break;
        case 'category_promo_codes':
          await migrateCategoryPromoCodes();
          break;
        case 'subscribers':
          await migrateSubscribers();
          break;
        case 'click_logs':
          await migrateClickLogs();
          break;
        case 'users':
          await migrateUsers();
          break;
        default:
          addMigrationLog(`Unknown table: ${table}`);
      }
    }

    addMigrationLog('Migration completed successfully');
    migrationStatus.success = true;
  } catch (error: any) {
    addMigrationLog(`Migration failed: ${error.message}`);
    throw error;
  } finally {
    migrationStatus.inProgress = false;
    
    // Close database connections
    await sourceDb.$disconnect();
    if (destDb) {
      await destDb.$disconnect();
    }
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

    // Query stores ordered by ID ascending
    const stores = await sourceDb.$queryRawUnsafe(`
      SELECT * FROM "${tableName}"
      ORDER BY id ASC
    `);
    const count = Array.isArray(stores) ? stores.length : 0;
    addMigrationLog(`Found ${count} stores to migrate`);
    
    let successCount = 0;
    let firstError = null;
    for (const store of (Array.isArray(stores) ? stores : [])) {
      try {
        const sourceStoreId = Number(store.id);
        
        // Create the store in the destination database with the original ID
        const createdStore = await destDb.store.create({
          data: {
            id: sourceStoreId, // Preserve the original ID
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
        
        // Store the mapping between source ID and destination ID (they should be the same now)
        storeIdMapping[sourceStoreId] = createdStore.id;
        addMigrationLog(`Migrated store ${store.name} with ID ${sourceStoreId}`);
        
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
    
    for (const code of (Array.isArray(promoCodes) ? promoCodes : [])) {
      try {
        const storeId = Number(code.store_id);
        
        await destDb.promoCode.create({
          data: {
            storeId: storeId, // Use the store ID directly since they match
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
        addMigrationLog(`Error migrating promo code: ${error.message}`);
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} promo codes`);
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
            id: subscriber.id,
            email: subscriber.email,
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
            id: subscriber.id,
            email: subscriber.email,
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
        const storeId = Number(log.store_id);
        
        await destDb.clickLog.create({
          data: {
            promoCodeId: Number(log.promo_code_id),
            storeId: storeId, // Use store ID directly since they match
            timestamp: new Date(log.timestamp),
            date: new Date(log.date)
          }
        });
        successCount++;
      } catch (error: any) {
        addMigrationLog(`Error migrating click log: ${error.message}`);
        skippedCount++;
      }
    }
    addMigrationLog(`Successfully migrated ${successCount}/${count} click logs (${skippedCount} skipped)`);
  } catch (error: any) {
    addMigrationLog(`Error in migrateClickLogs: ${error.message}`);
    throw error;
  }
}