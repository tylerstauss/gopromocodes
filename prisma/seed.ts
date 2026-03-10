import { PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse/sync'
import { readFileSync } from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Hash the password for security
  const password = 'stauss11'
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create admin users
  console.log('Creating admin users...')
  await prisma.user.upsert({
    where: { email: 'tyler.e.stauss@gmail.com' },
    update: {},
    create: {
      email: 'tyler.e.stauss@gmail.com',
      password: hashedPassword, // Using hashed password
      username: 'tyler',
      isAdmin: true
    }
  })
  
  await prisma.user.upsert({
    where: { email: 'alison.stauss@gmail.com' },
    update: {},
    create: {
      email: 'alison.stauss@gmail.com',
      password: hashedPassword, // Using same hashed password
      username: 'alison',
      isAdmin: true
    }
  })

  // Seed categories
  console.log('Seeding categories...')
  const categoriesPath = path.join(__dirname, '../../lib/seeds/dc_categories.csv')
  try {
    const categoriesCsv = readFileSync(categoriesPath, 'utf-8')
    const categories = parse(categoriesCsv, {
      columns: false,
      skip_empty_lines: true
    })

    for (const row of categories) {
      const slug = row[3].toLowerCase()
      await prisma.category.upsert({
        where: { slug },
        update: {
          name: row[1],
          description: row[6],
          metaTitle: row[9],
          metaDescription: row[8],
          metaKeywords: row[7]
        },
        create: {
          name: row[1],
          description: row[6],
          metaTitle: row[9],
          metaDescription: row[8],
          metaKeywords: row[7],
          slug
        }
      })
    }
    console.log('Categories seeded successfully')
  } catch (error) {
    console.error('Error seeding categories:', error)
  }

  // Seed stores
  console.log('Seeding stores...')
  const storesPath = path.join(__dirname, '../../lib/seeds/dc_stores.csv')
  try {
    const storesCsv = readFileSync(storesPath, 'utf-8')
    const stores = parse(storesCsv, {
      columns: false,
      skip_empty_lines: true
    })

    // Get the current maximum store ID
    const maxStore = await prisma.store.findFirst({
      orderBy: {
        id: 'desc'
      }
    });
    let currentId = maxStore ? maxStore.id : 0;

    for (const row of stores) {
      const userSubmit = row[6] === '0'
      const topStore = row[8] === 'yes'
      const slug = row[7].toLowerCase()
      
      currentId++; // Increment the ID for each new store
      
      await prisma.store.upsert({
        where: { slug },
        update: {
          name: row[0],
          url: row[1],
          description: row[2],
          metaTitle: row[5],
          metaDescription: row[4],
          metaKeywords: row[3],
          oldSlug: row[7],
          userSubmit,
          topStore,
          searchTerms: row[9]
        },
        create: {
          id: currentId,
          name: row[0],
          url: row[1],
          description: row[2],
          metaTitle: row[5],
          metaDescription: row[4],
          metaKeywords: row[3],
          slug,
          oldSlug: row[7],
          userSubmit,
          topStore,
          searchTerms: row[9]
        }
      })
    }
    console.log('Stores seeded successfully')
  } catch (error) {
    console.error('Error seeding stores:', error)
  }

  // Skip the promo codes section as the CSV file is not available locally
  console.log('Skipping promo codes seeding as the CSV file is not available locally')

  // Seed store blogs
  console.log('Seeding store blogs...')
  const blogsPath = path.join(__dirname, '../../lib/seeds/store_blogs.csv')
  try {
    const blogsCsv = readFileSync(blogsPath, 'utf-8')
    const blogs = parse(blogsCsv, {
      columns: false,
      skip_empty_lines: true
    })

    let blogCount = 0
    for (const row of blogs) {
      try {
        const store = await prisma.store.findFirst({
          where: { slug: row[2].toLowerCase() }
        })

        if (store && row[1]) {
          const posts = row[1].split(/(\d+\/\d+\/\d{4})/);
          let currentPost = {
            storeId: store.id,
            publishDate: '',
            post: ''
          };

          for (const post of posts) {
            if (post.length <= 10 && post.length > 0) {
              currentPost.publishDate = post;
            } else if (post.length >= 11) {
              currentPost.post = post;
              if (currentPost.publishDate && currentPost.post) {
                try {
                  // Parse date safely
                  const dateComponents = currentPost.publishDate.split('/');
                  if (dateComponents.length === 3 && 
                      !isNaN(parseInt(dateComponents[0])) && 
                      !isNaN(parseInt(dateComponents[1])) && 
                      !isNaN(parseInt(dateComponents[2]))) {
                    
                    const month = parseInt(dateComponents[0]);
                    const day = parseInt(dateComponents[1]);
                    const year = parseInt(dateComponents[2]);
                    
                    // Only create if date is valid
                    if (month > 0 && month <= 12 && day > 0 && day <= 31 && year > 1900) {
                      const pubDate = new Date(year, month - 1, day);
                      
                      await prisma.storeBlog.create({
                        data: {
                          storeId: currentPost.storeId,
                          publishDate: currentPost.publishDate,
                          post: currentPost.post,
                          author: 'Tyler',
                          pubDate
                        }
                      });
                      
                      blogCount++;
                    }
                  }
                } catch (dateError) {
                  console.error('Invalid date format:', currentPost.publishDate);
                }
                
                currentPost = {
                  storeId: store.id,
                  publishDate: '',
                  post: ''
                };
              }
            }
          }
        }
      } catch (error) {
        console.error('Error processing blog row:', error);
        // Continue with next blog entry
      }
    }
    console.log(`Store blogs seeded successfully (${blogCount} blogs added)`)
  } catch (error) {
    console.error('Error seeding store blogs:', error)
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 