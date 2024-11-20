// apps/nextapp/src/app/(auth)/signup/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useSignup } from './useSignup';
import Link from 'next/link';
import { useState } from 'react';
import styles from './signup.module.css';

/**
 * Signup Page Component
 * Provides a user-friendly signup form with validation, password visibility toggle, and enhanced UI feedback.
 *
 * @returns {JSX.Element} The signup form.
 */
export default function Signup(): JSX.Element {
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
    validationErrors,
    validateField,
  } = useSignup();

  // State for toggling password and confirm password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <div className={styles['signup-container']}>
      {/* Background Animation or Image */}
      <div
        className={styles['signup-background']}
        style={{ backgroundImage: 'url("/background.jpg")' }}
      />

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
            {/* {error && (
              <div role="alert" className={styles['error-alert']}>
                {error}
              </div>
            )} */}

            {/* Username Input with Suggestions */}
            <div>
              <Input
                placeholder="Username*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => validateField('username')}
                required
                className={`${styles['input-field']} ${
                  error === 'Username already exists' ? styles.invalid : 
                  username && !error && !validationErrors.username ? styles.valid : ''
                }`}
                minLength={3}
              />
              {error === 'Username already exists' && (
                <p className={styles['validation-error']}>
                  Username already exists.
                </p>
              )}
              {suggestions.length > 0 && (
                <div className={styles['suggestions-list']}>
                  Try: {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={styles['suggestion-item']}
                      onClick={() => setUsername(suggestion)}
                    >
                      {suggestion}{index < suggestions.length - 1 ? ', ' : ''}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Email Input */}
            <div>
              <Input
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateField('email')}
                required
                className={styles['input-field']}
              />
              {validationErrors.email && (
                <p className={styles['validation-error']}>
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Input with Toggle */}
            <div className={styles['input-container']}>
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validateField('password')}
                required
                className={styles['input-field']}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className={styles['password-toggle']}
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {validationErrors.password && (
                <p className={styles['validation-error']}>
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input with Toggle */}
            <div className={styles['input-container']}>
              <Input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                placeholder="Confirm Password*"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => validateField('confirmPassword')}
                required
                className={styles['input-field']}
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className={styles['password-toggle']}
                aria-label={isConfirmPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isConfirmPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {validationErrors.confirmPassword && (
                <p className={styles['validation-error']}>
                  {validationErrors.confirmPassword}
                </p>
              )}
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
              <Link href="/login" className="text-gray-200 hover:text-gray-400">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
