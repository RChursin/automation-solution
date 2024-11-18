// src/app/(auth)/login/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Loader2, Eye, EyeOff } from 'lucide-react'; // Import icons for visibility toggle
import { useLogin } from './useLogin';
import Link from 'next/link';
import styles from './login.module.css';
import { useState } from 'react';

/**
 * Login Page Component
 * Renders the login form with a full-screen background and responsive design.
 */
export default function Login() {
  const { email, password, setEmail, setPassword, error, isLoading, handleLogin } = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility

  return (
    <div className={styles['login-container']}>
      {/* Background Animation or Image */}
      <div
        className={styles['login-background']}
        style={{ backgroundImage: 'url("")' }}
      ></div>

      {/* Login Card */}
      <Card className={styles['login-card']}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-white">
            Login to Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className={styles['error-alert']}
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
                className={styles['input-field']}
              />

              {/* Password Input with Visibility Toggle */}
              <div className="relative">
                <Input
                  type={isPasswordVisible ? 'text' : 'password'} // Toggle between text and password
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className={styles['input-field']}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400 hover:text-gray-500"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                  {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className={styles['submit-button']}
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

            <p className="text-sm text-center text-gray-300">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-gray-200 hover:text-gray-400"
              >
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}