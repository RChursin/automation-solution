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
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  /**
   * Validates individual fields and sets errors.
   *
   * param {string} field - The field to validate.
   */
  const validateField = (field: string) => {
    const errors = { ...validationErrors };

    switch (field) {
      case 'username':
        errors.username =
          username.trim().length >= 3
            ? ''
            : 'Username must be at least 3 characters.';
        break;
      case 'email':
        errors.email = /^\S+@\S+\.\S+$/.test(email)
          ? ''
          : 'Please enter a valid email address.';
        break;
      case 'password':
        errors.password = /^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]{2,})[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/.test(password)
            ? ''
            : `Password must be at least 8 characters and
               contain at least one uppercase letter,
               and two special characters.`;
        break;
      case 'confirmPassword':
        errors.confirmPassword =
          confirmPassword === password
            ? ''
            : 'Passwords do not match.';
        break;
    }

    setValidationErrors(errors);
  };

  /**
   * Handles form submission for signup.
   *
   * param {React.FormEvent} e - The form submission event.
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError('');
    setSuggestions([]);

    try {
      // Additional field validation
      validateField('username');
      validateField('email');
      validateField('password');
      validateField('confirmPassword');

      // If any validation error exists, return early
      if (
        validationErrors.username ||
        validationErrors.email ||
        validationErrors.password ||
        validationErrors.confirmPassword
      ) {
        throw new Error('Please fix the highlighted errors.');
      }

      const result = await signup(username, email, password);

      if (result.success) {
        router.push('/home');
        location.reload();
      } else {
        if (result.error === 'Username already exists' && result.suggestions) {
          setSuggestions(result.suggestions);
        }
        throw new Error(result.error || 'Signup failed.');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
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
    validationErrors,
    validateField,
  };
}
