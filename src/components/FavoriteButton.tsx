'use client';

import { Heart, HeartMinus } from 'lucide-react';

import { useFavoritesStore } from '@/lib/stores/favorites.store';

import ActionButton from './common/ActionButton';

interface FavoriteButtonProps {
  id: number;
  mode: 'basic' | 'full';
}

export default function FavoriteButton({ id, mode = 'basic' }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <ActionButton
      size={mode === 'basic' ? 'icon' : 'default'}
      active={isFavorite}
      activeClassName={`text-red-500 ${mode === 'basic' && 'fill-red-500'}`}
      className={mode === 'basic' ? 'rounded-full bg-white/90 hover:bg-white' : ''}
      onClick={() => toggleFavorite(id)}
    >
      {isFavorite ? <HeartMinus /> : <Heart />}
      {mode === 'full' && <>{isFavorite ? 'Unfavorite' : 'Favorite'}</>}
    </ActionButton>
  );
}
