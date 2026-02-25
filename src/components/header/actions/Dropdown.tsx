'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Heart, ShoppingBag, User, LogOut, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAuthStore } from '@/lib/stores/auth.store';

const menuLinks = [
  { href: '/favorites', icon: Heart, title: 'Favorites' },
  { href: '/cart', icon: ShoppingBag, title: 'Cart' },
  { href: '/profile', icon: User, title: 'Profile' },
];

export default function UserDropdown() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    logout();
    router.push('/login');
  }, [logout, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2 hover:opacity-80">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
            {user?.image ? (
              <Image
                src={user.image}
                alt={`${user.firstName} avatar`}
                width={32}
                height={32}
                className="object-cover"
              />
            ) : (
              <User className="h-4 w-4" />
            )}
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="text-sm font-medium">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-muted-foreground">@{user?.username}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {menuLinks.map(({ href, icon: Icon, title }) => (
          <DropdownMenuItem key={href} asChild>
            <Link href={href} className="cursor-pointer">
              <Icon className="mr-2 h-4 w-4" />
              {title}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
