import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Culture de Maïs Bio - Kinshasa',
    description: 'Production de maïs biologique pour nourrir 500 familles dans la périphérie de Kinshasa',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
    category: 'agriculture',
    location: 'Kinshasa, RDC',
    targetAmount: 15000,
    raisedAmount: 8500,
    roi: 18,
    duration: 8,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-09-15'),
    farmer: {
      id: 'f1',
      name: 'Jean Mukendi',
      avatar: '',
      experience: 12
    },
    status: 'active',
    investors: 23,
    minimumInvestment: 100,
    riskLevel: 'low',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Élevage de Porc - Lubumbashi',
    description: 'Ferme porcine moderne avec 200 porcs pour la région du Katanga',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop',
    category: 'elevage',
    location: 'Lubumbashi, RDC',
    targetAmount: 25000,
    raisedAmount: 18750,
    roi: 22,
    duration: 12,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2025-02-01'),
    farmer: {
      id: 'f2',
      name: 'Marie Kabongo',
      avatar: '',
      experience: 8
    },
    status: 'active',
    investors: 31,
    minimumInvestment: 200,
    riskLevel: 'medium',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    title: 'Pisciculture - Matadi',
    description: 'Élevage de tilapia dans des bassins écologiques au bord du fleuve Congo',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    category: 'peche',
    location: 'Matadi, RDC',
    targetAmount: 12000,
    raisedAmount: 9600,
    roi: 16,
    duration: 10,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2025-01-01'),
    farmer: {
      id: 'f3',
      name: 'Paul Mbuyi',
      avatar: '',
      experience: 15
    },
    status: 'active',
    investors: 19,
    minimumInvestment: 150,
    riskLevel: 'low',
    createdAt: new Date('2024-02-15')
  },
  {
    id: '4',
    title: 'Transformation Manioc - Mbandaka',
    description: 'Usine de transformation du manioc en farine et amidon',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
    category: 'transformation',
    location: 'Mbandaka, RDC',
    targetAmount: 35000,
    raisedAmount: 21000,
    roi: 25,
    duration: 18,
    startDate: new Date('2024-01-10'),
    endDate: new Date('2025-07-10'),
    farmer: {
      id: 'f4',
      name: 'Grace Nzeza',
      avatar: '',
      experience: 10
    },
    status: 'active',
    investors: 42,
    minimumInvestment: 300,
    riskLevel: 'medium',
    createdAt: new Date('2024-01-05')
  }
];
