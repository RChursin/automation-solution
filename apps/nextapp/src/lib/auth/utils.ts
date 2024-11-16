// apps/nextapp/src/lib/auth/utils.ts

import { ProfileUpdateData, ProfileUpdateResponse, PROFILE_ERRORS } from '../../types/profile';
import { signIn, signOut } from 'next-auth/react';

/**
 * Signs up a new user by sending their details to the backend.
 * If successful, it logs in the user automatically.
 *
 * param {string} username - The username of the new user.
 * param {string} email - The email address of the new user.
 * param {string} password - The password of the new user.
 * returns {Promise<{success: boolean; error?: string; suggestions?: string[]}>} - A promise resolving to the signup result.
 * - `success`: `true` if the signup succeeded, otherwise `false`.
 * - `error`: An error message if the signup failed.
 * - `suggestions`: An array of suggested usernames if the desired username is unavailable.
 */
export async function signup(username: string, email: string, password: string) {
  try {
    // Send a request to create a new user
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    // Check if signup was successful
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Signup failed',
        suggestions: data.suggestions || [], // Add suggestions if available
      };
    }

    // Automatically sign in the user after successful signup
    const result = await signIn('credentials', {
      email: email,
      username: username,
      password: password,
      redirect: false,
      callbackUrl: '/home',
    });

    // Check if sign-in was successful
    if (result?.error) {
      throw new Error(result.error);
    }

    return { success: true };
  } catch (error) {
    // Return an error message if signup or sign-in fails
    return {
      success: false,
      error: (error as Error).message || 'An unexpected error occurred',
    };
  }
}

/**
 * Logs out the currently authenticated user and redirects to the login page.
 *
 * returns {Promise<void>} - A promise resolving when the logout is complete.
 */
export async function logout() {
  try {
    // Sign the user out and redirect to the login page
    await signOut({ redirect: true, callbackUrl: '/login' });
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

/**
 * Updates the profile information of a user.
 *
 * param {ProfileUpdateData} data - An object containing profile update data.
 * - `userId`: The ID of the user whose profile is being updated.
 * - `username`: The new username (optional).
 * - `email`: The new email address (optional).
 * - `currentPassword`: The current password for authentication.
 * - `newPassword`: The new password to update (optional).
 * returns {Promise<ProfileUpdateResponse>} - A promise resolving to the profile update response.
 * - `success`: `true` if the update succeeded, otherwise `false`.
 * - `message`: A message indicating the result of the operation.
 * - `user`: The updated user information.
 */
export async function updateProfile(data: ProfileUpdateData): Promise<ProfileUpdateResponse> {
  try {
    // Ensure the data contains a valid user ID
    if (!data.userId) {
      throw new Error(PROFILE_ERRORS.UNAUTHORIZED);
    }

    // Send a request to update the user's profile
    const response = await fetch(`/api/profile/${data.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
      credentials: 'include',
      cache: 'no-store',
    });

    const result = await response.json();

    // Check if profile update was successful
    if (!response.ok) {
      throw new Error(result.error || PROFILE_ERRORS.UPDATE_FAILED);
    }

    // Return the success response with the updated user information
    return {
      success: true,
      message: result.message,
      user: result.user,
    };
  } catch (error) {
    console.error('Profile update error:', error);
    // Return an error message if the update fails
    return {
      success: false,
      error: error instanceof Error ? error.message : PROFILE_ERRORS.UPDATE_FAILED,
    };
  }
}
