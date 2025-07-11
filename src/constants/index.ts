// Constantes de l'application AgroFinance RDC
export const APP_CONFIG = {
  name: 'AgroFinance RDC',
  tagline: 'Investir dans l\'agriculture, transformer des vies',
  version: '1.0.0',
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://your-api.com/api',
  storageKeys: {
    auth: 'auth-storage',
    theme: 'theme-storage',
  },
};

// Palette de couleurs AgroFinance RDC
export const COLORS = {
  // Couleurs principales
  forestGreen: '#2F5D50',    // Vert Forêt (boutons, titres principaux)
  earthBrown: '#7B4B2A',     // Marron Terre (éléments secondaires)
  lightGreen: '#A8C3A0',     // Vert Clair (fonds doux, hover)
  sunYellow: '#FDCB58',      // Jaune Soleil (ROI, badges)
  cream: '#F2EFE9',          // Crème (background général)
  
  // Couleurs utilitaires
  white: '#ffffff',
  black: '#000000',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  
  // Nuances de gris
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Typographies selon les spécifications
export const TYPOGRAPHY = {
  title: {
    size: 32,
    weight: 'bold',
  },
  subtitle: {
    size: 24,
    weight: 'semibold',
  },
  body: {
    size: 16,
    weight: 'normal',
  },
  label: {
    size: 14,
    weight: 'normal',
  },
  button: {
    size: 16,
    weight: 'semibold',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

// Catégories de projets agricoles
export const PROJECT_CATEGORIES = {
  agriculture: {
    label: 'Agriculture',
    icon: '🌾',
    color: COLORS.forestGreen,
  },
  elevage: {
    label: 'Élevage',
    icon: '🐄',
    color: COLORS.earthBrown,
  },
  peche: {
    label: 'Pêche',
    icon: '🐟',
    color: COLORS.lightGreen,
  },
  transformation: {
    label: 'Transformation',
    icon: '🏭',
    color: COLORS.sunYellow,
  },
};

// Niveaux de risque
export const RISK_LEVELS = {
  low: {
    label: 'Faible',
    color: COLORS.success,
    icon: '🟢',
  },
  medium: {
    label: 'Moyen',
    color: COLORS.warning,
    icon: '🟡',
  },
  high: {
    label: 'Élevé',
    color: COLORS.danger,
    icon: '🔴',
  },
};
