import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { promoCodeId, vote } = await request.json();

    if (!promoCodeId || (vote !== 1 && vote !== -1)) {
      return NextResponse.json(
        { error: 'Invalid request. promoCodeId and vote (1 or -1) are required.' },
        { status: 400 }
      );
    }

    const headersList = headers();
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      'unknown';

    // Upsert vote (one vote per IP per promo code)
    const upsertedVote = await prisma.promoCodeVote.upsert({
      where: {
        promoCodeId_ipAddress: {
          promoCodeId,
          ipAddress: ip,
        },
      },
      update: { vote },
      create: {
        promoCodeId,
        vote,
        ipAddress: ip,
      },
    });

    // Check last 5 votes for this promo code
    const lastFiveVotes = await prisma.promoCodeVote.findMany({
      where: { promoCodeId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { vote: true },
    });

    if (
      lastFiveVotes.length === 5 &&
      lastFiveVotes.every((v) => v.vote === -1)
    ) {
      await prisma.promoCode.update({
        where: { id: promoCodeId },
        data: { approved: false },
      });
    }

    // Return updated counts
    const [upCount, downCount] = await Promise.all([
      prisma.promoCodeVote.count({ where: { promoCodeId, vote: 1 } }),
      prisma.promoCodeVote.count({ where: { promoCodeId, vote: -1 } }),
    ]);

    return NextResponse.json({
      vote: upsertedVote,
      counts: { up: upCount, down: downCount },
    });
  } catch (error: any) {
    console.error('Error recording vote:', error);
    return NextResponse.json(
      { error: 'Failed to record vote', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const promoCodeId = searchParams.get('promoCodeId');

    if (!promoCodeId) {
      return NextResponse.json(
        { error: 'promoCodeId is required' },
        { status: 400 }
      );
    }

    const id = parseInt(promoCodeId, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'promoCodeId must be a number' },
        { status: 400 }
      );
    }

    const [upCount, downCount] = await Promise.all([
      prisma.promoCodeVote.count({ where: { promoCodeId: id, vote: 1 } }),
      prisma.promoCodeVote.count({ where: { promoCodeId: id, vote: -1 } }),
    ]);

    return NextResponse.json({ up: upCount, down: downCount });
  } catch (error: any) {
    console.error('Error fetching votes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch votes', details: error.message },
      { status: 500 }
    );
  }
}
