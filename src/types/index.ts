import { PromoCode } from '@prisma/client';

export type RawPromoCode = PromoCode & {
  store: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  _count: {
    clicks: number;
  };
}; 