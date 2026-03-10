import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session?.user?.isAdmin) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const promoCodeId = parseInt(params.id);

    // First, verify the promo code exists
    const promoCode = await prisma.promoCode.findUnique({
      where: { id: promoCodeId },
      include: {
        categories: true,
        clicks: true
      }
    });

    if (!promoCode) {
      return new NextResponse('Promo code not found', { status: 404 });
    }

    // Delete all related CategoryPromoCode records
    if (promoCode.categories.length > 0) {
      await prisma.categoryPromoCode.deleteMany({
        where: {
          promoCodeId: promoCodeId
        }
      });
    }

    // Delete all related ClickLog records
    if (promoCode.clicks.length > 0) {
      await prisma.clickLog.deleteMany({
        where: {
          promoCodeId: promoCodeId
        }
      });
    }

    // Finally, delete the promo code
    await prisma.promoCode.delete({
      where: {
        id: promoCodeId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting promo code:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 }
    );
  }

  try {
    const data = await request.json();
    const id = parseInt(params.id);

    // Check for existing promo code with the same storeId, code, and title
    const existingPromoCode = await prisma.promoCode.findFirst({
      where: {
        storeId: data.storeId,
        code: data.code,
        title: data.title,
        NOT: {
          id: id // Exclude the current promo code
        }
      }
    });

    if (existingPromoCode) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'A promo code with this store, code, and title already exists',
          existingPromoCode
        }),
        { status: 400 }
      );
    }

    const updatedPromoCode = await prisma.promoCode.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        code: data.code,
        link: data.link,
        expires: data.expires,
        freeShipping: data.freeShipping,
        approved: data.approved,
      },
    });

    return NextResponse.json(updatedPromoCode);
  } catch (error) {
    console.error('Error updating promo code:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to update promo code' }),
      { status: 500 }
    );
  }
} 