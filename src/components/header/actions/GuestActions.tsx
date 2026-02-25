import Link from 'next/link';

import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function GuestActions() {
  return (
    <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/20">
      <Link href="/login">
        <User className=" h-4 w-4" />
        <span className="hidden md:inline">Log In</span>
      </Link>
    </Button>
  );
}
