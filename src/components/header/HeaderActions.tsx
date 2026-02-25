'use client';

import { useAuthStore } from '@/lib/stores/auth.store';

import AuthenticatedActions from './actions/AuthenticatedActions';
import GuestActions from './actions/GuestActions';

export default function HeaderActions() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? <AuthenticatedActions /> : <GuestActions />}
    </div>
  );
}
