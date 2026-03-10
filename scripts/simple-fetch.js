/**
 * Simple Fetch for Promo Codes
 * 
 * This script fetches promo codes from a single store page on gopromocodes.com
 * using only built-in Node.js modules.
 * 
 * To run:
 * node scripts/simple-fetch.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const OUTPUT_FILE = path.join(__dirname, '../data/sample-promocodes.json');

// Function to make an HTTPS request and return the response body
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
      
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to extract promo codes from HTML using simple string operations
function extractPromoCodes(html, storeSlug) {
  const promocodes = [];
  
  // Find promo code blocks
  const promoBlocks = html.split('<div class="promo-code"').slice(1);
  
  for (const block of promoBlocks) {
    try {
      // Extract title
      const titleMatch = block.match(/<h4[^>]*>(.*?)<\/h4>/s);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      // Extract description
      const descMatch = block.match(/<div class="promo-description"[^>]*>.*?<h4[^>]*>.*?<\/h4>.*?<p[^>]*>(.*?)<\/p>/s);
      const description = descMatch ? descMatch[1].trim() : '';
      
      // Extract code
      const codeMatch = block.match(/<div class="promo-code-text"[^>]*>(.*?)<\/div>/s);
      const code = codeMatch ? codeMatch[1].trim() : '';
      
      // Extract expiration date
      const expiresMatch = block.match(/<div class="expiration-date"[^>]*>(.*?)<\/div>/s);
      let expires = expiresMatch ? expiresMatch[1].trim() : '';
      expires = expires.replace('Expires: ', '').trim();
      
      // Extract link
      const linkMatch = block.match(/href="([^"]*)" class="promo-code-link"/);
      const link = linkMatch ? linkMatch[1] : '';
      
      promocodes.push({
        title,
        description,
        code,
        expires,
        link,
        storeSlug
      });
    } catch (error) {
      console.error('Error parsing promo block:', error);
    }
  }
  
  return promocodes;
}

// Main function
async function main() {
  // Sample store URL - you can change this to any store page on gopromocodes.com
  const storeUrl = 'https://www.gopromocodes.com/stores/amazon';
  const storeSlug = storeUrl.split('/').pop();
  
  console.log(`Fetching promo codes from ${storeUrl}...`);
  
  try {
    // Fetch the store page
    const html = await fetchPage(storeUrl);
    
    // Extract promo codes
    const promocodes = extractPromoCodes(html, storeSlug);
    
    console.log(`Found ${promocodes.length} promo codes.`);
    
    // Save to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(promocodes, null, 2));
    console.log(`Saved to ${OUTPUT_FILE}`);
    
    // Save to database
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
            const month = parseInt(parts[0]) || 1;
            const day = parseInt(parts[1]) || 1;
            const year = parseInt(parts[2]) || new Date().getFullYear();
            expiresDate = new Date(year, month - 1, day);
          }
        }
        
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
      } catch (error) {
        console.error(`Error saving promo code: ${error.message}`);
      }
    }
    
    console.log(`Saved ${savedCount} new promo codes to the database.`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
main()
  .catch(error => {
    console.error('Error in main:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 