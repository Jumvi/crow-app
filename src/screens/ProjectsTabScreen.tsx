import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { ProjectCard } from '../../src/components/ProjectCard';
import { Button, Typography } from '../../src/components/ui';
import { COLORS, PROJECT_CATEGORIES } from '../../src/constants';
import { projectsData } from '../../src/constants/projectsData';
import { Project } from '../../src/types';

interface ProjectsTabScreenProps {
  onProjectSelect: (project: Project) => void;
}

export const ProjectsTabScreen = ({ onProjectSelect }: ProjectsTabScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'roi' | 'amount' | 'deadline'>('roi');

  // Filtrage et tri des projets
  const filteredProjects = projectsData
    .filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'roi':
          return b.roi - a.roi;
        case 'amount':
          return b.targetAmount - a.targetAmount;
        case 'deadline':
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        default:
          return 0;
      }
    });

  return (
    <ScrollView style={tw`flex-1 bg-[#F2EFE9]`}>
      {/* Header sans bouton retour */}
      <View style={[tw`pt-12 pb-6 px-6`, { backgroundColor: COLORS.forestGreen }]}>
        <Typography variant="h2" style={tw`text-white font-bold mb-2`}>
          Projets
        </Typography>
        <Typography variant="body" style={tw`text-white opacity-90`}>
          Découvrez des opportunités d'investissement prometteuses
        </Typography>
      </View>

      {/* Barre de recherche */}
      <View style={tw`px-6 -mt-3`}>
        <View style={tw`bg-white rounded-xl p-4 shadow-sm flex-row items-center`}>
          <TextInput
            style={tw`flex-1 text-base`}
            placeholder="Rechercher un projet..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.gray[400]}
          />
          <TouchableOpacity style={[tw`p-2 rounded-lg`, { backgroundColor: COLORS.forestGreen }]}>
            <Typography style={tw`text-white`}>🔍</Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtres par catégorie */}
      <View style={tw`px-6 mt-6`}>
        <Typography variant="h3" style={[tw`font-semibold mb-3`, { color: COLORS.forestGreen }]}>
          Catégories
        </Typography>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`-mx-6 px-6`}>
          <View style={tw`flex-row gap-3`}>
            <TouchableOpacity
              onPress={() => setSelectedCategory('all')}
              style={[
                tw`px-4 py-2 rounded-full`,
                selectedCategory === 'all' 
                  ? { backgroundColor: COLORS.forestGreen }
                  : { backgroundColor: 'white', borderWidth: 1, borderColor: COLORS.gray[300] }
              ]}
            >
              <Typography 
                variant="caption" 
                style={[
                  tw`font-medium`,
                  { color: selectedCategory === 'all' ? 'white' : COLORS.forestGreen }
                ]}
              >
                Tous
              </Typography>
            </TouchableOpacity>

            {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedCategory(key)}
                style={[
                  tw`px-4 py-2 rounded-full flex-row items-center`,
                  selectedCategory === key 
                    ? { backgroundColor: COLORS.forestGreen }
                    : { backgroundColor: 'white', borderWidth: 1, borderColor: COLORS.gray[300] }
                ]}
              >
                <Typography style={tw`mr-1`}>{category.icon}</Typography>
                <Typography 
                  variant="caption" 
                  style={[
                    tw`font-medium`,
                    { color: selectedCategory === key ? 'white' : category.color }
                  ]}
                >
                  {category.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Options de tri */}
      <View style={tw`px-6 mt-6`}>
        <View style={tw`flex-row items-center gap-4`}>
          <Typography variant="body" style={[tw`font-medium`, { color: COLORS.earthBrown }]}>
            Trier par:
          </Typography>
          
          {[
            { key: 'roi', label: 'ROI' },
            { key: 'amount', label: 'Montant' },
            { key: 'deadline', label: 'Échéance' }
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => setSortBy(option.key as any)}
              style={[
                tw`px-3 py-1 rounded-lg`,
                sortBy === option.key 
                  ? { backgroundColor: COLORS.sunYellow }
                  : { backgroundColor: COLORS.lightGreen }
              ]}
            >
              <Typography 
                variant="caption" 
                style={[
                  tw`font-medium`,
                  { color: sortBy === option.key ? COLORS.forestGreen : COLORS.earthBrown }
                ]}
              >
                {option.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stats des résultats */}
      <View style={tw`px-6 mt-6`}>
        <View style={tw`bg-white rounded-xl p-4 shadow-sm`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View>
              <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                {filteredProjects.length}
              </Typography>
              <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                Projets trouvés
              </Typography>
            </View>
            
            <View>
              <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
                {Math.round(filteredProjects.reduce((sum, p) => sum + p.roi, 0) / filteredProjects.length)}%
              </Typography>
              <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                ROI moyen
              </Typography>
            </View>
            
            <View>
              <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.success }]}>
                {(filteredProjects.reduce((sum, p) => sum + p.targetAmount, 0) / 1000000).toFixed(1)}M
              </Typography>
              <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                USD disponibles
              </Typography>
            </View>
          </View>
        </View>
      </View>

      {/* Liste des projets */}
      <View style={tw`px-6 mt-6`}>
        <Typography variant="h3" style={[tw`font-semibold mb-4`, { color: COLORS.forestGreen }]}>
          Projets disponibles
        </Typography>
        
        <View style={tw`gap-4`}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPress={() => onProjectSelect(project)}
              showDetailedInfo={true}
            />
          ))}
        </View>
      </View>

      {/* Call to action */}
      <View style={tw`px-6 mt-8 mb-6`}>
        <View style={[tw`rounded-xl p-6`, { backgroundColor: COLORS.lightGreen }]}>
          <Typography variant="h3" style={[tw`font-bold mb-2`, { color: COLORS.forestGreen }]}>
            💡 Vous avez un projet agricole ?
          </Typography>
          <Typography variant="body" style={[tw`mb-4 leading-6`, { color: COLORS.earthBrown }]}>
            Présentez votre projet à notre communauté d'investisseurs et obtenez le financement nécessaire.
          </Typography>
          <Button
            title="Soumettre un projet"
            variant="primary"
            size="md"
            style={{ backgroundColor: COLORS.forestGreen }}
            onPress={() => console.log('Soumettre projet')}
          />
        </View>
      </View>
    </ScrollView>
  );
};
