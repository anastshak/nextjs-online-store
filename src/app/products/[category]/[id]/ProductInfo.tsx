import type { Product } from '@/types/product';

import { Badge } from '@/components/ui/badge';

import Title from '@/components/common/Title';
import ProductInfoString from '@/components/common/ProductInfoString';
import RatingStars from '@/components/common/RatingStars';

import ProductActions from './ProductActions';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { id, title, description, price, discountPercentage, rating, stock, brand } = product;

  const hasDiscount = discountPercentage > 0;
  const oldPrice = hasDiscount ? (price / (1 - discountPercentage / 100)).toFixed(2) : null;

  return (
    <div className="space-y-4">
      <Title text={title} />

      <RatingStars rating={rating} />

      {hasDiscount && <Badge className="w-fit bg-red-600">- {discountPercentage}%</Badge>}

      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">${price}</span>
        {oldPrice && <span className="text-muted-foreground line-through">${oldPrice}</span>}
      </div>

      <div className="text-base">
        <ProductInfoString title="brand" info={brand} />
        <ProductInfoString title="stock" info={stock.toString()} />
      </div>

      <ProductActions productId={id} price={price} />

      <p className="pt-4 text-muted-foreground">{description}</p>
    </div>
  );
}
