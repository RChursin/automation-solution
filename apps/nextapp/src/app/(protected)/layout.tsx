// src/app/(protected)/layout.tsx
import { RootLayout } from '../../components/layouts/root-layout';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth/options';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

// Generic metadata for the protected section
export const metadata: Metadata = {
  title: 'The Source Build',
  description: 'We are here to solve your automation challenges.',
};

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the current user's session without caching the result
  const session = await getServerSession({ ...authOptions, cache: 'no-store' });

  // If no session is found, redirect the user to the login page
  if (!session) {
    redirect('/login');
  }

  // Render the RootLayout component, passing in any nested content (children)
  return <RootLayout>{children}</RootLayout>;
}