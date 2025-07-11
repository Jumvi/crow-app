import React from 'react';
import { AuthNavigator } from '../../src/navigation/AuthNavigator';
import { ProfileScreen } from '../../src/screens/ProfileScreen';
import { useAuthStore } from '../../src/store';

export default function ProfileTab() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return (
    <ProfileScreen
      onBack={() => {}} // Pas de retour nécessaire depuis les tabs
      onEditProfile={() => console.log('Edit profile')}
    />
  );
}
