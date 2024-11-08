'use client';

import { useSession } from 'next-auth/react';

export function DebugSession() {
  const { data: session } = useSession();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <pre className="text-xs p-4 bg-muted/50 rounded-lg overflow-auto">
      {JSON.stringify({ session }, null, 2)}
    </pre>
  );
}