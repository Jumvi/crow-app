import { useState } from 'react';
import { apiService } from '../services/api';
import { useAuthStore } from '../store';
import { LoginForm, RegisterForm } from '../types';

// Hook pour l'authentification
export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, setUser, setToken, logout, setLoading } = useAuthStore();

  const login = async (credentials: LoginForm) => {
    try {
      setLoading(true);
      const response = await apiService.login(credentials);
      
      if (response.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterForm) => {
    try {
      setLoading(true);
      const response = await apiService.register(userData);
      
      if (response.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        return { success: true };
      }
      
      return { success: false, error: response.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
};

// Hook pour les appels API génériques
export const useApi = <T,>(apiCall: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
};
