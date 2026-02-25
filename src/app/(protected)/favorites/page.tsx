'use client';

import { useEffect, useState } from 'react';

import { HeartMinus } from 'lucide-react';

import ActionButton from '@/components/common/ActionButton';
import Title from '@/components/common/Title';
import ProductsGrid from '@/components/ProductsGrid';

import { getProduct } from '@/lib/api/products';
import { useFavoritesStore } from '@/lib/stores/favorites.store';

import type { Product } from '@/types/product';

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadFavorites() {
      setLoading(true);

      if (favoriteIds.length === 0) {
        if (!cancelled) {
          setProducts([]);
          setLoading(false);
        }
        return;
      }

      try {
        const data = await Promise.all(favoriteIds.map((id) => getProduct(String(id))));

        if (!cancelled) {
          setProducts(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [favoriteIds]);

  if (loading) {
    return <div className="py-10 text-center">Loading favorites...</div>;
  }

  if (products.length === 0) {
    return <div className="py-10 text-center">No favorites yet...</div>;
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Title text="Favorites" />

        <ActionButton onClick={clearFavorites} active activeClassName="text-red-600 border-red-200">
          <HeartMinus /> Unfavorite all
        </ActionButton>
      </div>

      <ProductsGrid products={products} />
    </>
  );
}
