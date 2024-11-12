// apps/nextapp/src/lib/auth/utils.ts
import { ProfileUpdateData, ProfileUpdateResponse, PROFILE_ERRORS } from '../../types/profile';
import { signIn, signOut } from 'next-auth/react';

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
      throw new Error(data.error || 'Signup failed');
    }

    // Automatically sign in the user after successful signup
    const result = await signIn('credentials', {
      username: email,
      password: password,
      redirect: false,
      callbackUrl: '/home'
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
      error: (error as Error).message || 'An unexpected error occurred'
    };
  }
}

export async function logout() {
  try {
    // Sign the user out and redirect to the login page
    await signOut({ redirect: true, callbackUrl: '/login' });
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

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
        newPassword: data.newPassword
      }),
      credentials: 'include',
      cache: 'no-store'
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
      user: result.user
    };
  } catch (error) {
    console.error('Profile update error:', error);
    // Return an error message if the update fails
    return {
      success: false,
      error: error instanceof Error ? error.message : PROFILE_ERRORS.UPDATE_FAILED
    };
  }
}