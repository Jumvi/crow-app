import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../store';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

type AuthScreen = 'login' | 'signup';

export const AuthNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');
  const { login, signUp, isLoading } = useAuthStore();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials);
    } catch (error) {
      Alert.alert('Erreur de connexion', 'Vérifiez vos identifiants et réessayez.');
    }
  };

  const handleSignUp = async (userData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    userType: 'investor' | 'farmer';
  }) => {
    try {
      await signUp(userData);
    } catch (error) {
      Alert.alert('Erreur d\'inscription', 'Une erreur est survenue lors de la création du compte.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Réinitialisation du mot de passe',
      'Un lien de réinitialisation sera envoyé à votre adresse email.',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Envoyer', onPress: () => console.log('Reset password') }
      ]
    );
  };

  switch (currentScreen) {
    case 'login':
      return (
        <LoginScreen
          onLogin={handleLogin}
          onSignUp={() => setCurrentScreen('signup')}
          onForgotPassword={handleForgotPassword}
        />
      );
    
    case 'signup':
      return (
        <SignUpScreen
          onSignUp={handleSignUp}
          onBackToLogin={() => setCurrentScreen('login')}
        />
      );
    
    default:
      return (
        <LoginScreen
          onLogin={handleLogin}
          onSignUp={() => setCurrentScreen('signup')}
          onForgotPassword={handleForgotPassword}
        />
      );
  }
};
