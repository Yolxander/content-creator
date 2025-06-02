'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface User {
  defaultContentType?: string;
  defaultLanguage?: string;
  defaultVisibility?: string;
  defaultCategory?: string;
  organization?: {
    name: string;
  };
}

interface ContentDefaultsProps {
  user: User;
}

export default function ContentDefaults({ user }: ContentDefaultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [defaults, setDefaults] = useState({
    contentType: user.defaultContentType || 'article',
    language: user.defaultLanguage || 'en',
    visibility: user.defaultVisibility || 'internal',
    category: user.defaultCategory || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement defaults update
      toast.success('Content defaults updated successfully');
    } catch (error) {
      toast.error('Failed to update content defaults');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label>Default Content Type</Label>
          <Select
            value={defaults.contentType}
            onValueChange={(value) => setDefaults(prev => ({ ...prev, contentType: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select default content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            This will be the default type when creating new content
          </p>
        </div>

        <div className="space-y-2">
          <Label>Default Language</Label>
          <Select
            value={defaults.language}
            onValueChange={(value) => setDefaults(prev => ({ ...prev, language: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select default language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            This will be the default language for new content
          </p>
        </div>

        <div className="space-y-2">
          <Label>Default Visibility</Label>
          <Select
            value={defaults.visibility}
            onValueChange={(value) => setDefaults(prev => ({ ...prev, visibility: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select default visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="organization">Organization Only</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            This will be the default visibility for new content
          </p>
        </div>

        {user.organization && (
          <div className="space-y-2">
            <Label>Default Category/Program</Label>
            <Select
              value={defaults.category}
              onValueChange={(value) => setDefaults(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select default category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="strategy">Strategy</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="industry">Industry</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              This will be the default category for new content
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
} 