/**
 * Scrape Promo Codes from gopromocodes.com
 * 
 * This script extracts promo codes from gopromocodes.com and saves them to a CSV file.
 * It requires the following packages: puppeteer, axios, cheerio
 * 
 * To install dependencies:
 * npm install puppeteer axios cheerio
 * 
 * To run:
 * node scripts/scrape-promocodes.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const OUTPUT_FILE = path.join(__dirname, '../data/promocodes.csv');
const JSON_OUTPUT_FILE = path.join(__dirname, '../data/promocodes.json');

// Make sure the data directory exists
if (!fs.existsSync(path.join(__dirname, '../data'))) {
  fs.mkdirSync(path.join(__dirname, '../data'));
}

// Function to scrape a single store page
async function scrapeStorePage(url) {
  try {
    console.log(`Scraping ${url}...`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const promocodes = [];
    
    // Find all promo code elements
    $('.promo-code-list .promo-code').each((index, element) => {
      const title = $(element).find('.promo-description h4').text().trim();
      const description = $(element).find('.promo-description p').text().trim();
      const code = $(element).find('.promo-code-container .promo-code-text').text().trim();
      
      // Get expiration date if available
      let expires = $(element).find('.expiration-date').text().trim();
      expires = expires.replace('Expires: ', '').trim();
      
      // Get the link
      const link = $(element).find('a.promo-code-link').attr('href');
      
      // Get store name from the URL
      const storeSlug = url.split('/').filter(Boolean).pop();
      
      promocodes.push({
        title,
        description,
        code,
        expires,
        link,
        storeSlug
      });
    });
    
    return promocodes;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return [];
  }
}

// Function to get all store URLs
async function getAllStoreUrls() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Visit the stores directory
    await page.goto('https://www.gopromocodes.com/stores');
    await page.waitForSelector('.store-directory');
    
    // Extract all store URLs
    const storeUrls = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('.store-directory a'));
      return links.map(link => link.href);
    });
    
    await browser.close();
    return storeUrls;
  } catch (error) {
    console.error('Error getting store URLs:', error.message);
    return [];
  }
}

// Function to write promo codes to CSV
function writePromoCodesToCSV(promocodes) {
  const headers = 'title,description,code,expires,link,storeSlug\n';
  const csvContent = promocodes.map(promo => {
    return [
      `"${promo.title.replace(/"/g, '""')}"`,
      `"${promo.description.replace(/"/g, '""')}"`,
      `"${promo.code.replace(/"/g, '""')}"`,
      `"${promo.expires.replace(/"/g, '""')}"`,
      `"${promo.link.replace(/"/g, '""')}"`,
      `"${promo.storeSlug.replace(/"/g, '""')}"`
    ].join(',');
  }).join('\n');
  
  fs.writeFileSync(OUTPUT_FILE, headers + csvContent);
  console.log(`CSV file saved to ${OUTPUT_FILE}`);
}

// Function to write promo codes to JSON
function writePromoCodesToJSON(promocodes) {
  fs.writeFileSync(JSON_OUTPUT_FILE, JSON.stringify(promocodes, null, 2));
  console.log(`JSON file saved to ${JSON_OUTPUT_FILE}`);
}

// Function to save promo codes to database
async function savePromoCodesToDatabase(promocodes) {
  console.log('Saving promo codes to database...');
  let savedCount = 0;
  
  for (const promo of promocodes) {
    try {
      // Find the store by slug
      const store = await prisma.store.findUnique({
        where: { slug: promo.storeSlug }
      });
      
      if (!store) {
        console.log(`Store not found for slug: ${promo.storeSlug}`);
        continue;
      }
      
      // Parse expires date (MM/DD/YYYY format)
      let expiresDate = null;
      if (promo.expires && promo.expires !== 'N/A') {
        const parts = promo.expires.split('/');
        if (parts.length === 3) {
          // Handle different date formats
          const month = parseInt(parts[0]) || 1;
          const day = parseInt(parts[1]) || 1;
          const year = parseInt(parts[2]) || new Date().getFullYear();
          expiresDate = new Date(year, month - 1, day);
        }
      }
      
      // Check if the promo code already exists
      const existingPromo = await prisma.promoCode.findFirst({
        where: {
          code: promo.code,
          storeId: store.id,
          title: promo.title
        }
      });
      
      if (existingPromo) {
        // Update the existing promo code
        await prisma.promoCode.update({
          where: { id: existingPromo.id },
          data: {
            description: promo.description,
            link: promo.link,
            expires: expiresDate
          }
        });
      } else {
        // Create a new promo code
        await prisma.promoCode.create({
          data: {
            title: promo.title,
            description: promo.description,
            code: promo.code,
            link: promo.link,
            storeId: store.id,
            starts: new Date(),
            expires: expiresDate,
            approved: true,
            userSubmit: false
          }
        });
        
        savedCount++;
      }
    } catch (error) {
      console.error(`Error saving promo code: ${error.message}`);
    }
  }
  
  console.log(`Saved ${savedCount} new promo codes to the database.`);
}

// Main function
async function main() {
  console.log('Starting promo code scraper...');
  
  // Get all store URLs
  const storeUrls = await getAllStoreUrls();
  console.log(`Found ${storeUrls.length} store URLs.`);
  
  // Scrape each store page
  const allPromoCodes = [];
  
  // Process stores in batches to avoid overwhelming the server
  const BATCH_SIZE = 5;
  for (let i = 0; i < storeUrls.length; i += BATCH_SIZE) {
    const batch = storeUrls.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(url => scrapeStorePage(url)));
    
    batchResults.forEach(promocodes => {
      allPromoCodes.push(...promocodes);
    });
    
    console.log(`Scraped ${allPromoCodes.length} promo codes so far...`);
    
    // Delay between batches to be respectful to the server
    if (i + BATCH_SIZE < storeUrls.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Write results to files
  writePromoCodesToCSV(allPromoCodes);
  writePromoCodesToJSON(allPromoCodes);
  
  // Save to database
  await savePromoCodesToDatabase(allPromoCodes);
  
  console.log(`Scraping complete. Found ${allPromoCodes.length} promo codes.`);
}

// Run the script
main()
  .catch(error => {
    console.error('Error in main:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 