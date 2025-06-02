'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

interface User {
  notificationDeliveryMethod?: string;
}

interface NotificationsProps {
  user: User;
}

export default function Notifications({ user }: NotificationsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    inApp: {
      contentStatus: true,
      reviewFeedback: true,
      assignments: true,
      mentions: true,
    },
    email: {
      contentStatus: true,
      reviewFeedback: true,
      assignments: false,
      mentions: true,
      digest: false,
    },
    deliveryMethod: user.notificationDeliveryMethod || 'both',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement notification preferences update
      toast.success('Notification preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update notification preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Preferred Delivery Method</Label>
          <Select
            value={preferences.deliveryMethod}
            onValueChange={(value) => setPreferences(prev => ({ ...prev, deliveryMethod: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select delivery method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inApp">In-app only</SelectItem>
              <SelectItem value="email">Email only</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">In-app Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Content Status Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your content status changes
                  </p>
                </div>
                <Switch
                  checked={preferences.inApp.contentStatus}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({
                      ...prev,
                      inApp: { ...prev.inApp, contentStatus: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Review Feedback</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you receive review feedback
                  </p>
                </div>
                <Switch
                  checked={preferences.inApp.reviewFeedback}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({
                      ...prev,
                      inApp: { ...prev.inApp, reviewFeedback: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Assignments</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you're assigned new tasks
                  </p>
                </div>
                <Switch
                  checked={preferences.inApp.assignments}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({
                      ...prev,
                      inApp: { ...prev.inApp, assignments: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mentions</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone mentions you
                  </p>
                </div>
                <Switch
                  checked={preferences.inApp.mentions}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({
                      ...prev,
                      inApp: { ...prev.inApp, mentions: checked },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Content Status Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for content status changes
                  </p>
                </div>
                <Switch
                  checked={preferences.email.contentStatus}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({
                      ...prev,
                      email: { ...prev.email, contentStatus: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Review Feedback</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for review feedback
                  </p>
                </div>
                <Switch
                  checked={preferences.email.reviewFeedback}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({
                      ...prev,
                      email: { ...prev.email, reviewFeedback: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Assignments</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for new assignments
                  </p>
                </div>
                <Switch
                  checked={preferences.email.assignments}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({
                      ...prev,
                      email: { ...prev.email, assignments: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mentions</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications when someone mentions you
                  </p>
                </div>
                <Switch
                  checked={preferences.email.mentions}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({
                      ...prev,
                      email: { ...prev.email, mentions: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of your content activity
                  </p>
                </div>
                <Switch
                  checked={preferences.email.digest}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({
                      ...prev,
                      email: { ...prev.email, digest: checked },
                    }))
                  }
                />
              </div>
            </div>
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