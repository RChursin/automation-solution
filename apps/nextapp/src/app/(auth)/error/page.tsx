// src/app/(auth)/error/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid username or password';
      case 'SessionRequired':
        return 'Please sign in to access this page';
      default:
        return 'An error occurred during authentication';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-destructive">
          Authentication Error
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">
          {getErrorMessage(error)}
        </p>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/login">
              Return to Login
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AuthError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}