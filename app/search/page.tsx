import { prisma } from '@/lib/prisma';
import SearchResults from '@/components/SearchResults';

async function getPopularStores() {
  const storesWithClicks = await prisma.$queryRaw<Array<{
    id: number;
    name: string;
    slug: string;
    total_clicks: number;
    recent_clicks: number;
    weighted_clicks: number;
  }>>`
    WITH StoreClicks AS (
      SELECT 
        s.id,
        s.name,
        s.slug,
        COALESCE(SUM(
          CASE 
            WHEN c.date >= CURRENT_DATE - INTERVAL '7 days' THEN 2  -- Recent clicks count double
            WHEN c.date >= CURRENT_DATE - INTERVAL '30 days' THEN 1  -- Older clicks count once
            ELSE 0
          END
        ), 0) as weighted_clicks,
        COUNT(c.id) as total_clicks,
        COUNT(CASE WHEN c.date >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as recent_clicks
      FROM "Store" s
      LEFT JOIN "PromoCode" p ON s.id = p."storeId"
      LEFT JOIN "ClickLog" c ON p.id = c."promoCodeId"
      WHERE s.active = true
      GROUP BY s.id, s.name, s.slug
    )
    SELECT *
    FROM StoreClicks
    ORDER BY 
      weighted_clicks DESC,
      name ASC
    LIMIT 10
  `;

  return storesWithClicks.map(store => ({
    id: store.id,
    name: store.name,
    slug: store.slug,
    clickStats: {
      total: Number(store.total_clicks) || 0,
      recent: Number(store.recent_clicks) || 0,
      weighted: Number(store.weighted_clicks) || 0
    }
  }));
}

async function getPopularCategories() {
  return await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: {
      stores: {
        _count: 'desc'
      }
    },
    take: 10
  });
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || '';
  const [popularStores, popularCategories] = await Promise.all([
    getPopularStores(),
    getPopularCategories()
  ]);

  return (
    <SearchResults 
      query={query}
      popularStores={popularStores}
      popularCategories={popularCategories}
    />
  );
} 