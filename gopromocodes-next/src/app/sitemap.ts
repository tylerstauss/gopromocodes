import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gopromocodes.com'

  // Get all active stores
  const stores = await prisma.store.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true }
  })

  // Get all categories
  const categories = await prisma.category.findMany({
    select: { slug: true, updatedAt: true }
  })

  // Get all approved promo codes
  const promoCodes = await prisma.promoCode.findMany({
    where: {
      approved: true,
      OR: [
        { expires: { gt: new Date() } },
        { expires: null }
      ]
    },
    select: { id: true, updatedAt: true }
  })

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Store pages
  const storePages = stores.map(store => ({
    url: `${baseUrl}/stores/${store.slug}`,
    lastModified: store.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Category pages
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Promo code pages
  const promoCodePages = promoCodes.map(code => ({
    url: `${baseUrl}/promo-codes/${code.id}`,
    lastModified: code.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...storePages,
    ...categoryPages,
    ...promoCodePages,
  ]
} 