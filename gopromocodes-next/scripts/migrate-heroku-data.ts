import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Parse command line arguments
const isNonInteractive = process.argv.includes('--noninteractive');
const shouldReset = process.argv.includes('--reset');

// Handle --tables argument
let tablesToMigrate: string[] = ['all'];
const tablesArg = process.argv.find(arg => arg.startsWith('--tables='));
if (tablesArg) {
  const tablesList = tablesArg.split('=')[1];
  if (tablesList) {
    tablesToMigrate = tablesList.split(',').filter(Boolean);
  }
}

console.log('Migration configuration:');
console.log(`- Non-interactive mode: ${isNonInteractive ? 'Yes' : 'No'}`);
console.log(`- Reset database: ${shouldReset ? 'Yes' : 'No'}`);
console.log(`- Tables to migrate: ${tablesToMigrate.join(', ')}`);

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.migration');
console.log(`Loading environment from: ${envPath}`);
dotenv.config({ path: envPath });

// Create readline interface for user prompts
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask questions and get responses
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Connect to databases
const sourceDb = new PrismaClient({
  datasources: {
    db: {
      url: process.env.HEROKU_DATABASE_URL
    }
  }
});

const destDb = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function migratePromoCodes() {
  console.log('Migrating promo codes...');
  const promoCodes = await sourceDb.promoCode.findMany();
  
  let count = 0;
  for (const promoCode of promoCodes) {
    try {
      // Using UncheckedCreateInput to bypass the required relations
      // This is more appropriate for data migration
      const data = {
        id: promoCode.id,
        title: promoCode.title || 'Unnamed Promo Code',
        description: promoCode.description,
        code: promoCode.code,
        starts: promoCode.starts ? new Date(promoCode.starts) : new Date(),
        expires: promoCode.expires ? new Date(promoCode.expires) : null,
        link: promoCode.link || '',
        freeShipping: promoCode.freeShipping || false,
        storeId: promoCode.storeId,
        userSubmit: promoCode.userSubmit || false,
        approved: promoCode.approved || false,
        orderId: promoCode.orderId || 0,
        createdAt: new Date(promoCode.createdAt) || new Date(),
        updatedAt: new Date(promoCode.updatedAt) || new Date(),
        homepage: false,
      };
      
      await destDb.promoCode.create({ 
        data: data as any // Using type assertion to bypass TypeScript check during migration
      });
      count++;
    } catch (error) {
      console.log(`Error migrating promo code "${promoCode.title}":`, error);
    }
  }
  
  console.log(`Migrated ${count}/${promoCodes.length} promo codes`);
}

async function migrateCategoryPromoCodes() {
  console.log('Migrating category-promo code relationships...');
  
  try {
    // Get the schema to understand the structure
    const categoryPromoCodes = await sourceDb.categoryPromoCode.findMany();
    
    let count = 0;
    for (const relation of categoryPromoCodes) {
      try {
        // Get the store ID from the promo code
        let storeId;
        try {
          const promoCode = await sourceDb.promoCode.findUnique({
            where: { id: relation.promoCodeId }
          });
          storeId = promoCode?.storeId;
        } catch (error) {
          console.log(`Error finding promo code for relation:`, error);
          continue; // Skip this record if we can't find the promo code
        }
        
        if (!storeId) {
          console.log(`No store ID found for promo code ID ${relation.promoCodeId}, skipping relation`);
          continue;
        }
        
        // Using UncheckedCreateInput
        const data = {
          categoryId: relation.categoryId,
          promoCodeId: relation.promoCodeId,
          storeId: storeId,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        await destDb.categoryPromoCode.create({ 
          data: data as any // Using type assertion for migration
        });
        count++;
      } catch (error) {
        console.log(`Error migrating category-promo code relationship (ID: ${relation.id || 'unknown'}):`, error);
      }
    }
    
    console.log(`Migrated ${count}/${categoryPromoCodes.length} category-promo code relationships`);
  } catch (error) {
    console.error('Error in migrateCategoryPromoCodes:', error);
  }
}