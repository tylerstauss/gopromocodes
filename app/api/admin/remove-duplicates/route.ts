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

    // Find duplicate promo codes
    const duplicates = await prisma.promoCode.groupBy({
      by: ['storeId', 'code', 'title'],
      having: {
        id: {
          _count: {
            gt: 1
          }
        }
      }
    })

    let deletedCount = 0
    let errorCount = 0

    // Delete duplicates, keeping the newest one
    for (const group of duplicates) {
      const { storeId, code, title } = group
      
      // Get all duplicates for this group
      const groupDuplicates = await prisma.promoCode.findMany({
        where: {
          storeId: Number(storeId),
          code,
          title
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      // Keep the newest one, delete the rest
      const duplicatesToDelete = groupDuplicates.slice(1)
      
      for (const duplicate of duplicatesToDelete) {
        try {
          await prisma.promoCode.delete({
            where: { id: duplicate.id }
          })
          deletedCount++
        } catch (error) {
          console.error(`Error deleting promo code ${duplicate.id}:`, error)
          errorCount++
        }
      }
    }

    await prisma.$disconnect()

    return NextResponse.json({
      message: `Successfully removed ${deletedCount} duplicate promo codes. ${errorCount} errors occurred.`,
      duplicatesFound: duplicates.length,
      deletedCount,
      errorCount
    })
  } catch (error) {
    console.error('Error removing duplicates:', error)
    return NextResponse.json(
      { error: 'An error occurred while removing duplicates' },
      { status: 500 }
    )
  }
} 