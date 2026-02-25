import NoDataFound from '@/components/common/NoData';
import Title from '@/components/common/Title';
import ProductsGrid from '@/components/ProductsGrid';

import { getProductsByCategory } from '@/lib/api/products';

export default async function ProductsByCategoryPage(props: PageProps<'/products/[category]'>) {
  const { category } = await props.params;
  const data = await getProductsByCategory(category);
  const categoryName = category;

  if (!data?.products?.length) {
    return <NoDataFound />;
  }

  return (
    <>
      <Title text={`${categoryName.replace(/-/g, ' ')}: ${data.products.length}`} />

      <ProductsGrid products={data.products} />
    </>
  );
}
