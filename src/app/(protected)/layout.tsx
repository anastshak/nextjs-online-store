import { requireAuth } from '@/lib/helpers/require-auth';

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();

  return <>{children}</>;
}
