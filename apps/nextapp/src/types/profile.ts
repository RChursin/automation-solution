// Interface for form data in the profile update form
export interface ProfileFormData {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Interface to manage which fields are in edit mode in the profile form
export interface ProfileEditModeState {
  username: boolean;
  email: boolean;
  password: boolean;
}

// Interface for data required to update the profile
export interface ProfileUpdateData {
  userId: string;
  username?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

// Interface for the response structure of a profile update request
export interface ProfileUpdateResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

// Interface defining fields to be updated in the database
export interface DatabaseUpdateFields {
  username?: string;
  email?: string;
  password?: string;
}

// Error messages related to profile updates, ensuring consistency across the app
export const PROFILE_ERRORS = {
  UNAUTHORIZED: 'Unauthorized',
  USER_NOT_FOUND: 'User not found',
  EMAIL_EXISTS: 'Email already exists',
  USERNAME_EXISTS: 'Username already exists',
  INVALID_PASSWORD: 'Current password is incorrect',
  UPDATE_FAILED: 'Failed to update profile',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'New password must be at least 6 characters',
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
  USERNAME_TOO_SHORT: 'Username must be at least 3 characters',
  CURRENT_PASSWORD_REQUIRED: 'Current password is required',
  NOT_AUTHENTICATED: 'User not authenticated'
} as const;

// Success messages related to profile updates
export const PROFILE_MESSAGES = {
  UPDATE_SUCCESS: 'Profile updated successfully',
  NO_CHANGES: 'No changes to update'
} as const;

// Type guard function to check if an unknown object is ProfileUpdateData
export function isProfileUpdateData(data: unknown): data is ProfileUpdateData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'userId' in data &&
    typeof (data as ProfileUpdateData).userId === 'string'
  );
}