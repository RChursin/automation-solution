// apps/nextapp/src/app/(protected)/profile/useProfile.ts
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  ProfileFormData,
  ProfileEditModeState,
  ProfileUpdateData,
  PROFILE_ERRORS,
  PROFILE_MESSAGES,
} from '../../../types/profile';
import { updateProfile } from '../../../lib/auth/utils';

/**
 * Custom hook to manage profile settings.
 * Handles state, form validation, and submission logic for the Profile page.
 *
 * returns {object} - Exposes the profile management logic and state:
 *  - session, status: Current session information
 *  - isLoading: Loading state for updates
 *  - error, success: Messages for errors and successful updates
 *  - formData: Current state of profile form fields
 *  - editMode: Tracks which fields are in edit mode
 *  - handleInputChange: Updates form data on user input
 *  - toggleEditMode: Toggles edit mode for specific fields
 *  - handleSubmit: Submits the updated profile data
 */
export function useProfile() {
  const { data: session, status } = useSession(); // Session information from next-auth
  const router = useRouter();

  // State variables
  const [isLoading, setIsLoading] = useState(false); // Tracks the loading state
  const [error, setError] = useState(''); // Stores error messages
  const [success, setSuccess] = useState(''); // Stores success messages
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [editMode, setEditMode] = useState<ProfileEditModeState>({
    username: false,
    email: false,
    password: false,
  });

  /**
   * Loads session data into the form when the user is authenticated.
   * Redirects to the login page if the user is unauthenticated.
   */
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setFormData({
        username: session.user.username || '',
        email: session.user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } else if (status === 'unauthenticated') {
      setError('You are not authenticated');
      router.push('/login');
    }
  }, [status, session, router]);

  /**
   * Handles input changes in the form fields.
   *
   * param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Toggles edit mode for a specific field, resetting error and success messages.
   *
   * param {keyof ProfileEditModeState} field - The field to toggle.
   */
  const toggleEditMode = (field: keyof ProfileEditModeState) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setError('');
    setSuccess('');
  };

  /**
   * Validates the form data before submission.
   *
   * @returns {boolean} - Returns `true` if the form is valid; otherwise, `false`.
   */
  const validateForm = () => {
    if (editMode.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError(PROFILE_ERRORS.INVALID_EMAIL);
      return false;
    }
    if (editMode.password) {
      if (!formData.currentPassword) {
        setError(PROFILE_ERRORS.CURRENT_PASSWORD_REQUIRED);
        return false;
      }
      if (formData.newPassword.length < 6) {
        setError(PROFILE_ERRORS.PASSWORD_TOO_SHORT);
        return false;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError(PROFILE_ERRORS.PASSWORDS_NOT_MATCH);
        return false;
      }
    }
    if (editMode.username && formData.username.length < 3) {
      setError(PROFILE_ERRORS.USERNAME_TOO_SHORT);
      return false;
    }
    return true;
  };

  /**
   * Handles form submission to update the profile.
   *
   * param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare data for the fields currently in edit mode
      const updateData: ProfileUpdateData = {
        userId: session?.user?.id || '',
        ...(editMode.username && { username: formData.username }),
        ...(editMode.email && { email: formData.email }),
        ...(editMode.password && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      };

      // Send the update request to the server
      const result = await updateProfile(updateData);

      if (result.success) {
        setSuccess(PROFILE_MESSAGES.UPDATE_SUCCESS);
        setEditMode({ username: false, email: false, password: false }); // Reset edit mode
        setFormData((prev) => ({
          ...prev,
          username: result.user?.username || prev.username,
          email: result.user?.email || prev.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));

        // Reload the page to fetch updated profile info
        window.location.reload();

        // Refresh session if the profile data changed
        if (
          session?.user?.username !== result.user?.username ||
          session?.user?.email !== result.user?.email
        ) {
          await signIn('credentials', { redirect: false });
        }
      } else {
        throw new Error(result.error || PROFILE_ERRORS.UPDATE_FAILED);
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError((err as Error).message || PROFILE_ERRORS.UPDATE_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    session,
    status,
    isLoading,
    error,
    success,
    formData,
    editMode,
    handleInputChange,
    toggleEditMode,
    handleSubmit,
  };
}
