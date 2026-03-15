import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function makeNewSlug(slug: string): string {
  return slug.replace(/&/g, '-and-').replace(/-{2,}/g, '-').replace(/^-|-$/g, '')
}

async function findUniqueSlug(
  baseSlug: string,
  existingSlugs: Set<string>,
  currentSlug: string
): Promise<string> {
  if (!existingSlugs.has(baseSlug) || baseSlug === currentSlug) {
    return baseSlug
  }
  let suffix = 2
  while (existingSlugs.has(`${baseSlug}-${suffix}`)) {
    suffix++
  }
  return `${baseSlug}-${suffix}`
}

async function fixStores() {
  const storesWithAmpersand = await prisma.store.findMany({
    where: { slug: { contains: '&' } },
  })

  if (storesWithAmpersand.length === 0) {
    console.log('No stores with & in slug found.')
    return
  }

  console.log(`Found ${storesWithAmpersand.length} store(s) with & in slug:`)

  // Get all existing slugs for conflict checking
  const allStoreSlugs = await prisma.store.findMany({ select: { slug: true } })
  const existingSlugs = new Set(allStoreSlugs.map((s) => s.slug))

  for (const store of storesWithAmpersand) {
    const baseNewSlug = makeNewSlug(store.slug)
    const newSlug = await findUniqueSlug(baseNewSlug, existingSlugs, store.slug)
    const preservedOldSlug = store.oldSlug ?? store.slug

    console.log(`  Store "${store.name}": "${store.slug}" → "${newSlug}" (oldSlug: "${preservedOldSlug}")`)

    await prisma.store.update({
      where: { id: store.id },
      data: {
        slug: newSlug,
        oldSlug: preservedOldSlug,
      },
    })

    // Update the slug set to reflect the change
    existingSlugs.delete(store.slug)
    existingSlugs.add(newSlug)
  }
}

async function fixCategories() {
  const categoriesWithAmpersand = await prisma.category.findMany({
    where: { slug: { contains: '&' } },
  })

  if (categoriesWithAmpersand.length === 0) {
    console.log('No categories with & in slug found.')
    return
  }

  console.log(`Found ${categoriesWithAmpersand.length} category(ies) with & in slug:`)

  // Get all existing slugs for conflict checking
  const allCategorySlugs = await prisma.category.findMany({ select: { slug: true } })
  const existingSlugs = new Set(allCategorySlugs.map((c) => c.slug))

  for (const category of categoriesWithAmpersand) {
    const baseNewSlug = makeNewSlug(category.slug)
    const newSlug = await findUniqueSlug(baseNewSlug, existingSlugs, category.slug)
    // @ts-ignore oldSlug may not be on type yet before generate
    const preservedOldSlug = (category as any).oldSlug ?? category.slug

    console.log(`  Category "${category.name}": "${category.slug}" → "${newSlug}" (oldSlug: "${preservedOldSlug}")`)

    await prisma.category.update({
      where: { id: category.id },
      data: {
        slug: newSlug,
        oldSlug: preservedOldSlug,
      },
    })

    existingSlugs.delete(category.slug)
    existingSlugs.add(newSlug)
  }
}

async function main() {
  console.log('=== Fix Ampersand Slugs ===')
  console.log('Connecting to database...')

  await fixStores()
  await fixCategories()

  console.log('\nDone.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
