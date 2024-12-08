/* apps/nextapp/src/app/(protected)/profile/page.tsx */

'use client';

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Loader2 } from 'lucide-react';
import { LoadingSpinner } from '../../../components/loading-spinner';
import { useProfile } from './useProfile';
import styles from './profile.module.css';

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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`${styles.header} bg-background/95`}>
        <div className="container mx-auto">
          <h2 className={styles.title}>Profile Settings</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-6">
          {/* Profile Card */}
          <Card className={`${styles.profileCard} bg-background/60`}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Error and Success Messages */}
                {error && (
                  <div role="alert" className={styles.errorAlert}>
                    {error}
                  </div>
                )}
                {success && (
                  <div role="alert" className={styles.successAlert}>
                    {success}
                  </div>
                )}

                {/* Username Field */}
                <div className={styles.fieldGroup}>
                  <div className={styles.fieldHeader}>
                    <label className={styles.fieldLabel}>Username</label>
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
                <div className={styles.fieldGroup}>
                  <div className={styles.fieldHeader}>
                    <label className={styles.fieldLabel}>Email</label>
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
                <div className={styles.fieldGroup}>
                  <div className={styles.fieldHeader}>
                    <label className={styles.fieldLabel}>Password</label>
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
                    <div className={styles.passwordFields}>
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
                  <Button type="submit" className={styles.saveButton} disabled={isLoading}>
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
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container mx-auto flex justify-between text-sm text-muted-foreground">
          <p>© 2024 The Source Build</p>
          <p>RChursin 💡</p>
        </div>
      </footer>
    </div>
  );
}
