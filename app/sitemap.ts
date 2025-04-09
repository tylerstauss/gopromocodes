import { prisma } from '@/lib/prisma'

export default async function sitemap() {
  const baseUrl = 'https://www.gopromocodes.com'

  // Static routes
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/stores`, lastModified: new Date() },
    { url: `${baseUrl}/newest`, lastModified: new Date() },
    { url: `${baseUrl}/search`, lastModified: new Date() },
    { url: `${baseUrl}/submit`, lastModified: new Date() },
    { url: `${baseUrl}/newsletter`, lastModified: new Date() }
  ]

  // Get all active stores
  const stores = await prisma.store.findMany({
    where: { active: true },
    select: {
      slug: true,
      updatedAt: true
    }
  })

  // Get all categories
  const categories = await prisma.category.findMany({
    select: {
      slug: true,
      updatedAt: true
    }
  })

  // Get all active promo codes
  const promoCodes = await prisma.promoCode.findMany({
    where: { 
      approved: true,
      expires: {
        gte: new Date()
      }
    },
    select: {
      id: true,
      updatedAt: true
    }
  })

  // Generate store routes
  const storeRoutes = stores.map(store => ({
    url: `${baseUrl}/stores/${store.slug}`,
    lastModified: store.updatedAt
  }))

  // Generate category routes
  const categoryRoutes = categories.map(category => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: category.updatedAt
  }))

  // Generate promo code routes
  const promoCodeRoutes = promoCodes.map(code => ({
    url: `${baseUrl}/promocodes/${code.id}`,
    lastModified: code.updatedAt
  }))

  // Combine all routes
  return [
    ...staticRoutes,
    ...storeRoutes,
    ...categoryRoutes,
    ...promoCodeRoutes
  ]
} 