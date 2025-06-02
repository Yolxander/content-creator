'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

interface User {
  interfaceLanguage?: string;
  contentLanguage?: string;
  timezone?: string;
  darkMode?: boolean;
  compactMode?: boolean;
}

interface LanguageSettingsProps {
  user: User;
}

export default function LanguageSettings({ user }: LanguageSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    interfaceLanguage: user.interfaceLanguage || 'en',
    contentLanguage: user.contentLanguage || 'en',
    timezone: user.timezone || 'UTC',
    darkMode: user.darkMode || false,
    compactMode: user.compactMode || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement language settings update
      toast.success('Language settings updated successfully');
    } catch (error) {
      toast.error('Failed to update language settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Language Preferences</h3>
          
          <div className="space-y-2">
            <Label>Interface Language</Label>
            <Select
              value={settings.interfaceLanguage}
              onValueChange={(value) => setSettings(prev => ({ ...prev, interfaceLanguage: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose your preferred language for the interface
            </p>
          </div>

          <div className="space-y-2">
            <Label>Default Content Language</Label>
            <Select
              value={settings.contentLanguage}
              onValueChange={(value) => setSettings(prev => ({ ...prev, contentLanguage: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              This will be the default language for new content
            </p>
          </div>

          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select
              value={settings.timezone}
              onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="Europe/London">London (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Set your local timezone for accurate timestamps
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Interface Preferences</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Compact Mode</Label>
              <p className="text-sm text-muted-foreground">
                Reduce spacing for a more compact interface
              </p>
            </div>
            <Switch
              checked={settings.compactMode}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, compactMode: checked }))}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
} 