// apps/nextapp/src/app/page.tsx
// app/page.tsx (Root page)
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth/options';

export default async function RootPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  redirect('/home');
}