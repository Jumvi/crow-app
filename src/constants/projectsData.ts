import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Culture de Maïs Bio - Kinshasa',
    description: 'Production de maïs biologique pour nourrir 500 familles dans la périphérie de Kinshasa. Ce projet utilise des techniques agricoles durables et créera 15 emplois locaux.',
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
    createdAt: new Date('2024-01-01'),
    businessPlan: {
      marketAnalysis: 'Le marché du maïs bio à Kinshasa connaît une croissance de 15% par an avec une demande non satisfaite de 40%.',
      competition: 'Peu de concurrents dans le bio, positionnement premium.',
      projectedRevenue: 27000,
      keyRisks: ['Conditions météorologiques', 'Variation des prix'],
      mitigationStrategies: ['Assurance récolte', 'Contrats de vente à prix fixe']
    },
    impactMetrics: {
      jobsCreated: 15,
      familiesBenefited: 500,
      carbonOffset: 12,
      waterSaved: 2500
    },
    updates: [
      {
        date: new Date('2024-03-15'),
        title: 'Préparation des terres terminée',
        content: 'Les 10 hectares ont été préparés selon les standards biologiques.',
        images: ['https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=400&h=300&fit=crop']
      },
      {
        date: new Date('2024-04-01'),
        title: 'Début des semis',
        content: 'Semis de variétés de maïs résistantes à la sécheresse.',
        images: []
      }
    ]
  },
  {
    id: '2',
    title: 'Élevage de Porc - Lubumbashi',
    description: 'Ferme porcine moderne avec 200 porcs pour la région du Katanga. Installation d\'équipements de pointe et formation d\'éleveurs locaux.',
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
    createdAt: new Date('2024-01-20'),
    businessPlan: {
      marketAnalysis: 'Forte demande de viande porcine au Katanga avec un déficit de 30% par rapport à la demande.',
      competition: 'Marché fragmenté, opportunité de leadership avec des standards élevés.',
      projectedRevenue: 55000,
      keyRisks: ['Maladies animales', 'Fluctuation prix alimentaire'],
      mitigationStrategies: ['Vaccination complète', 'Production fourrage propre']
    },
    impactMetrics: {
      jobsCreated: 25,
      familiesBenefited: 800,
      carbonOffset: 8,
      waterSaved: 1500
    },
    updates: [
      {
        date: new Date('2024-03-01'),
        title: 'Construction porcheries terminée',
        content: 'Les installations répondent aux normes sanitaires internationales.',
        images: ['https://images.unsplash.com/photo-1497752531616-c3afd9760a11?w=400&h=300&fit=crop']
      }
    ]
  },
  {
    id: '3',
    title: 'Pisciculture - Matadi',
    description: 'Élevage de tilapia dans des bassins écologiques au bord du fleuve Congo. Production durable de 5 tonnes par an.',
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
    createdAt: new Date('2024-02-15'),
    businessPlan: {
      marketAnalysis: 'Demande croissante de poisson frais à Kinshasa et Matadi, marché en expansion de 20% par an.',
      competition: 'Peu de fermes piscicoles modernes, avantage concurrentiel fort.',
      projectedRevenue: 19200,
      keyRisks: ['Qualité de l\'eau', 'Mortalité des poissons'],
      mitigationStrategies: ['Système de filtration avancé', 'Surveillance vétérinaire']
    },
    impactMetrics: {
      jobsCreated: 8,
      familiesBenefited: 300,
      carbonOffset: 5,
      waterSaved: 800
    },
    updates: [
      {
        date: new Date('2024-04-15'),
        title: 'Bassins opérationnels',
        content: 'Mise en eau des bassins et introduction des premiers alevins.',
        images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop']
      }
    ]
  },
  {
    id: '4',
    title: 'Transformation Manioc - Mbandaka',
    description: 'Usine de transformation du manioc en farine et amidon pour l\'exportation et le marché local.',
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
    createdAt: new Date('2024-01-05'),
    businessPlan: {
      marketAnalysis: 'Le marché de la farine de manioc connaît une forte demande avec des prix stables et en hausse.',
      competition: 'Peu d\'usines modernes, opportunité de capture de 15% du marché régional.',
      projectedRevenue: 87500,
      keyRisks: ['Approvisionnement en manioc', 'Coûts énergétiques'],
      mitigationStrategies: ['Contrats avec producteurs locaux', 'Énergie solaire']
    },
    impactMetrics: {
      jobsCreated: 45,
      familiesBenefited: 1200,
      carbonOffset: 20,
      waterSaved: 3000
    },
    updates: [
      {
        date: new Date('2024-02-20'),
        title: 'Installation des équipements',
        content: 'Machines de transformation installées et testées avec succès.',
        images: ['https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop']
      },
      {
        date: new Date('2024-05-01'),
        title: 'Premier lot transformé',
        content: 'Production de 2 tonnes de farine de haute qualité.',
        images: []
      }
    ]
  }
];
