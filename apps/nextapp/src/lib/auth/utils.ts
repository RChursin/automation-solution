// apps/nextapp/src/lib/auth/utils.ts
import { signIn, signOut } from 'next-auth/react';

export async function signup(username: string, email: string, password: string) {
  try {
    // First, create the user
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    // If signup successful, automatically sign in
    const result = await signIn('credentials', {
      username,
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message || 'An unexpected error occurred'
    };
  }
}

export async function logout() {
  try {
    await signOut({ redirect: true, callbackUrl: '/login' });
  } catch (error) {
    console.error('Logout failed:', error);
  }
}