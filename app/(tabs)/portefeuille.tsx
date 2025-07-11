import React from 'react';
import { AuthNavigator } from '../../src/navigation/AuthNavigator';
import { PortefeuilleScreen } from '../../src/screens/PortefeuilleScreen';
import { useAuthStore } from '../../src/store';

export default function PortefeuilleTab() {
  const { isAuthenticated } = useAuthStore();

  const handleProjectSelect = (projectId: string) => {
    console.log('Navigation vers le projet:', projectId);
    // Ici on pourrait naviguer vers l'onglet projets avec le projet sélectionné
  };

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return (
    <PortefeuilleScreen
      onProjectSelect={handleProjectSelect}
    />
  );
}
