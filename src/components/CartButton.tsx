'use client';

import { ShoppingBag, Trash2 } from 'lucide-react';

import { useCartStore } from '@/lib/stores/cart.store';

import ActionButton from './common/ActionButton';

interface CartButtonProps {
  id: number;
  price: number;
  mode: 'basic' | 'full';
}

export default function CartButton({ id, price, mode = 'basic' }: CartButtonProps) {
  const amount = useCartStore((s) => s.items.find((item) => item.productId === id)?.amount ?? 0);
  const increase = useCartStore((s) => s.increaseAmount);
  const decrease = useCartStore((s) => s.decreaseAmount);

  return (
    <ActionButton
      size={mode === 'basic' ? 'icon' : 'default'}
      active={amount > 0}
      activeClassName="text-green-600"
      className={mode === 'basic' ? 'rounded-full bg-white/90 hover:bg-white' : ''}
      onClick={() => (amount > 0 ? decrease(id) : increase(id, price))}
    >
      {amount > 0 ? <Trash2 /> : <ShoppingBag />}
      {mode === 'full' && <>{amount > 0 ? 'Remove from cart' : 'Add to cart'}</>}
    </ActionButton>
  );
}
