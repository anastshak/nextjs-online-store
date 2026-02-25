'use cache';

import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

import { getCategories } from '@/lib/api/categories';

import type { Category } from '@/types/product';

export default async function CategoriesSidebar() {
  const categories = await getCategories();

  return (
    <Sidebar className="h-[calc(100vh-88px)] top-[88px] border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2.5">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map(({ slug, name }: Category) => (
                <SidebarMenuItem key={slug} className="capitalize">
                  <SidebarMenuButton asChild>
                    <Link href={`/products/${slug}`}>{name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
