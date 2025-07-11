import { HomeScreen } from '@/src/screens/HomeScreen';
import { ProjectDetailScreen } from '@/src/screens/ProjectDetailScreen';
import { Project } from '@/src/types';
import React, { useState } from 'react';

type HomeTabScreen = 'home' | 'projectDetail';

export default function TabOneScreen() {
  const [currentScreen, setCurrentScreen] = useState<HomeTabScreen>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentScreen('projectDetail');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedProject(null);
  };

  const handleNavigateToProjects = () => {
    // Navigation vers l'onglet Projets - cette fonction pourrait être utilisée pour changer d'onglet
    console.log('Navigation vers l\'onglet Projets');
  };

  const handleNavigateToProfile = () => {
    // Navigation vers l'onglet Profil - cette fonction pourrait être utilisée pour changer d'onglet
    console.log('Navigation vers l\'onglet Profil');
  };

  const handleInvest = (amount: number) => {
    console.log(`Investissement de ${amount} USD dans le projet ${selectedProject?.title}`);
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
    
    case 'projectDetail':
      return selectedProject ? (
        <ProjectDetailScreen
          project={selectedProject}
          onBack={handleBackToHome}
          onInvest={handleInvest}
        />
      ) : (
        <HomeScreen
          onNavigateToProjects={handleNavigateToProjects}
          onProjectSelect={handleProjectSelect}
          onNavigateToProfile={handleNavigateToProfile}
        />
      );
    
    default:
      return (
        <HomeScreen
          onNavigateToProjects={handleNavigateToProjects}
          onProjectSelect={handleProjectSelect}
          onNavigateToProfile={handleNavigateToProfile}
        />
      );
  }
}
