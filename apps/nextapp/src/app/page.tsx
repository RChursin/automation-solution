// apps/nextapp/src/app/page.tsx
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth/options';

export default async function RootPage() {
  // Fetch the current user's session without caching the result
  const session = await getServerSession({ ...authOptions, cache: 'no-store' });
  
  // If no session is found, redirect the user to the login page
  if (!session) {
    redirect('/login');
  }

  // If a session exists, redirect the user to the home page
  redirect('/home');
}