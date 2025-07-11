import React from 'react';
import { useAuthStore } from '../store';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export const AppNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <MainNavigator />;
  }

  return <AuthNavigator />;
};
