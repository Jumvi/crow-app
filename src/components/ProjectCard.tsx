import { Image, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { COLORS, PROJECT_CATEGORIES, RISK_LEVELS } from '../constants';
import { Project } from '../types';
import { Typography } from './ui';

interface ProjectCardProps {
  project: Project;
  onPress: () => void;
}

export const ProjectCard = ({ project, onPress }: ProjectCardProps) => {
  const progressPercentage = (project.raisedAmount / project.targetAmount) * 100;
  const category = PROJECT_CATEGORIES[project.category];
  const riskLevel = RISK_LEVELS[project.riskLevel];

  return (
    <TouchableOpacity
      style={tw`bg-white rounded-2xl shadow-sm mr-4 w-72`}
      onPress={onPress}
    >
      {/* Image du projet */}
      <View style={tw`relative`}>
        <Image
          source={{ uri: project.image }}
          style={tw`w-full h-40 rounded-t-2xl`}
          resizeMode="cover"
        />
        
        {/* Badge catégorie */}
        <View style={[tw`absolute top-3 left-3 px-2 py-1 rounded-full`, { backgroundColor: category.color }]}>
          <Typography variant="caption" style={tw`text-white text-xs font-medium`}>
            {category.icon} {category.label}
          </Typography>
        </View>
        
        {/* Badge ROI */}
        <View style={[tw`absolute top-3 right-3 px-3 py-1 rounded-full`, { backgroundColor: COLORS.sunYellow }]}>
          <Typography variant="caption" style={tw`text-black text-xs font-bold`}>
            ROI {project.roi}%
          </Typography>
        </View>
      </View>

      {/* Contenu */}
      <View style={tw`p-4`}>
        {/* Titre et localisation */}
        <Typography variant="h3" style={[tw`mb-1 font-bold`, { color: COLORS.forestGreen }]}>
          {project.title}
        </Typography>
        
        <Typography variant="caption" style={[tw`mb-3`, { color: COLORS.earthBrown }]}>
          📍 {project.location}
        </Typography>

        {/* Fermier */}
        <View style={tw`flex-row items-center mb-3`}>
          <View style={[tw`w-8 h-8 rounded-full items-center justify-center mr-2`, { backgroundColor: COLORS.lightGreen }]}>
            <Typography variant="caption" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
              {project.farmer.name.charAt(0)}
            </Typography>
          </View>
          <View style={tw`flex-1`}>
            <Typography variant="caption" style={tw`font-medium`}>
              {project.farmer.name}
            </Typography>
            <Typography variant="caption" style={tw`text-gray-500`}>
              {project.farmer.experience} ans d'expérience
            </Typography>
          </View>
        </View>

        {/* Barre de progression */}
        <View style={tw`mb-3`}>
          <View style={tw`flex-row justify-between items-center mb-1`}>
            <Typography variant="caption" style={tw`text-gray-600`}>
              Collecté
            </Typography>
            <Typography variant="caption" style={tw`font-medium`}>
              {Math.round(progressPercentage)}%
            </Typography>
          </View>
          
          <View style={[tw`h-2 rounded-full`, { backgroundColor: COLORS.cream }]}>
            <View
              style={[
                tw`h-2 rounded-full`,
                { 
                  backgroundColor: COLORS.forestGreen,
                  width: `${Math.min(progressPercentage, 100)}%`
                }
              ]}
            />
          </View>
          
          <View style={tw`flex-row justify-between items-center mt-1`}>
            <Typography variant="caption" style={tw`font-bold text-gray-800`}>
              ${project.raisedAmount.toLocaleString()}
            </Typography>
            <Typography variant="caption" style={tw`text-gray-500`}>
              sur ${project.targetAmount.toLocaleString()}
            </Typography>
          </View>
        </View>

        {/* Informations additionnelles */}
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center`}>
            <Typography variant="caption" style={tw`text-gray-500 mr-1`}>
              ⏱️ {project.duration} mois
            </Typography>
          </View>
          
          <View style={tw`flex-row items-center`}>
            <Typography variant="caption" style={tw`text-gray-500 mr-1`}>
              👥 {project.investors}
            </Typography>
            <View style={[tw`w-2 h-2 rounded-full ml-2`, { backgroundColor: riskLevel.color }]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
