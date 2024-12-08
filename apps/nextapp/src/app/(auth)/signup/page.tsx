/* app/(auth)/signup/page.tsx */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useSignup } from './useSignup';
import Link from 'next/link';
import { useState } from 'react';
import styles from './signup.module.css';

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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <div className={styles.signupContainer}>
      {/* Add bg-white/10 here instead of @apply */}
      <Card className={`${styles.signupCard} bg-white/10`}>
        <CardHeader>
          <CardTitle className={styles.signupTitle}>Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              /* No slash-based colors in errorAlert @apply, so we can add any bg if needed */
              <div role="alert" className={`${styles.errorAlert} bg-white/5`}>
                {error}
              </div>
            )}

            {/* Username Input */}
            <div>
              <Input
                placeholder="Username*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => validateField('username')}
                required
                className={`${styles.inputField} ${
                  error === 'Username already exists'
                    ? styles.invalid
                    : username && !error && !validationErrors.username
                    ? styles.valid
                    : ''
                }`}
                minLength={3}
              />
              {error === 'Username already exists' && (
                <p className={styles.validationError}>Username already exists.</p>
              )}
              {suggestions.length > 0 && (
                <div className={styles.suggestionsList}>
                  Try:{' '}
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      /* Add hover:text-gray-200 directly here in JSX */
                      className={`${styles.suggestionItem} hover:text-gray-200`}
                      onClick={() => setUsername(suggestion)}
                    >
                      {suggestion}
                      {index < suggestions.length - 1 ? ', ' : ''}
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
                className={styles.inputField}
              />
              {validationErrors.email && (
                <p className={styles.validationError}>{validationErrors.email}</p>
              )}
            </div>

            {/* Password Input with Toggle */}
            <div className={styles.inputContainer}>
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validateField('password')}
                required
                className={styles.inputField}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className={styles.passwordToggle}
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {validationErrors.password && (
                <p className={styles.validationError}>{validationErrors.password}</p>
              )}
            </div>

            {/* Confirm Password Input with Toggle */}
            <div className={styles.inputContainer}>
              {/* opacity-50 is allowed in JSX. It's a standard class. */}
              <Input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                placeholder="Confirm Password*"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => validateField('confirmPassword')}
                required
                className={`${styles.inputField} opacity-50`}
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className={styles.passwordToggle}
                aria-label={isConfirmPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isConfirmPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {validationErrors.confirmPassword && (
                <p className={styles.validationError}>{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Add hover:bg-gray-300 directly in JSX for the submit button */}
            <Button
              type="submit"
              className={`${styles.submitButton} hover:bg-gray-300`}
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
