// apps/nextapp/src/app/(auth)/login/useLogin.ts
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * Custom hook for managing login functionality.
 *
 * Returns:
 *  - email, password: Controlled input values for the login form.
 *  - setEmail, setPassword: Functions to update email and password.
 *  - error: Error message if login fails.
 *  - isLoading: Boolean indicating loading state.
 *  - handleLogin: Function to handle login submission.
 */
export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles login form submission.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/home',
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push('/home');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    error,
    isLoading,
    handleLogin,
  };
}
