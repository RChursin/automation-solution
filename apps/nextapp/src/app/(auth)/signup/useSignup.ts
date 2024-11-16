// apps/nextapp/src/app/(auth)/signup/useSignup.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '../../../lib/auth/utils';

/**
 * Custom hook for handling signup functionality.
 * Provides state management, validation, and communication with the backend.
 *
 * returns {object} - Contains state variables, handlers, and methods for signup:
 * - username, setUsername
 * - email, setEmail
 * - password, setPassword
 * - confirmPassword, setConfirmPassword
 * - error
 * - isLoading
 * - suggestions
 * - handleSignup
 */
export function useSignup() {
  const router = useRouter(); // Used for navigation after successful signup
  const [username, setUsername] = useState(''); // State for the username input field
  const [email, setEmail] = useState(''); // State for the email input field
  const [password, setPassword] = useState(''); // State for the password input field
  const [confirmPassword, setConfirmPassword] = useState(''); // State for the password confirmation field
  const [error, setError] = useState(''); // Holds error messages from validation or backend responses
  const [isLoading, setIsLoading] = useState(false); // Indicates whether the signup request is in progress
  const [suggestions, setSuggestions] = useState<string[]>([]); // Holds suggested usernames if the selected one is unavailable

  /**
   * Handles form submission for signup.
   * Validates inputs and sends a request to the backend for account creation.
   *
   * param {React.FormEvent} e - The form submission event.
   * returns {Promise<void>}
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (isLoading) return; // Prevent multiple submissions while loading

    setIsLoading(true);
    setError(''); // Clear previous errors
    setSuggestions([]); // Clear previous username suggestions

    try {
      // Validate password requirements
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]{2,})[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters, include at least one uppercase letter, and two special symbols (e.g., "!@#").');
      }

      // Validate password match
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      // Validate username length
      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters.');
      }

      // Validate email format
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please provide a valid email address.');
      }

      // Send signup request to the backend
      const result = await signup(username, email, password);

      if (result.success) {
        // Navigate to home page upon successful signup
        router.push('/home');
        location.reload();
      } else {
        // Handle errors and display suggestions for username
        if (result.error === 'Username already exists' && result.suggestions) {
          setSuggestions(result.suggestions); // Update suggestions state
        }
        throw new Error(result.error || 'Signup failed.');
      }
    } catch (error) {
      // Set error message
      setError((error as Error).message);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return {
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
  };
}