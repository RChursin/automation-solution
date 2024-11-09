// src/app/(protected)/layout.tsx
// app/(protected)/layout.tsx (Protected layout)
import { RootLayout } from '../../components/layouts/root-layout';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth/options';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return <RootLayout>{children}</RootLayout>;
}