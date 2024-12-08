/* apps/nextapp/src/app/(auth)/login/page.tsx */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useLogin } from './useLogin';
import Link from 'next/link';
import styles from './login.module.css';
import { useState } from 'react';

export default function Login() {
  const { email, password, setEmail, setPassword, error, isLoading, handleLogin } = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={styles.loginContainer}>
      {/* Add the bg-white/10 utility directly here instead of @apply */}
      <Card className={`${styles.loginCard} bg-white/10`}>
        <CardHeader>
          <CardTitle className={styles.loginTitle}>Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              /* Add bg-white/5 here instead of @apply */
              <div
                role="alert"
                aria-live="polite"
                className={`${styles.errorAlert} bg-white/5`}
              >
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <Input
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="username"
                className={styles.inputField}
              />

              {/* Password Input with Visibility Toggle */}
              <div className="relative">
                <Input
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className={styles.inputField}
                />
                <button
                  type="button"
                  className={styles.visibilityToggle}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                  {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className={`${styles.submitButton} hover:bg-gray-300`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>

            <p className={styles.signUpLink}>
              Don&apos;t have an account?{' '}
              <Link href="/signup" className={`${styles.signUpLinkAnchor} hover:text-gray-400`}>
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
