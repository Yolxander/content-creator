'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

interface User {
  role?: string;
}

interface AdminToolsProps {
  user: User;
}

export default function AdminTools({ user }: AdminToolsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [platformSettings, setPlatformSettings] = useState({
    maxUploadSize: 100, // MB
    autoTranslation: false,
    enableFeeds: true,
    enableLiveVideo: false,
    enableComments: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement platform settings update
      toast.success('Platform settings updated successfully');
    } catch (error) {
      toast.error('Failed to update platform settings');
    } finally {
      setIsLoading(false);
    }
  };

  const userColumns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant={row.original.role === 'super_admin' ? 'default' : 'secondary'}>
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'active' ? 'success' : 'destructive'}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Deactivate
          </Button>
        </div>
      ),
    },
  ];

  const auditColumns = [
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
    },
    {
      accessorKey: 'user',
      header: 'User',
    },
    {
      accessorKey: 'action',
      header: 'Action',
    },
    {
      accessorKey: 'details',
      header: 'Details',
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Global User Management</h3>
              <Button>
                Add User
              </Button>
            </div>
            
            <DataTable
              columns={userColumns}
              data={[]} // TODO: Implement user data
              searchKey="name"
            />
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Content Settings</h3>

                <div className="space-y-2">
                  <Label>Maximum Upload Size (MB)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="1000"
                    value={platformSettings.maxUploadSize}
                    onChange={(e) =>
                      setPlatformSettings(prev => ({
                        ...prev,
                        maxUploadSize: parseInt(e.target.value),
                      }))
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum file size for content uploads
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-translation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically translate content to other languages
                    </p>
                  </div>
                  <Switch
                    checked={platformSettings.autoTranslation}
                    onCheckedChange={(checked) =>
                      setPlatformSettings(prev => ({ ...prev, autoTranslation: checked }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Feature Toggles</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Feeds</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable content feeds functionality
                    </p>
                  </div>
                  <Switch
                    checked={platformSettings.enableFeeds}
                    onCheckedChange={(checked) =>
                      setPlatformSettings(prev => ({ ...prev, enableFeeds: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Live Video</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable live video streaming
                    </p>
                  </div>
                  <Switch
                    checked={platformSettings.enableLiveVideo}
                    onCheckedChange={(checked) =>
                      setPlatformSettings(prev => ({ ...prev, enableLiveVideo: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable commenting on content
                    </p>
                  </div>
                  <Switch
                    checked={platformSettings.enableComments}
                    onCheckedChange={(checked) =>
                      setPlatformSettings(prev => ({ ...prev, enableComments: checked }))
                    }
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
        </TabsContent>

        <TabsContent value="audit">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Audit Logs</h3>
              <Button variant="outline">
                Export Logs
              </Button>
            </div>
            
            <DataTable
              columns={auditColumns}
              data={[]} // TODO: Implement audit log data
              searchKey="action"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 