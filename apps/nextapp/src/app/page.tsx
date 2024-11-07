// apps/nextapp/src/app/page.tsx
'use client';

import { useAuth } from '../lib/auth/utils';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const { session, status } = useAuth();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to Automation Solutions</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Get started by editing your tests or adding new features
      </p>
      {session?.user && (
        <p className="mt-4">
          Logged in as: {session.user.username}
        </p>
      )}
    </div>
  );
}