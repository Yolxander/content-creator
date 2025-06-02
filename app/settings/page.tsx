'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MoreHorizontal } from 'lucide-react';
import PersonalSettings from '@/components/settings/PersonalSettings';
import OrganizationSettings from '@/components/settings/OrganizationSettings';
import ContentDefaults from '@/components/settings/ContentDefaults';
import Notifications from '@/components/settings/Notifications';
import SecuritySettings from '@/components/settings/SecuritySettings';
import LanguageSettings from '@/components/settings/LanguageSettings';
import AdminTools from '@/components/settings/AdminTools';

// Mock user data for development
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'SUPER_ADMIN',
  organization: {
    name: 'Acme Corp',
    logo: '/logo.png',
    domain: 'acme.com',
    members: [
      { name: 'John Doe', email: 'john@example.com', role: 'ADMIN' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'MEMBER' },
    ],
    defaultVisibility: 'public',
    allowPublicContent: true,
  },
  defaultContentType: 'article',
  defaultLanguage: 'en',
  defaultVisibility: 'public',
  defaultCategory: 'marketing',
  notificationDeliveryMethod: 'both',
  twoFactorEnabled: false,
  sessionTimeout: 30,
  interfaceLanguage: 'en',
  contentLanguage: 'en',
  timezone: 'UTC',
  darkMode: false,
  compactMode: false,
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('personal');

  const renderSettingsSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalSettings user={mockUser} />;
      case 'organization':
        return <OrganizationSettings user={mockUser} />;
      case 'content':
        return <ContentDefaults user={mockUser} />;
      case 'notifications':
        return <Notifications user={mockUser} />;
      case 'security':
        return <SecuritySettings user={mockUser} />;
      case 'language':
        return <LanguageSettings user={mockUser} />;
      case 'admin':
        return mockUser.role === 'SUPER_ADMIN' ? <AdminTools user={mockUser} /> : null;
      default:
        return <PersonalSettings user={mockUser} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <SettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search settings..." className="pl-9 w-64" />
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderSettingsSection()}
        </div>
      </div>
    </div>
  );
} 