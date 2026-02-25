import type { Product, ProductsRequestResponse } from '@/types/product';
import { BASE_API } from './base';

export async function getAllProducts({ limit = 12, skip = 0 }): Promise<ProductsRequestResponse> {
  const params = new URLSearchParams();
  params.set('limit', String(limit));
  params.set('skip', String(skip));

  const res = await fetch(`${BASE_API}/products?${params.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  return res.json();
}

export async function getProductsByCategory(category: string) {
  const res = await fetch(`${BASE_API}/products/category/${category}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export async function searchProducts(searchQuery: string): Promise<ProductsRequestResponse> {
  const res = await fetch(`${BASE_API}/products/search?q=${searchQuery}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to search products');
  }

  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_API}/products/${id}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}
