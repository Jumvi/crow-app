import React, { useState } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ProjectDetailScreen } from '../screens/ProjectDetailScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { Project } from '../types';

type MainScreen = 'home' | 'projects' | 'projectDetail' | 'profile';

export const MainNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState<MainScreen>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNavigateToProjects = () => {
    setCurrentScreen('projects');
  };

  const handleNavigateToProfile = () => {
    setCurrentScreen('profile');
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
          onNavigateToProfile={handleNavigateToProfile}
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
    
    case 'profile':
      return (
        <ProfileScreen
          onBack={handleBackToHome}
          onEditProfile={() => console.log('Edit profile')}
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
