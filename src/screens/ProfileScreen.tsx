import React, { useState } from 'react';
import { Alert, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Button, Input, Typography } from '../components/ui';
import { COLORS } from '../constants';
import { useAuth } from '../hooks';

interface ProfileScreenProps {
  onBack: () => void;
  onEditProfile: () => void;
}

export const ProfileScreen = ({ onBack, onEditProfile }: ProfileScreenProps) => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });

  const handleSaveProfile = () => {
    // Ici on ferait un appel API pour sauvegarder
    console.log('Sauvegarde du profil:', editData);
    setIsEditing(false);
    Alert.alert('Succès', 'Profil mis à jour avec succès !');
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: logout }
      ]
    );
  };

  const investmentStats = {
    totalInvested: 2500,
    activeProjects: 3,
    totalROI: 18.5,
    pendingReturns: 450
  };

  return (
    <ScrollView style={tw`flex-1 bg-[#F2EFE9]`}>
      {/* Header avec photo de profil */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1592982634425-b40eaf0eea62?w=800&h=300&fit=crop' }}
        style={tw`pt-12 pb-8 px-6 relative`}
        imageStyle={tw`opacity-20`}
      >
        <View style={[tw`absolute inset-0`, { backgroundColor: COLORS.forestGreen }]} />
        
        <View style={tw`relative z-10`}>
          <TouchableOpacity
            onPress={onBack}
            style={tw`mb-4 p-2 rounded-full bg-white bg-opacity-20 self-start`}
          >
            <Typography style={tw`text-white text-lg`}>←</Typography>
          </TouchableOpacity>
          
          <View style={tw`items-center`}>
            <View style={[tw`w-24 h-24 rounded-full items-center justify-center mb-4`, { backgroundColor: COLORS.cream }]}>
              <Typography variant="h1" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                {user?.name?.charAt(0)}
              </Typography>
            </View>
            
            <Typography variant="h2" style={tw`text-white font-bold text-center`}>
              {user?.name}
            </Typography>
            <Typography variant="body" style={tw`text-white opacity-90 text-center mt-1`}>
              {user?.userType === 'investor' ? '💰 Investisseur' : '🌾 Fermier'}
            </Typography>
            <Typography variant="caption" style={tw`text-white opacity-80 text-center mt-1`}>
              📍 {user?.location}
            </Typography>
          </View>
        </View>
      </ImageBackground>

      {/* Stats rapides */}
      {user?.userType === 'investor' && (
        <View style={tw`px-6 -mt-6 relative z-10`}>
          <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
            <Typography variant="h3" style={[tw`font-bold mb-4 text-center`, { color: COLORS.forestGreen }]}>
              📊 Mes Statistiques
            </Typography>
            
            <View style={tw`flex-row flex-wrap gap-4`}>
              <View style={tw`flex-1 items-center min-w-[45%]`}>
                <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                  ${investmentStats.totalInvested}
                </Typography>
                <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                  Total investi
                </Typography>
              </View>
              
              <View style={tw`flex-1 items-center min-w-[45%]`}>
                <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
                  {investmentStats.activeProjects}
                </Typography>
                <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                  Projets actifs
                </Typography>
              </View>
              
              <View style={tw`flex-1 items-center min-w-[45%]`}>
                <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.success }]}>
                  {investmentStats.totalROI}%
                </Typography>
                <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                  ROI moyen
                </Typography>
              </View>
              
              <View style={tw`flex-1 items-center min-w-[45%]`}>
                <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                  ${investmentStats.pendingReturns}
                </Typography>
                <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                  Retours attendus
                </Typography>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Informations personnelles */}
      <View style={tw`px-6 mt-6`}>
        <View style={tw`bg-white rounded-xl p-6 shadow-sm`}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
              👤 Informations personnelles
            </Typography>
            
            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              style={[tw`px-3 py-1 rounded-lg`, { backgroundColor: COLORS.lightGreen }]}
            >
              <Typography variant="caption" style={[tw`font-medium`, { color: COLORS.forestGreen }]}>
                {isEditing ? 'Annuler' : 'Modifier'}
              </Typography>
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <View style={tw`gap-4`}>
              <Input
                label="Nom complet"
                value={editData.name}
                onChangeText={(value) => setEditData(prev => ({ ...prev, name: value }))}
              />
              <Input
                label="Email"
                value={editData.email}
                onChangeText={(value) => setEditData(prev => ({ ...prev, email: value }))}
                keyboardType="email-address"
              />
              <Input
                label="Téléphone"
                value={editData.phone}
                onChangeText={(value) => setEditData(prev => ({ ...prev, phone: value }))}
                keyboardType="phone-pad"
              />
              <Input
                label="Localisation"
                value={editData.location}
                onChangeText={(value) => setEditData(prev => ({ ...prev, location: value }))}
              />
              
              <View style={tw`flex-row gap-3 mt-4`}>
                <Button
                  title="Sauvegarder"
                  variant="primary"
                  size="md"
                  style={{ backgroundColor: COLORS.forestGreen, flex: 1 }}
                  onPress={handleSaveProfile}
                />
                <Button
                  title="Annuler"
                  variant="secondary"
                  size="md"
                  style={{ flex: 1 }}
                  onPress={() => setIsEditing(false)}
                />
              </View>
            </View>
          ) : (
            <View style={tw`gap-4`}>
              <View style={tw`flex-row items-center`}>
                <Typography style={tw`mr-3 text-lg`}>📧</Typography>
                <View>
                  <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>Email</Typography>
                  <Typography variant="body" style={[tw`font-medium`, { color: COLORS.forestGreen }]}>
                    {user?.email}
                  </Typography>
                </View>
              </View>
              
              <View style={tw`flex-row items-center`}>
                <Typography style={tw`mr-3 text-lg`}>📱</Typography>
                <View>
                  <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>Téléphone</Typography>
                  <Typography variant="body" style={[tw`font-medium`, { color: COLORS.forestGreen }]}>
                    {user?.phone}
                  </Typography>
                </View>
              </View>
              
              <View style={tw`flex-row items-center`}>
                <Typography style={tw`mr-3 text-lg`}>📍</Typography>
                <View>
                  <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>Localisation</Typography>
                  <Typography variant="body" style={[tw`font-medium`, { color: COLORS.forestGreen }]}>
                    {user?.location}
                  </Typography>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Actions rapides */}
      <View style={tw`px-6 mt-6`}>
        <Typography variant="h3" style={[tw`font-bold mb-4`, { color: COLORS.forestGreen }]}>
          ⚡ Actions rapides
        </Typography>
        
        <View style={tw`gap-3`}>
          <TouchableOpacity
            style={tw`bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm`}
            onPress={() => console.log('Historique des transactions')}
          >
            <View style={tw`flex-row items-center`}>
              <Typography style={tw`mr-3 text-lg`}>📋</Typography>
              <Typography variant="body" style={[tw`font-medium`, { color: COLORS.earthBrown }]}>
                Historique des transactions
              </Typography>
            </View>
            <Typography style={tw`text-lg`}>→</Typography>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={tw`bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm`}
            onPress={() => console.log('Paramètres de notification')}
          >
            <View style={tw`flex-row items-center`}>
              <Typography style={tw`mr-3 text-lg`}>🔔</Typography>
              <Typography variant="body" style={[tw`font-medium`, { color: COLORS.earthBrown }]}>
                Notifications
              </Typography>
            </View>
            <Typography style={tw`text-lg`}>→</Typography>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={tw`bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm`}
            onPress={() => console.log('Support client')}
          >
            <View style={tw`flex-row items-center`}>
              <Typography style={tw`mr-3 text-lg`}>💬</Typography>
              <Typography variant="body" style={[tw`font-medium`, { color: COLORS.earthBrown }]}>
                Support client
              </Typography>
            </View>
            <Typography style={tw`text-lg`}>→</Typography>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={tw`bg-white rounded-xl p-4 flex-row items-center justify-between shadow-sm`}
            onPress={() => console.log('Conditions d\'utilisation')}
          >
            <View style={tw`flex-row items-center`}>
              <Typography style={tw`mr-3 text-lg`}>📜</Typography>
              <Typography variant="body" style={[tw`font-medium`, { color: COLORS.earthBrown }]}>
                Conditions d'utilisation
              </Typography>
            </View>
            <Typography style={tw`text-lg`}>→</Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section sécurité */}
      <View style={tw`px-6 mt-6`}>
        <Typography variant="h3" style={[tw`font-bold mb-4`, { color: COLORS.forestGreen }]}>
          🔒 Sécurité
        </Typography>
        
        <View style={tw`bg-white rounded-xl p-4 gap-3 shadow-sm`}>
          <TouchableOpacity
            style={tw`flex-row items-center justify-between py-2`}
            onPress={() => console.log('Changer mot de passe')}
          >
            <View style={tw`flex-row items-center`}>
              <Typography style={tw`mr-3 text-lg`}>🔑</Typography>
              <Typography variant="body" style={[tw`font-medium`, { color: COLORS.earthBrown }]}>
                Changer le mot de passe
              </Typography>
            </View>
            <Typography style={tw`text-lg`}>→</Typography>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={tw`flex-row items-center justify-between py-2`}
            onPress={() => console.log('Authentification 2FA')}
          >
            <View style={tw`flex-row items-center`}>
              <Typography style={tw`mr-3 text-lg`}>🛡️</Typography>
              <Typography variant="body" style={[tw`font-medium`, { color: COLORS.earthBrown }]}>
                Authentification à 2 facteurs
              </Typography>
            </View>
            <Typography style={tw`text-lg`}>→</Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bouton de déconnexion */}
      <View style={tw`px-6 mt-8 mb-8`}>
        <Button
          title="Se déconnecter"
          variant="secondary"
          size="lg"
          fullWidth
          onPress={handleLogout}
          style={{ 
            borderColor: COLORS.danger,
            borderWidth: 1
          }}
        />
        <Typography variant="caption" style={[tw`text-center mt-2`, { color: COLORS.danger }]}>
          Cette action vous déconnectera de l'application
        </Typography>
      </View>
    </ScrollView>
  );
};
