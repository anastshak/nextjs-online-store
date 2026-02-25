'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useAuthStore } from '@/lib/stores/auth.store';

import type { Product } from '@/types/product';

import RatingStars from './common/RatingStars';
import FavoriteButton from './FavoriteButton';
import CartButton from './CartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuthStore();

  const { id, title, price, thumbnail, rating, discountPercentage, category } = product;

  const hasDiscount = discountPercentage && discountPercentage > 0;
  const oldPrice = hasDiscount ? (price / (1 - discountPercentage / 100)).toFixed(2) : null;

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
      key={id}
    >
      {hasDiscount && (
        <Badge className="absolute left-3 top-3 z-10 bg-red-600">- {discountPercentage}%</Badge>
      )}

      <div className="relative aspect-square overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {isAuthenticated && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/20">
            <>
              <FavoriteButton id={id} mode="basic" />
              <CartButton id={id} price={price} mode="basic" />
            </>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <CardTitle className="line-clamp-1 text-base font-medium">{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">${price}</span>

              {oldPrice && (
                <span className="text-sm text-muted-foreground line-through">${oldPrice}</span>
              )}
            </div>

            <RatingStars rating={rating} />
          </div>

          {isAuthenticated && <CartButton id={id} price={price} mode="basic" />}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline" size="sm">
          <Link href={`/products/${category}/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
