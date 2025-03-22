import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { PrismaClient as SourcePrismaClient } from '../../../../../prisma/generated/client-source';
import { migrationStatus, addMigrationLog } from '../migration-status/route';
import { exec } from 'child_process';
import { promisify } from 'util';

// Promisify exec for running commands
const execAsync = promisify(exec);

// Create Prisma clients for source and destination
let sourceDb: SourcePrismaClient | null = null;
let destDb: PrismaClient | null = null;

export async function POST(request: Request) {
  try {
    // Verify the user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !(session.user as any).isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin privileges required.' },
        { status: 403 }
      );
    }

    // Get request body
    const body = await request.json();
    const { tables = ['all'], resetDatabase = false } = body;

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

    // Create Prisma clients
    sourceDb = new SourcePrismaClient({
      datasources: {
        db: {
          url: process.env.HEROKU_DATABASE_URL
        }
      }
    });

    destDb = new PrismaClient();

    // Start migration in a non-blocking way
    performMigration(tables, resetDatabase).catch(error => {
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
    // Update migration status on error
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

async function performMigration(tablesToMigrate: string[], resetDatabase: boolean) {
  addMigrationLog('Starting migration...');
  
  try {
    // Check source database connection
    try {
      await sourceDb?.$connect();
    } catch (error: any) {
      throw new Error(`Failed to connect to source database: ${error.message}`);
    }
    
    // Check destination database connection
    try {
      await destDb?.$connect();
    } catch (error: any) {
      throw new Error(`Failed to connect to destination database: ${error.message}`);
    }
    
    // Reset database if requested
    if (resetDatabase) {
      try {
        await execAsync('npx prisma migrate reset --force');
      } catch (error: any) {
        throw new Error(`Failed to reset database: ${error.message}`);
      }
    }

    // Check available tables in source database
    addMigrationLog('Checking available tables in source database...');
    const tables = await (sourceDb as any).$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    addMigrationLog(`Available tables: ${JSON.stringify(tables)}`);
    
    // Configure tables to migrate
    const migrationFunctions = [
      { name: 'users', migrate: migrateUsers },
      { name: 'categories', migrate: migrateCategories },
      { name: 'stores', migrate: migrateStores },
      { name: 'promo_codes', migrate: migratePromoCodes },
      { name: 'store_blogs', migrate: migrateStoreBlogs },
      { name: 'category_promo_codes', migrate: migrateCategoryPromoCodes },
      { name: 'subscribers', migrate: migrateSubscribers }
    ];
    
    // Filter tables if specified
    const tablesToProcess = tablesToMigrate.includes('all') 
      ? migrationFunctions
      : migrationFunctions.filter(table => tablesToMigrate.includes(table.name));
    
    // Process each table
    for (const table of tablesToProcess) {
      addMigrationLog(`Migrating ${table.name}...`);
      try {
        await table.migrate();
        addMigrationLog(`Migration of ${table.name} completed.`);
      } catch (error: any) {
        addMigrationLog(`Error migrating ${table.name}: ${error.message}`);
      }
    }
    
    // Reset sequence IDs for PostgreSQL
    addMigrationLog('Resetting sequence IDs...');
    await resetSequences();
    
    addMigrationLog('Migration completed');
    migrationStatus.success = true;
  } catch (error: any) {
    migrationStatus.error = error.message;
    addMigrationLog(`Migration failed: ${error.message}`);
    throw error; // Re-throw to be caught by the caller
  } finally {
    // Disconnect from databases
    await sourceDb?.$disconnect();
    await destDb?.$disconnect();
    migrationStatus.inProgress = false;
  }
}

// Migration functions
async function migrateCategories() {
  try {
    const categories = await (sourceDb as any).$queryRaw`
      SELECT * FROM "categories"
    `;
    
    for (const category of categories || []) {
      await (destDb as any).$executeRaw`
        INSERT INTO "Category" (
          id, name, slug, description, "metaKeywords", "metaTitle", "metaDescription", "createdAt", "updatedAt"
        ) VALUES (
          ${category.id}, ${category.name || 'Unnamed Category'}, 
          ${category.slug || `category-${category.id}`}, 
          ${category.description || ''}, ${category.meta_keywords || ''}, 
          ${category.meta_title || ''}, ${category.meta_description || ''}, 
          ${category.created_at}, ${category.updated_at}
        )
      `;
    }
  } catch (error: any) {
    throw error;
  }
}

async function migrateStores() {
  try {
    const stores = await (sourceDb as any).$queryRaw`
      SELECT * FROM "stores"
    `;
    
    for (const store of stores || []) {
      try {
        // Ensure required fields have default values
        const name = store.name || 'Unnamed Store';
        const url = store.url || `https://example.com/${store.id}`;
        const slug = store.slug || `store-${store.id}`;
        const createdAt = store.created_at ? new Date(store.created_at) : new Date();
        const updatedAt = store.updated_at ? new Date(store.updated_at) : new Date();

        await (destDb as any).$executeRaw`
          INSERT INTO "Store" (
            id, name, url, description, active, "userSubmit", "metaKeywords", 
            "metaTitle", "metaDescription", "categoryId", "createdAt", "updatedAt",
            slug, "topStore", "oldSlug", "searchTerms", "networkId", network, 
            domain, "viglinkId", "viglinkGroupId", "viglinkName", paths
          ) VALUES (
            ${store.id}, ${name}, ${url}, 
            ${store.description || ''}, ${store.active || true}, ${store.user_submit || false}, 
            ${store.meta_keywords || ''}, ${store.meta_title || ''}, 
            ${store.meta_description || ''}, ${store.category_id || null}, ${createdAt}, 
            ${updatedAt}, ${slug}, 
            ${store.top_store || false}, ${store.old_slug || ''}, ${store.search_terms || ''}, 
            ${store.network_id || ''}, ${store.network || ''}, ${store.domain || ''}, 
            ${store.viglink_id || null}, ${store.viglink_group_id || null}, ${store.viglink_name || ''}, 
            ${store.paths || ''}
          )
        `;
        addMigrationLog(`Successfully migrated store ${store.id}`);
      } catch (error: any) {
        addMigrationLog(`Error migrating store ${store.id}: ${error.message}`);
        continue;
      }
    }
  } catch (error: any) {
    throw error;
  }
}

async function migratePromoCodes() {
  try {
    const promoCodes = await (sourceDb as any).$queryRaw`
      SELECT * FROM "promo_codes"
    `;
    
    for (const promoCode of promoCodes || []) {
      try {
        // Check if the referenced store exists
        const store = await destDb?.store.findUnique({
          where: { id: promoCode.store_id }
        });

        if (!store) {
          addMigrationLog(`Skipping PromoCode ${promoCode.id} - Store ${promoCode.store_id} not found`);
          continue;
        }

        // Ensure required fields have default values
        const title = promoCode.title || 'Untitled Promo';
        const createdAt = promoCode.created_at ? new Date(promoCode.created_at) : new Date();
        const updatedAt = promoCode.updated_at ? new Date(promoCode.updated_at) : new Date();
        const starts = promoCode.starts ? new Date(promoCode.starts) : new Date();
        const expires = promoCode.expires ? new Date(promoCode.expires) : null;

        await (destDb as any).$executeRaw`
          INSERT INTO "PromoCode" (
            id, "storeId", title, description, starts, code, link, homepage, 
            "freeShipping", "createdAt", "updatedAt", expires, "userSubmit", 
            approved, "orderId"
          ) VALUES (
            ${promoCode.id}, ${promoCode.store_id}, ${title}, 
            ${promoCode.description || ''}, ${starts}, ${promoCode.code || ''}, 
            ${promoCode.link || ''}, ${promoCode.homepage || false}, ${promoCode.free_shipping || false}, 
            ${createdAt}, ${updatedAt}, ${expires}, 
            ${promoCode.user_submit || false}, ${promoCode.approved || false}, ${promoCode.order_id || null}
          )
        `;
        addMigrationLog(`Successfully migrated PromoCode ${promoCode.id}`);
      } catch (error: any) {
        addMigrationLog(`Error migrating PromoCode ${promoCode.id}: ${error.message}`);
        continue;
      }
    }
  } catch (error: any) {
    throw error;
  }
}

async function migrateUsers() {
  try {
    const users = await (sourceDb as any).$queryRaw`
      SELECT * FROM "users"
    `;
    
    for (const user of users || []) {
      // Skip users with missing required fields
      if (!user.username || !user.email) {
        addMigrationLog(`Skipping user ${user.id} - missing required fields`);
        continue;
      }

      // Generate a random password for users without one
      const password = user.password || `migrated_${Math.random().toString(36).slice(-8)}`;
      
      // Ensure dates are valid
      const createdAt = user.created_at ? new Date(user.created_at) : new Date();
      const updatedAt = user.updated_at ? new Date(user.updated_at) : new Date();

      try {
        await (destDb as any).$executeRaw`
          INSERT INTO "User" (
            id, username, email, password, "googleId", "isAdmin", "createdAt", "updatedAt"
          ) VALUES (
            ${user.id}, 
            ${user.username}, 
            ${user.email}, 
            ${password}, 
            ${user.google_id || null}, 
            ${user.is_admin || false}, 
            ${createdAt}, 
            ${updatedAt}
          )
        `;
        addMigrationLog(`Successfully migrated user ${user.id}`);
      } catch (error: any) {
        addMigrationLog(`Error migrating user ${user.id}: ${error.message}`);
        // Continue with next user instead of stopping the entire migration
        continue;
      }
    }
  } catch (error: any) {
    throw error;
  }
}

async function migrateStoreBlogs() {
  try {
    const storeBlogs = await (sourceDb as any).$queryRaw`
      SELECT * FROM "store_blogs"
    `;
    
    for (const blog of storeBlogs || []) {
      try {
        // Check if the referenced store exists
        const store = await destDb?.store.findUnique({
          where: { id: blog.store_id }
        });

        if (!store) {
          addMigrationLog(`Skipping StoreBlog ${blog.id} - Store ${blog.store_id} not found`);
          continue;
        }

        // Ensure required fields have default values
        const createdAt = blog.created_at ? new Date(blog.created_at) : new Date();
        const updatedAt = blog.updated_at ? new Date(blog.updated_at) : new Date();
        const publishDate = blog.publish_date ? new Date(blog.publish_date) : new Date();
        const pubDate = blog.pub_date ? new Date(blog.pub_date) : null;

        await (destDb as any).$executeRaw`
          INSERT INTO "StoreBlog" (
            id, "storeId", "publishDate", post, author, "createdAt", "updatedAt", "pubDate"
          ) VALUES (
            ${blog.id}, ${blog.store_id}, ${publishDate}, ${blog.post || ''}, 
            ${blog.author || 'Unknown'}, ${createdAt}, ${updatedAt}, 
            ${pubDate}
          )
        `;
        addMigrationLog(`Successfully migrated StoreBlog ${blog.id}`);
      } catch (error: any) {
        addMigrationLog(`Error migrating StoreBlog ${blog.id}: ${error.message}`);
        continue;
      }
    }
  } catch (error: any) {
    throw error;
  }
}

async function migrateCategoryPromoCodes() {
  try {
    const categoryPromoCodes = await (sourceDb as any).$queryRaw`
      SELECT * FROM "category_promo_codes"
    `;
    
    for (const categoryPromoCode of categoryPromoCodes || []) {
      // Verify that all required references exist
      const [store, category, promoCode] = await Promise.all([
        destDb?.store.findUnique({ where: { id: categoryPromoCode.store_id } }),
        destDb?.category.findUnique({ where: { id: categoryPromoCode.category_id } }),
        destDb?.promoCode.findUnique({ where: { id: categoryPromoCode.promo_code_id } })
      ]);

      // Skip if any required reference is missing
      if (!store || !category || !promoCode) {
        addMigrationLog(`Skipping CategoryPromoCode ${categoryPromoCode.id} - missing references`);
        continue;
      }

      await (destDb as any).$executeRaw`
        INSERT INTO "CategoryPromoCode" (
          id, "categoryId", "promoCodeId", "storeId", "createdAt", "updatedAt"
        ) VALUES (
          ${categoryPromoCode.id}, ${categoryPromoCode.category_id}, 
          ${categoryPromoCode.promo_code_id}, ${categoryPromoCode.store_id}, 
          ${categoryPromoCode.created_at}, ${categoryPromoCode.updated_at}
        )
      `;
    }
  } catch (error: any) {
    throw error;
  }
}

async function migrateSubscribers() {
  try {
    const subscribers = await (sourceDb as any).$queryRaw`
      SELECT * FROM "subscribers"
    `;
    
    for (const subscriber of subscribers || []) {
      await (destDb as any).$executeRaw`
        INSERT INTO "Subscriber" (
          id, email, active, "createdAt", "updatedAt"
        ) VALUES (
          ${subscriber.id}, ${subscriber.email}, ${subscriber.active}, 
          ${subscriber.created_at}, ${subscriber.updated_at}
        )
      `;
    }
  } catch (error: any) {
    throw error;
  }
}

async function resetSequences() {
  try {
    if (!destDb) {
      throw new Error('Destination database client is not initialized');
    }

    const tables = [
      'Blog', 'Category', 'CategoryPromoCode', 'NetworkMerchant',
      'PromoCode', 'Store', 'StoreBlog', 'Subscriber', 'User'
    ];
    
    for (const table of tables) {
      await destDb.$executeRaw`
        SELECT setval(pg_get_serial_sequence(${table}, 'id'), 
        COALESCE((SELECT MAX(id) FROM ${table}), 0) + 1, false);
      `;
    }
  } catch (error: any) {
    throw error;
  }
} 