import React, { useState } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { ProjectDetailScreen } from '../screens/ProjectDetailScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { Project } from '../types';

type Screen = 'home' | 'projects' | 'project-detail';

interface NavigationState {
  currentScreen: Screen;
  selectedProject?: Project;
}

export const AppNavigator = () => {
  const [navigation, setNavigation] = useState<NavigationState>({
    currentScreen: 'home'
  });

  const navigateToProjects = () => {
    setNavigation({ currentScreen: 'projects' });
  };

  const navigateToProjectDetail = (project: Project) => {
    setNavigation({ currentScreen: 'project-detail', selectedProject: project });
  };

  const navigateToHome = () => {
    setNavigation({ currentScreen: 'home' });
  };

  const goBack = () => {
    if (navigation.currentScreen === 'project-detail') {
      setNavigation({ currentScreen: 'projects' });
    } else if (navigation.currentScreen === 'projects') {
      setNavigation({ currentScreen: 'home' });
    }
  };

  const handleInvest = (amount: number) => {
    // Ici vous pouvez ajouter la logique d'investissement
    console.log(`Investissement de $${amount} dans le projet ${navigation.selectedProject?.title}`);
    // Retour à la liste des projets après investissement
    setNavigation({ currentScreen: 'projects' });
  };

  switch (navigation.currentScreen) {
    case 'home':
      return (
        <HomeScreen 
          onNavigateToProjects={navigateToProjects}
          onProjectSelect={navigateToProjectDetail}
        />
      );
    
    case 'projects':
      return (
        <ProjectsScreen 
          onProjectSelect={navigateToProjectDetail}
          onBack={navigateToHome}
        />
      );
    
    case 'project-detail':
      return navigation.selectedProject ? (
        <ProjectDetailScreen 
          project={navigation.selectedProject}
          onBack={goBack}
          onInvest={handleInvest}
        />
      ) : null;
    
    default:
      return (
        <HomeScreen 
          onNavigateToProjects={navigateToProjects}
          onProjectSelect={navigateToProjectDetail}
        />
      );
  }
};
