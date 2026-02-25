import type { Category } from '@/types/product';
import { BASE_API } from './base';

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_API}/products/categories`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  return res.json();
}
