// components/profile/settingsTab/SettingsTab.tsx
import React from 'react';
import { NotificationSettings } from './NotificationSettings';
import { PrivacySecurity } from './PrivacySecurity';
import { AppPreferences } from './AppPreferences';
import { AccountActions } from './AccountActions';

interface SettingsTabProps {
  onSignOut: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ onSignOut }) => {
  return (
    <div className="space-y-6">
      <NotificationSettings />
      <PrivacySecurity />
      <AppPreferences />
      <AccountActions onSignOut={onSignOut} />
    </div>
  );
};