import React, { useState } from 'react';
import { Project } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { ProjectDetailScreen } from '../screens/ProjectDetailScreen';

type MainScreen = 'home' | 'projects' | 'projectDetail';

export const MainNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState<MainScreen>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNavigateToProjects = () => {
    setCurrentScreen('projects');
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentScreen('projectDetail');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedProject(null);
  };

  const handleBackToProjects = () => {
    setCurrentScreen('projects');
    setSelectedProject(null);
  };

  const handleInvest = (amount: number) => {
    console.log(`Investissement de ${amount} USD dans le projet ${selectedProject?.title}`);
    // Ici on pourrait ajouter la logique d'investissement
    // Par exemple : appel API, mise à jour du store, etc.
  };

  switch (currentScreen) {
    case 'home':
      return (
        <HomeScreen
          onNavigateToProjects={handleNavigateToProjects}
          onProjectSelect={handleProjectSelect}
        />
      );
    
    case 'projects':
      return (
        <ProjectsScreen
          onProjectSelect={handleProjectSelect}
          onBack={handleBackToHome}
        />
      );
    
    case 'projectDetail':
      return selectedProject ? (
        <ProjectDetailScreen
          project={selectedProject}
          onBack={handleBackToProjects}
          onInvest={handleInvest}
        />
      ) : (
        <HomeScreen
          onNavigateToProjects={handleNavigateToProjects}
          onProjectSelect={handleProjectSelect}
        />
      );
    
    default:
      return (
        <HomeScreen
          onNavigateToProjects={handleNavigateToProjects}
          onProjectSelect={handleProjectSelect}
        />
      );
  }
};
