import React, { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Button, Input, Typography } from '../components/ui';
import { COLORS } from '../constants';

interface LoginScreenProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen = ({ onLogin, onSignUp, onForgotPassword }: LoginScreenProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onLogin({
        email: formData.email,
        password: formData.password
      });
      
    } catch (error) {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect');
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
          source={{ uri: 'https://images.unsplash.com/photo-1595117882577-0ea83e1baffe?w=800&h=600&fit=crop' }}
          style={tw`pt-16 pb-12 px-6 min-h-96`}
          imageStyle={tw`opacity-25`}
        >
          <View style={[tw`absolute inset-0`, { backgroundColor: COLORS.forestGreen }]} />
          
          <View style={tw`relative z-10 flex-1 justify-center`}>
            <View style={tw`items-center mb-8`}>
              <View style={[tw`w-20 h-20 rounded-full items-center justify-center mb-4`, { backgroundColor: COLORS.sunYellow }]}>
                <Typography variant="h1" style={tw`text-3xl`}>🌾</Typography>
              </View>
              
              <Typography variant="h1" style={tw`text-white font-bold text-center mb-2`}>
                AgroFinance RDC
              </Typography>
              <Typography variant="body" style={tw`text-white opacity-90 text-center leading-6`}>
                Cultivez l'avenir, investissez dans l'agriculture congolaise
              </Typography>
            </View>
          </View>
        </ImageBackground>

        {/* Formulaire de connexion */}
        <View style={tw`px-6 -mt-8 relative z-10`}>
          <View style={tw`bg-white rounded-t-3xl pt-8 pb-6 px-6 shadow-lg`}>
            <Typography variant="h2" style={[tw`font-bold text-center mb-2`, { color: COLORS.forestGreen }]}>
              Bon retour !
            </Typography>
            <Typography variant="body" style={[tw`text-center mb-8`, { color: COLORS.earthBrown }]}>
              Connectez-vous pour accéder à votre compte
            </Typography>

            {/* Champs du formulaire */}
            <View style={tw`gap-6`}>
              <Input
                label="Email"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="votre@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <Input
                label="Mot de passe"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                placeholder="Votre mot de passe"
                secureTextEntry
                error={errors.password}
              />
            </View>

            {/* Mot de passe oublié */}
            <TouchableOpacity 
              onPress={onForgotPassword}
              style={tw`mt-4 self-end`}
            >
              <Typography variant="caption" style={[tw`font-medium`, { color: COLORS.forestGreen }]}>
                Mot de passe oublié ?
              </Typography>
            </TouchableOpacity>

            <Button
              title={isLoading ? 'Connexion...' : 'Se connecter'}
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
              onPress={handleLogin}
              style={{ backgroundColor: COLORS.forestGreen, marginTop: 32 }}
            />

            {/* Divider */}
            <View style={tw`flex-row items-center my-8`}>
              <View style={[tw`flex-1 h-px`, { backgroundColor: COLORS.gray[300] }]} />
              <Typography variant="caption" style={[tw`mx-4`, { color: COLORS.gray[500] }]}>
                ou
              </Typography>
              <View style={[tw`flex-1 h-px`, { backgroundColor: COLORS.gray[300] }]} />
            </View>

            {/* Connexion rapide - démo */}
            <View style={tw`gap-3`}>
              <TouchableOpacity
                onPress={() => {
                  setFormData({ email: 'investor@agrofinance.cd', password: 'demo123' });
                  setTimeout(() => handleLogin(), 100);
                }}
                style={[tw`p-3 rounded-xl border border-gray-300 flex-row items-center justify-center`]}
              >
                <Typography style={tw`mr-2 text-lg`}>💰</Typography>
                <Typography variant="caption" style={[tw`font-medium flex-1 text-center`, { color: COLORS.earthBrown }]}>
                  Démo Investisseur
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setFormData({ email: 'fermier@agrofinance.cd', password: 'demo123' });
                  setTimeout(() => handleLogin(), 100);
                }}
                style={[tw`p-3 rounded-xl border border-gray-300 flex-row items-center justify-center`]}
              >
                <Typography style={tw`mr-2 text-lg`}>🌾</Typography>
                <Typography variant="caption" style={[tw`font-medium flex-1 text-center`, { color: COLORS.earthBrown }]}>
                  Démo Fermier
                </Typography>
              </TouchableOpacity>
            </View>

            {/* Lien vers inscription */}
            <TouchableOpacity 
              onPress={onSignUp}
              style={tw`mt-8 items-center`}
            >
              <Typography variant="body" style={[{ color: COLORS.earthBrown }]}>
                Pas encore de compte ?{' '}
                <Typography variant="body" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                  Créer un compte
                </Typography>
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats de confiance */}
        <View style={tw`px-6 mt-6 mb-8`}>
          <View style={tw`bg-white rounded-xl p-6`}>
            <Typography variant="h3" style={[tw`font-bold text-center mb-6`, { color: COLORS.forestGreen }]}>
              ✨ Ils nous font confiance
            </Typography>
            
            <View style={tw`flex-row justify-around items-center`}>
              <View style={tw`items-center flex-1`}>
                <Typography variant="h2" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                  500+
                </Typography>
                <Typography variant="caption" style={[tw`text-center`, { color: COLORS.earthBrown }]}>
                  Utilisateurs actifs
                </Typography>
              </View>
              
              <View style={tw`items-center flex-1`}>
                <Typography variant="h2" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
                  124
                </Typography>
                <Typography variant="caption" style={[tw`text-center`, { color: COLORS.earthBrown }]}>
                  Projets financés
                </Typography>
              </View>
              
              <View style={tw`items-center flex-1`}>
                <Typography variant="h2" style={[tw`font-bold`, { color: COLORS.success }]}>
                  2.5M
                </Typography>
                <Typography variant="caption" style={[tw`text-center`, { color: COLORS.earthBrown }]}>
                  USD investis
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
