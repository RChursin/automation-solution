// apps/nextapp/src/lib/auth/utils.ts
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  return { session, status };
}

export async function login(username: string, password: string) {
  try {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    return {
      success: !result?.error,
      error: result?.error,
    };
  } catch {
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

export async function signup(username: string, password: string) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Signup failed',
      };
    }

    // Login after successful signup
    return login(username, password);
  } catch {
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

export async function logout() {
  try {
    await signOut({ redirect: true, callbackUrl: '/auth/login' });
  } catch {
    console.error('Logout failed');
  }
}