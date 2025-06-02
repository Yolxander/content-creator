'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

interface User {
  twoFactorEnabled?: boolean;
  sessionTimeout?: number;
  googleConnected?: boolean;
  microsoftConnected?: boolean;
}

interface SecuritySettingsProps {
  user: User;
}

export default function SecuritySettings({ user }: SecuritySettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: user.twoFactorEnabled || false,
    sessionTimeout: user.sessionTimeout || 30,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Implement password change
      toast.success('Password updated successfully');
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement security settings update
      toast.success('Security settings updated successfully');
    } catch (error) {
      toast.error('Failed to update security settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Password</h3>
              <p className="text-sm text-muted-foreground">
                Change your password to keep your account secure
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </Button>
          </div>

          {showPasswordForm && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          )}
        </div>
      </form>

      <Separator />

      <form onSubmit={handleSecuritySubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={securitySettings.twoFactorEnabled}
              onCheckedChange={(checked) =>
                setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: checked }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Session Timeout (minutes)</Label>
            <Input
              type="number"
              min="5"
              max="120"
              value={securitySettings.sessionTimeout}
              onChange={(e) =>
                setSecuritySettings(prev => ({
                  ...prev,
                  sessionTimeout: parseInt(e.target.value),
                }))
              }
            />
            <p className="text-sm text-muted-foreground">
              Automatically log out after this period of inactivity
            </p>
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Security Settings'}
        </Button>
      </form>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Linked Accounts</h3>
        <div className="grid gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-muted-foreground">
                    {user.googleConnected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              <Button variant={user.googleConnected ? 'destructive' : 'default'}>
                {user.googleConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Microsoft</p>
                  <p className="text-sm text-muted-foreground">
                    {user.microsoftConnected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              <Button variant={user.microsoftConnected ? 'destructive' : 'default'}>
                {user.microsoftConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Active Sessions</h3>
        <div className="rounded-md border">
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              No active sessions found
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 