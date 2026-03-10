import { prisma } from '@/lib/prisma'

export default async function sitemap() {
  const baseUrl = 'https://www.gopromocodes.com'

  // Static routes
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/stores`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/newest`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
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

  // Generate store routes
  const storeRoutes = stores.map(store => ({
    url: `${baseUrl}/stores/${store.slug}`,
    lastModified: store.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Generate category routes
  const categoryRoutes = categories.map(category => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...storeRoutes,
    ...categoryRoutes,
  ]
}
