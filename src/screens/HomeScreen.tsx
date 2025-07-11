import React from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { ProjectCard } from '../components/ProjectCard';
import { Button, Typography } from '../components/ui';
import { APP_CONFIG, COLORS, PROJECT_CATEGORIES } from '../constants';
import { projectsData } from '../constants/projectsData';
import { useAuth } from '../hooks';
import { Project } from '../types';

interface HomeScreenProps {
  onNavigateToProjects: () => void;
  onProjectSelect: (project: Project) => void;
  onNavigateToProfile?: () => void;
}

export const HomeScreen = ({ onNavigateToProjects, onProjectSelect, onNavigateToProfile }: HomeScreenProps) => {
  const { user, isAuthenticated, logout } = useAuth();

  const featuredProjects = projectsData.slice(0, 3);

  return (
    <ScrollView style={tw`flex-1 bg-[#F2EFE9]`}>
      {/* Header avec fond naturel */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1595117882577-0ea83e1baffe?w=800&h=400&fit=crop' }}
        style={tw`pt-12 pb-8 px-6`}
        imageStyle={tw`opacity-20`}
      >
        <View style={[tw`absolute inset-0`, { backgroundColor: COLORS.forestGreen }]} />
        <View style={tw`flex-row items-center justify-between relative z-10`}>
          <View style={tw`flex-1`}>
            <Typography variant="caption" style={tw`text-white opacity-90 mb-1`}>
            </Typography>
            <Typography variant="h2" style={tw`text-white font-bold`}>
              {isAuthenticated ? user?.name : ' AgroFinance RDC'}
            </Typography>
            <Typography variant="body" style={tw`text-white opacity-80 mt-1`}>
              {APP_CONFIG.tagline}
            </Typography>
          </View>
          
          {isAuthenticated && (
            <View style={tw`items-center gap-3`}>
              <TouchableOpacity
                onPress={onNavigateToProfile}
                style={[tw`w-12 h-12 rounded-full items-center justify-center`, { backgroundColor: COLORS.cream }]}
              >
                <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                  {user?.name?.charAt(0)}
                </Typography>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={logout}
                style={[tw`px-3 py-1 rounded-full`, { backgroundColor: COLORS.cream, opacity: 0.9 }]}
              >
                <Typography variant="caption" style={[tw`font-semibold`, { color: COLORS.forestGreen }]}>
                  Déconnexion
                </Typography>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>

      {/* Section inspirante */}
      <View style={tw`px-6 py-8`}>
        <View style={[tw`rounded-2xl p-6`, { backgroundColor: COLORS.lightGreen }]}>
          <Typography variant="h3" style={[tw`font-bold mb-2`, { color: COLORS.forestGreen }]}>
            🌱 Cultivez l'avenir ensemble
          </Typography>
          <Typography variant="body" style={[tw`leading-6`, { color: COLORS.earthBrown }]}>
            Investissez dans l'agriculture congolaise et participez à la transformation de notre économie rurale.
          </Typography>
        </View>
      </View>

      {/* Stats en vedette */}
      <View style={tw`px-6 -mt-4`}>
        <View style={tw`flex-row gap-4`}>
          <View style={[tw`flex-1 bg-white rounded-xl p-4 shadow-sm`]}>
            <Typography variant="h2" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
              124
            </Typography>
            <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
              Projets financés
            </Typography>
          </View>
          
          <View style={[tw`flex-1 bg-white rounded-xl p-4 shadow-sm`]}>
            <Typography variant="h2" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
              89%
            </Typography>
            <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
              Taux de succès
            </Typography>
          </View>
          
          <View style={[tw`flex-1 bg-white rounded-xl p-4 shadow-sm`]}>
            <Typography variant="h2" style={[tw`font-bold`, { color: COLORS.success }]}>
              2.5M
            </Typography>
            <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
              USD investis
            </Typography>
          </View>
        </View>
      </View>

      {/* Catégories */}
      <View style={tw`px-6 mt-8`}>
        <Typography variant="h3" style={[tw`font-semibold mb-4`, { color: COLORS.forestGreen }]}>
          Explorez par catégorie
        </Typography>
        
        <View style={tw`flex-row flex-wrap gap-3`}>
          {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => (
            <TouchableOpacity
              key={key}
              style={[
                tw`bg-white rounded-full px-4 py-3 flex-row items-center shadow-sm`,
                tw`border border-gray-100`
              ]}
              onPress={() => console.log(`Catégorie: ${key}`)}
            >
              <Text style={tw`text-base mr-2`}>{category.icon}</Text>
              <Typography variant="caption" style={[tw`font-medium`, { color: category.color }]}>
                {category.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Projets en vedette */}
      <View style={tw`px-6 mt-8`}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <Typography variant="h3" style={[tw`font-semibold`, { color: COLORS.forestGreen }]}>
            Projets en vedette
          </Typography>
          <TouchableOpacity onPress={onNavigateToProjects}>
            <Typography variant="caption" style={[tw`font-medium`, { color: COLORS.earthBrown }]}>
              Voir tout
            </Typography>
          </TouchableOpacity>
        </View>
        
        <View style={tw`gap-4`}>
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPress={() => onProjectSelect(project)}
            />
          ))}
        </View>
      </View>

      {/* Boutons d'action principaux */}
      <View style={tw`px-6 mt-8`}>
        <Typography variant="h3" style={[tw`font-semibold mb-4`, { color: COLORS.forestGreen }]}>
          Commencez maintenant
        </Typography>
        
        <View style={tw`gap-3`}>
          <Button
            title="🌾 Créer un projet agricole"
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => console.log('Créer projet')}
            style={{ backgroundColor: COLORS.forestGreen }}
          />
          
          <Button
            title="💰 Explorer les investissements"
            variant="outline"
            size="lg"
            fullWidth
            onPress={onNavigateToProjects}
            style={{ borderColor: COLORS.earthBrown }}
          />
        </View>
      </View>

      {/* Témoignages/Success stories */}
      <View style={tw`px-6 mt-8 mb-6`}>
        <Typography variant="h3" style={[tw`font-semibold mb-4`, { color: COLORS.forestGreen }]}>
          Histoires de succès
        </Typography>
        
        <View style={[tw`bg-white rounded-xl p-5 shadow-sm border-l-4`, { borderLeftColor: COLORS.sunYellow }]}>
          <View style={tw`flex-row items-center mb-3`}>
            <View style={[tw`w-10 h-10 rounded-full items-center justify-center mr-3`, { backgroundColor: COLORS.lightGreen }]}>
              <Text style={tw`text-lg`}>👨‍🌾</Text>
            </View>
            <View>
              <Typography variant="body" style={[tw`font-semibold`, { color: COLORS.forestGreen }]}>
                Jean Mukendi
              </Typography>
              <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                Fermier, Kinshasa
              </Typography>
            </View>
          </View>
          
          <Typography variant="body" style={[tw`italic leading-6`, { color: COLORS.gray[700] }]}>
            "Grâce à AgroFinance RDC, j'ai pu agrandir ma ferme de maïs et tripler ma production. Mes revenus ont augmenté de 180% en 8 mois."
          </Typography>
          
          <View style={tw`flex-row items-center mt-3`}>
            <Typography variant="caption" style={[tw`font-semibold`, { color: COLORS.sunYellow }]}>
              ROI: 18% • 23 investisseurs
            </Typography>
          </View>
        </View>
      </View>

      {/* Barre de navigation bottom (mock) */}
      <View style={[tw`flex-row items-center justify-around py-4 px-6 bg-white border-t border-gray-200 mt-4`]}>
        <TouchableOpacity style={tw`items-center`}>
          <Text style={tw`text-2xl mb-1`}>🏠</Text>
          <Typography variant="caption" style={[tw`font-medium`, { color: COLORS.forestGreen }]}>
            Accueil
          </Typography>
        </TouchableOpacity>
        
        <TouchableOpacity style={tw`items-center`} onPress={onNavigateToProjects}>
          <Text style={tw`text-2xl mb-1`}>🌾</Text>
          <Typography variant="caption" style={[{ color: COLORS.gray[500] }]}>
            Projets
          </Typography>
        </TouchableOpacity>
        
        <TouchableOpacity style={tw`items-center`}>
          <Text style={tw`text-2xl mb-1`}>📊</Text>
          <Typography variant="caption" style={[{ color: COLORS.gray[500] }]}>
            Portfolio
          </Typography>
        </TouchableOpacity>
        
        <TouchableOpacity style={tw`items-center`}>
          <Text style={tw`text-2xl mb-1`}>👤</Text>
          <Typography variant="caption" style={[{ color: COLORS.gray[500] }]}>
            Profil
          </Typography>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
