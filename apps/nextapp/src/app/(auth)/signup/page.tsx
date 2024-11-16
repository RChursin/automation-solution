// apps/nextapp/src/app/(auth)/signup/page.tsx
'use client';

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signup } from '../../../lib/auth/utils';
import { Loader2 } from 'lucide-react';

/**
 * Signup component for creating a new account.
 * Handles form input, validation, and submission to the backend.
 * Displays errors and username suggestions if the entered username is unavailable.
 */
export default function Signup() {
  const router = useRouter(); // Used for navigation after signup
  const [username, setUsername] = useState(''); // State for username input
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for password confirmation
  const [error, setError] = useState(''); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // Loading state to prevent duplicate submissions
  const [suggestions, setSuggestions] = useState<string[]>([]); // State for username suggestions

  /**
   * Handles form submission for signup.
   * Validates input and sends data to the backend.
   * Displays errors or navigates to the home page upon success.
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (isLoading) return; // Prevent duplicate submissions

    setIsLoading(true);
    setError(''); // Clear any previous error messages
    setSuggestions([]); // Clear previous username suggestions

    try {
      // Validate password requirements
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]{2,})[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters, include at least one uppercase letter, and two special symbols (e.g., "!@#")');
      }

      // Validate password match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate username length
      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }

      // Validate email format
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please provide a valid email address');
      }

      // Send signup request to the backend
      const result = await signup(username, email, password);

      if (result.success) {
        // Navigate to home page upon successful signup
        router.push('/home');
        location.reload();
      } else {
        // If the username is taken, display suggestions
        if (result.error === 'Username already exists' && result.suggestions) {
          setSuggestions(result.suggestions); // Update suggestions state
        }
        throw new Error(result.error || 'Signup failed');
      }
    } catch (error) {
      // Display error message
      setError((error as Error).message);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
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
              className="p-3 text-sm text-destructive bg-destructive/10 rounded-md"
            >
              {error}
            </div>
          )}

          {/* Username Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">Try one of these:</p>
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
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="username"
              className="bg-background"
              minLength={3}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="email"
              className="bg-background"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="new-password"
              className="bg-background"
              minLength={8}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="new-password"
              className="bg-background"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
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
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}