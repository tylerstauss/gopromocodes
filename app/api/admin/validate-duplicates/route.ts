import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { databaseType } = await req.json()
    
    if (!databaseType) {
      return NextResponse.json({ error: 'Database type is required' }, { status: 400 })
    }

    // Get the appropriate database URL
    const databaseUrl = databaseType === 'local' 
      ? process.env.DATABASE_URL
      : process.env.PROD_DATABASE_URL

    if (!databaseUrl) {
      return NextResponse.json(
        { error: `Database URL not found for ${databaseType} database` },
        { status: 400 }
      )
    }

    // Create a new Prisma client with the appropriate database URL
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl
        }
      }
    })

    // Find duplicate promo codes with their details
    const duplicates = await prisma.$queryRaw`
      WITH duplicates AS (
        SELECT 
          "storeId",
          "code",
          "title",
          COUNT(*) as count,
          MIN("createdAt") as oldest_date,
          MAX("createdAt") as newest_date
        FROM "PromoCode"
        GROUP BY "storeId", "code", "title"
        HAVING COUNT(*) > 1
      )
      SELECT 
        d."storeId",
        d."code",
        d."title",
        d.count,
        d.oldest_date,
        d.newest_date,
        s.name as store_name
      FROM duplicates d
      JOIN "Store" s ON s.id = d."storeId"
      ORDER BY d.count DESC, d."storeId", d."code"
    `

    await prisma.$disconnect()

    return NextResponse.json({
      duplicates,
      totalDuplicates: Array.isArray(duplicates) ? duplicates.length : 0
    })
  } catch (error) {
    console.error('Error validating duplicates:', error)
    return NextResponse.json(
      { error: 'An error occurred while validating duplicates' },
      { status: 500 }
    )
  }
} 