import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Store pour l'état général de l'app
interface AppState {
  theme: 'light' | 'dark';
  language: 'fr' | 'en';
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'fr' | 'en') => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  language: 'fr',
  
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
}));
