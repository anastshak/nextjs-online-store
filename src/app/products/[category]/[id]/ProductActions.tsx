'use client';

import FavoriteButton from '@/components/FavoriteButton';
import CartButton from '@/components/CartButton';

import { useAuthStore } from '@/lib/stores/auth.store';

interface ProductActionsProps {
  productId: number;
  price: number;
}

export default function ProductActions({ productId, price }: ProductActionsProps) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  return (
    <div className="flex gap-3 pt-4">
      <FavoriteButton id={productId} mode="full" />
      <CartButton id={productId} price={price} mode="basic" />
    </div>
  );
}
