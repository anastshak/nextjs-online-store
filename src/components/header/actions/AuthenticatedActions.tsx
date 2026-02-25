'use client';

import Link from 'next/link';

import { Heart, ShoppingBag } from 'lucide-react';

import { useFavoritesStore } from '@/lib/stores/favorites.store';

import UserDropdown from './Dropdown';
import { useCartStore } from '@/lib/stores/cart.store';

const userLinks = [
  { href: '/favorites', icon: Heart, type: 'favorites' },
  { href: '/cart', icon: ShoppingBag, type: 'cart' },
];

export default function AuthenticatedActions() {
  const favoritesCount = useFavoritesStore((s) => s.favoriteIds.length);
  const cartCount = useCartStore((s) => s.items.reduce((sum, item) => sum + item.amount, 0));

  return (
    <>
      {userLinks.map(({ href, icon: Icon, type }) => {
        const count = type === 'favorites' ? favoritesCount : cartCount;

        return (
          <Link
            key={href}
            href={href}
            className="hidden md:flex items-center gap-1 hover:opacity-80"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{count}</span>
          </Link>
        );
      })}

      <UserDropdown />
    </>
  );
}
