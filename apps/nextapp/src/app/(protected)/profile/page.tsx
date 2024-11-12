// apps/nextapp/src/app/(protected)/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Loader2 } from 'lucide-react';
import { updateProfile } from '../../../lib/auth/utils';
import { LoadingSpinner } from '../../../components/loading-spinner';
import { 
  ProfileFormData, 
  ProfileEditModeState, 
  ProfileUpdateData,
  PROFILE_ERRORS,
  PROFILE_MESSAGES
} from '../../../types/profile';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State to track loading, error, and success messages
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // State to store form data for profile fields
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State to track which profile fields are in edit mode
  const [editMode, setEditMode] = useState<ProfileEditModeState>({
    username: false,
    email: false,
    password: false,
  });

  // Load user data into form when session is authenticated, redirect if not
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
      setError("You are not authenticated");
      router.push("/login");
    }
  }, [status, session, router]);

  // Show a loading spinner while session status is loading
  if (status === 'loading') return <LoadingSpinner />;

  // Handle input changes for form fields and update formData state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle edit mode for a given field, resetting error/success messages
  const toggleEditMode = (field: keyof ProfileEditModeState) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setError('');
    setSuccess('');
  };

  // Validate form fields before submitting changes
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

  // Handle form submission for profile update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare the update data based on edited fields
      const updateData: ProfileUpdateData = {
        userId: session?.user?.id || '',
        ...(editMode.username && { username: formData.username }),
        ...(editMode.email && { email: formData.email }),
        ...(editMode.password && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      };

      // Send update request to server
      const result = await updateProfile(updateData);

      // Handle success or error in the result
      if (result.success) {
        setSuccess(PROFILE_MESSAGES.UPDATE_SUCCESS);
        setEditMode({ username: false, email: false, password: false });
        setFormData((prev) => ({
          ...prev,
          username: result.user?.username || prev.username,
          email: result.user?.email || prev.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
        
        // Reload page to show updated profile information
        window.location.reload();

        // Refresh session if user information was updated
        if (session?.user?.username !== result.user?.username || session?.user?.email !== result.user?.email) {
          await signIn('credentials', {
            redirect: false,
          });
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display error message if exists */}
          {error && (
            <div role="alert" className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {error}
            </div>
          )}
          {/* Display success message if exists */}
          {success && (
            <div role="alert" className="p-3 text-sm text-green-600 bg-green-100 rounded-md">
              {success}
            </div>
          )}

          {/* Username field with toggle for edit mode */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Username</label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => toggleEditMode('username')}
              >
                {editMode.username ? 'Cancel' : 'Edit'}
              </Button>
            </div>
            <Input
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!editMode.username || isLoading}
              className="bg-background"
            />
          </div>

          {/* Email field with toggle for edit mode */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Email</label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => toggleEditMode('email')}
              >
                {editMode.email ? 'Cancel' : 'Edit'}
              </Button>
            </div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editMode.email || isLoading}
              className="bg-background"
            />
          </div>

          {/* Password fields with toggle for edit mode */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Password</label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => toggleEditMode('password')}
              >
                {editMode.password ? 'Cancel' : 'Change Password'}
              </Button>
            </div>
            {editMode.password && (
              <div className="space-y-4">
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="bg-background"
                />
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="bg-background"
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="bg-background"
                />
              </div>
            )}
          </div>

          {/* Display Save Changes button only if any fields are in edit mode */}
          {(editMode.username || editMode.email || editMode.password) && (
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}