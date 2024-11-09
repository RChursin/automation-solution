// apps/nextapp/src/app/api/auth/error/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    default: 'An error occurred during authentication',
    Signin: 'Try signing in with a different account',
    OAuthSignin: 'Try signing in with a different account',
    OAuthCallback: 'Try signing in with a different account',
    OAuthCreateAccount: 'Try signing in with a different account',
    EmailCreateAccount: 'Try signing in with a different account',
    Callback: 'Try signing in with a different account',
    OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally',
    EmailSignin: 'Check your email address',
    CredentialsSignin: 'Invalid username or password',
    SessionRequired: 'Please sign in to access this page',
  };

  const errorMessage = error ? errorMessages[error] || errorMessages.default : errorMessages.default;

  return NextResponse.json({ error: errorMessage });
}