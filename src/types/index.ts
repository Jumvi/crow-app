// Types généraux de l'application AgroFinance RDC
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  location?: string;
  investmentTotal?: number;
  projectsSupported?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'agriculture' | 'elevage' | 'peche' | 'transformation';
  location: string;
  targetAmount: number;
  raisedAmount: number;
  roi: number; // Return on Investment en pourcentage
  duration: number; // en mois
  startDate: Date;
  endDate: Date;
  farmer: {
    id: string;
    name: string;
    avatar?: string;
    experience: number; // années d'expérience
  };
  status: 'active' | 'funded' | 'completed' | 'cancelled';
  investors: number;
  minimumInvestment: number;
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Investment {
  id: string;
  projectId: string;
  userId: string;
  amount: number;
  expectedReturn: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Types pour la navigation
export type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetails: { projectId: string };
  Profile: { userId?: string };
  Investment: { projectId: string };
  Portfolio: undefined;
};

// Types pour les formulaires
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  name: string;
  location: string;
  confirmPassword: string;
}

export interface InvestmentForm {
  projectId: string;
  amount: number;
  terms: boolean;
}
