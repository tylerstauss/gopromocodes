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

    // Delete the promo code
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