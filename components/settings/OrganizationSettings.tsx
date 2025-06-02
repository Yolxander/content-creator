'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

interface Organization {
  name: string;
  logo: string;
  defaultVisibility: string;
  allowPublicContent: boolean;
}

interface User {
  organization?: Organization;
}

interface OrganizationSettingsProps {
  user: User;
}

export default function OrganizationSettings({ user }: OrganizationSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [orgData, setOrgData] = useState({
    name: user.organization?.name || '',
    logo: user.organization?.logo || '',
    defaultVisibility: user.organization?.defaultVisibility || 'internal',
    allowPublicContent: user.organization?.allowPublicContent || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrgData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement organization update
      toast.success('Organization settings updated successfully');
    } catch (error) {
      toast.error('Failed to update organization settings');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
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
        <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>
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
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={orgData.logo} alt={orgData.name} />
                <AvatarFallback>{orgData.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" type="button">
                  Change Organization Logo
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={orgData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Default Content Visibility</Label>
                <Select
                  value={orgData.defaultVisibility}
                  onValueChange={(value) => setOrgData(prev => ({ ...prev, defaultVisibility: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal Only</SelectItem>
                    <SelectItem value="restricted">Restricted</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="allowPublicContent"
                  checked={orgData.allowPublicContent}
                  onCheckedChange={(checked) => setOrgData(prev => ({ ...prev, allowPublicContent: checked }))}
                />
                <Label htmlFor="allowPublicContent">Allow Public Content</Label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="members">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Organization Members</h3>
              <Button>
                Invite Members
              </Button>
            </div>
            
            <DataTable
              columns={columns}
              data={[]} // TODO: Implement member data
              searchKey="name"
            />
          </div>
        </TabsContent>

        <TabsContent value="domains">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Verified Domains</h3>
              <Button>
                Add Domain
              </Button>
            </div>
            
            <div className="rounded-md border">
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  No domains verified yet. Add a domain to enable custom email addresses and SSO.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 