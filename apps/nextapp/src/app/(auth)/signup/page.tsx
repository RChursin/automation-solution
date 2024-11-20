// apps/nextapp/src/app/(auth)/signup/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Loader2, Eye, EyeOff } from 'lucide-react'; // Icons for password visibility toggle
import { useSignup } from './useSignup';
import Link from 'next/link';
import { useState } from 'react';
import styles from './signup.module.css';

/**
 * Signup Page Component
 * Handles rendering the UI for account creation and integrates with the useSignup hook.
 * Provides features such as input validation, password visibility toggle, and form submission.
 *
 * returns {JSX.Element} - The signup form UI.
 */
export default function Signup(): JSX.Element {
  // Extract state and handlers from the custom useSignup hook
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    isLoading,
    suggestions,
    handleSignup,
  } = useSignup();

  // State for toggling password and confirm password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <div className={styles['signup-container']}>
      {/* Background Animation or Image */}
      <div
        className={styles['signup-background']}
        style={{ backgroundImage: 'url("")' }} // Example background image
      ></div>

      {/* Signup Card */}
      <Card className={styles['signup-card']}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-white">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div
                role="alert"
                aria-live="polite"
                className={styles['error-alert']}
              >
                {error}
              </div>
            )}

            {/* Username Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  Try one of these suggestions:
                </p>
                <ul className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-primary hover:underline"
                      onClick={() => setUsername(suggestion)} // Update username when a suggestion is clicked
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Input Fields */}
            <div className="space-y-4">
              {/* Username Input */}
              <Input
                placeholder="Username*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="username"
                className={styles['input-field']}
                minLength={3}
              />

              {/* Email Input */}
              <Input
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
                className={styles['input-field']}
              />

              {/* Password Input with Toggle */}
              <div className="relative">
                <Input
                  type={isPasswordVisible ? 'text' : 'password'} // Toggle between text and password
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  className={styles['input-field']}
                  minLength={8}
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

              {/* Confirm Password Input with Toggle */}
              <div className="relative">
                <Input
                  type={isConfirmPasswordVisible ? 'text' : 'password'} // Toggle between text and password
                  placeholder="Confirm Password*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  className={styles['input-field']}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-400 hover:text-gray-500"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  aria-label={
                    isConfirmPasswordVisible ? 'Hide password' : 'Show password'
                  }
                >
                  {isConfirmPasswordVisible ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className={styles['submit-button']}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Redirect to Login */}
            <p className="text-sm text-center text-gray-300">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-gray-200 hover:text-gray-400"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}