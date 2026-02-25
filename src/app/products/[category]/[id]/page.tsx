import { getProduct } from '@/lib/api/products';

import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductReviews from './ProductReviews';

export default async function ProductPage(props: PageProps<'/products/[category]/[id]'>) {
  const { id } = await props.params;
  const product = await getProduct(id);

  return (
    <>
      <div className="flex flex-col items-center md:flex-row gap-10">
        <ProductGallery images={product.images} title={product.title} />
        <ProductInfo product={product} />
      </div>

      <ProductReviews reviews={product.reviews} />
    </>
  );
}
