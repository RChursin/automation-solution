// apps/nextapp/src/app/(protected)/profile/page.tsx
'use client';

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Loader2 } from 'lucide-react';
import { LoadingSpinner } from '../../../components/loading-spinner';
import { useProfile } from './useProfile';

/**
 * Profile Page Component
 * Renders the profile settings page, consuming the `useProfile` hook for logic.
 */
export default function Profile() {
  const {
    status,
    isLoading,
    error,
    success,
    formData,
    editMode,
    handleInputChange,
    toggleEditMode,
    handleSubmit,
  } = useProfile();

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen">
      <Card className="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error and Success Messages */}
            {error && (
              <div
                role="alert"
                className="p-3 text-sm text-destructive bg-destructive/10 rounded-md"
              >
                {error}
              </div>
            )}
            {success && (
              <div
                role="alert"
                className="p-3 text-sm text-green-600 bg-green-100 rounded-md"
              >
                {success}
              </div>
            )}

            {/* Username Field */}
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

            {/* Email Field */}
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

            {/* Password Fields */}
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

            {/* Save Changes Button */}
            {(editMode.username || editMode.email || editMode.password) && (
              <Button type="submit" className="w-full" disabled={isLoading}>
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
    </div>
  );
}