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
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (userData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    userType: 'investor' | 'farmer';
  }) => Promise<void>;
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
      
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          // Simulation d'appel API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Utilisateur de démo basé sur l'email
          const mockUser: User = {
            id: credentials.email.includes('investor') ? 'user-1' : 'user-2',
            email: credentials.email,
            name: credentials.email.includes('investor') ? 'Investisseur Démo' : 'Fermier Démo',
            avatar: '',
            location: 'Kinshasa, RDC',
            investmentTotal: credentials.email.includes('investor') ? 25000 : 0,
            projectsSupported: credentials.email.includes('investor') ? 8 : 2,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          set({ 
            user: mockUser, 
            token: 'demo-token-' + Date.now(),
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      signUp: async (userData) => {
        set({ isLoading: true });
        try {
          // Simulation d'appel API
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const newUser: User = {
            id: 'user-' + Date.now(),
            email: userData.email,
            name: userData.name,
            avatar: '',
            location: userData.location,
            investmentTotal: 0,
            projectsSupported: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          set({ 
            user: newUser, 
            token: 'token-' + Date.now(),
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
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
