import React, { useState } from 'react';
import { ProjectDetailScreen } from '../../src/screens/ProjectDetailScreen';
import { ProjectsTabScreen } from '../../src/screens/ProjectsTabScreen';
import { Project } from '../../src/types';

type ProjectsTabScreenType = 'projects' | 'projectDetail';

export default function ProjectsTab() {
  const [currentScreen, setCurrentScreen] = useState<ProjectsTabScreenType>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentScreen('projectDetail');
  };

  const handleBackToProjects = () => {
    setCurrentScreen('projects');
    setSelectedProject(null);
  };

  const handleInvest = (amount: number) => {
    console.log(`Investissement de ${amount} USD dans le projet ${selectedProject?.title}`);
    // Ici on pourrait ajouter la logique d'investissement
  };

  switch (currentScreen) {
    case 'projects':
      return (
        <ProjectsTabScreen
          onProjectSelect={handleProjectSelect}
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
        <ProjectsTabScreen
          onProjectSelect={handleProjectSelect}
        />
      );
    
    default:
      return (
        <ProjectsTabScreen
          onProjectSelect={handleProjectSelect}
        />
      );
  }
}
