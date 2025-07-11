import React, { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Button, Input, Typography } from '../components/ui';
import { APP_CONFIG, COLORS } from '../constants';

interface SignUpScreenProps {
  onSignUp: (userData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    userType: 'investor' | 'farmer';
  }) => void;
  onBackToLogin: () => void;
}

export const SignUpScreen = ({ onSignUp, onBackToLogin }: SignUpScreenProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    userType: 'investor' as 'investor' | 'farmer'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'La localisation est requise';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onSignUp({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        userType: formData.userType
      });
      
      Alert.alert(
        'Compte créé avec succès !',
        `Bienvenue ${formData.name} dans la communauté AgroFinance RDC !`,
        [{ text: 'Continuer', style: 'default' }]
      );
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la création du compte');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={tw`flex-1`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={tw`flex-1 bg-[#F2EFE9]`} showsVerticalScrollIndicator={false}>
        {/* Header avec fond inspirant */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop' }}
          style={tw`pt-12 pb-8 px-6 relative`}
          imageStyle={tw`opacity-30`}
        >
          <View style={[tw`absolute inset-0`, { backgroundColor: COLORS.forestGreen }]} />
          
          <View style={tw`relative z-10`}>
            <TouchableOpacity
              onPress={onBackToLogin}
              style={tw`mb-4 p-2 rounded-full bg-white bg-opacity-20 self-start`}
            >
              <Typography style={tw`text-white text-lg`}>←</Typography>
            </TouchableOpacity>
            
            <Typography variant="h1" style={tw`text-white font-bold mb-2`}>
              Rejoignez-nous
            </Typography>
            <Typography variant="body" style={tw`text-white opacity-90 leading-6`}>
              Créez votre compte et participez à la révolution agricole en RDC
            </Typography>
          </View>
        </ImageBackground>

        {/* Formulaire */}
        <View style={tw`px-6 -mt-6 relative z-10`}>
          <View style={tw`bg-white rounded-t-3xl pt-8 pb-6 px-6 shadow-lg`}>
            
            {/* Sélection du type d'utilisateur */}
            <View style={tw`mb-6`}>
              <Typography variant="body" style={[tw`font-semibold mb-3`, { color: COLORS.forestGreen }]}>
                Je suis un(e) :
              </Typography>
              
              <View style={tw`flex-row gap-3`}>
                <TouchableOpacity
                  onPress={() => updateFormData('userType', 'investor')}
                  style={[
                    tw`flex-1 p-4 rounded-xl border-2 items-center`,
                    formData.userType === 'investor'
                      ? { borderColor: COLORS.forestGreen, backgroundColor: COLORS.lightGreen }
                      : { borderColor: COLORS.gray[300], backgroundColor: 'white' }
                  ]}
                >
                  <Typography style={tw`text-2xl mb-2`}>💰</Typography>
                  <Typography 
                    variant="body" 
                    style={[
                      tw`font-semibold text-center`,
                      { color: formData.userType === 'investor' ? COLORS.forestGreen : COLORS.gray[600] }
                    ]}
                  >
                    Investisseur
                  </Typography>
                  <Typography 
                    variant="caption" 
                    style={[
                      tw`text-center mt-1`,
                      { color: formData.userType === 'investor' ? COLORS.earthBrown : COLORS.gray[500] }
                    ]}
                  >
                    Je veux investir dans l'agriculture
                  </Typography>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => updateFormData('userType', 'farmer')}
                  style={[
                    tw`flex-1 p-4 rounded-xl border-2 items-center`,
                    formData.userType === 'farmer'
                      ? { borderColor: COLORS.forestGreen, backgroundColor: COLORS.lightGreen }
                      : { borderColor: COLORS.gray[300], backgroundColor: 'white' }
                  ]}
                >
                  <Typography style={tw`text-2xl mb-2`}>🌾</Typography>
                  <Typography 
                    variant="body" 
                    style={[
                      tw`font-semibold text-center`,
                      { color: formData.userType === 'farmer' ? COLORS.forestGreen : COLORS.gray[600] }
                    ]}
                  >
                    Fermier
                  </Typography>
                  <Typography 
                    variant="caption" 
                    style={[
                      tw`text-center mt-1`,
                      { color: formData.userType === 'farmer' ? COLORS.earthBrown : COLORS.gray[500] }
                    ]}
                  >
                    J'ai un projet agricole
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>

            {/* Champs du formulaire */}
            <View style={tw`gap-4`}>
              <Input
                label="Nom complet *"
                value={formData.name}
                onChangeText={(value) => updateFormData('name', value)}
                placeholder="Ex: Jean Mukendi"
                error={errors.name}
              />

              <Input
                label="Email *"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="votre@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <Input
                label="Téléphone *"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                placeholder="+243 XXX XXX XXX"
                keyboardType="phone-pad"
                error={errors.phone}
              />

              <Input
                label="Localisation *"
                value={formData.location}
                onChangeText={(value) => updateFormData('location', value)}
                placeholder="Ex: Kinshasa, RDC"
                error={errors.location}
              />

              <Input
                label="Mot de passe *"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                placeholder="Minimum 6 caractères"
                secureTextEntry
                error={errors.password}
              />

              <Input
                label="Confirmer le mot de passe *"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                placeholder="Répétez votre mot de passe"
                secureTextEntry
                error={errors.confirmPassword}
              />
            </View>

            {/* Avantages */}
            <View style={[tw`rounded-xl p-4 mt-6`, { backgroundColor: COLORS.lightGreen }]}>
              <Typography variant="body" style={[tw`font-semibold mb-3`, { color: COLORS.forestGreen }]}>
                {formData.userType === 'investor' ? '💰 Avantages Investisseur :' : '🌾 Avantages Fermier :'}
              </Typography>
              
              {formData.userType === 'investor' ? (
                <View style={tw`gap-2`}>
                  <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                    ✓ ROI attractifs de 15% à 25%
                  </Typography>
                  <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                    ✓ Impact social et environnemental
                  </Typography>
                  <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                    ✓ Projets vérifiés et sécurisés
                  </Typography>
                </View>
              ) : (
                <View style={tw`gap-2`}>
                  <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                    ✓ Accès au financement rapide
                  </Typography>
                  <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                    ✓ Support technique gratuit
                  </Typography>
                  <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                    ✓ Formation en ligne incluse
                  </Typography>
                </View>
              )}
            </View>

            <Button
              title={isLoading ? 'Création en cours...' : 'Créer mon compte'}
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
              onPress={handleSignUp}
              style={{ backgroundColor: COLORS.forestGreen, marginTop: 24 }}
            />

            {/* Lien vers connexion */}
            <TouchableOpacity 
              onPress={onBackToLogin}
              style={tw`mt-6 items-center`}
            >
              <Typography variant="body" style={[{ color: COLORS.earthBrown }]}>
                Vous avez déjà un compte ?{' '}
                <Typography variant="body" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                  Se connecter
                </Typography>
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section de confiance */}
        <View style={tw`px-6 mt-6 mb-8`}>
          <View style={tw`bg-white rounded-xl p-6`}>
            <Typography variant="h3" style={[tw`font-bold text-center mb-4`, { color: COLORS.forestGreen }]}>
              🛡️ Vos données sont sécurisées
            </Typography>
            
            <View style={tw`flex-row justify-around items-center`}>
              <View style={tw`items-center flex-1`}>
                <Typography style={tw`text-2xl mb-2`}>🔒</Typography>
                <Typography variant="caption" style={[tw`text-center`, { color: COLORS.earthBrown }]}>
                  Cryptage SSL
                </Typography>
              </View>
              
              <View style={tw`items-center flex-1`}>
                <Typography style={tw`text-2xl mb-2`}>✅</Typography>
                <Typography variant="caption" style={[tw`text-center`, { color: COLORS.earthBrown }]}>
                  Vérification KYC
                </Typography>
              </View>
              
              <View style={tw`items-center flex-1`}>
                <Typography style={tw`text-2xl mb-2`}>🏦</Typography>
                <Typography variant="caption" style={[tw`text-center`, { color: COLORS.earthBrown }]}>
                  Paiements sécurisés
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
