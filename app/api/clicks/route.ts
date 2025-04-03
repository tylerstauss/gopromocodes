import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { promoCodeId, storeId } = await request.json();

    if (!promoCodeId || !storeId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create click log entry using raw SQL to ensure correct case
    const clickLog = await prisma.$executeRaw`
      INSERT INTO "ClickLog" ("promoCodeId", "storeId", "timestamp", "date")
      VALUES (${promoCodeId}, ${storeId}, CURRENT_TIMESTAMP, CURRENT_DATE)
      RETURNING *
    `;

    return NextResponse.json(clickLog);
  } catch (error: any) {
    console.error('Error logging click:', error);
    return NextResponse.json(
      { error: 'Failed to log click', details: error.message },
      { status: 500 }
    );
  }
} 