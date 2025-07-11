import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Button, Typography } from '../components/ui';
import { COLORS } from '../constants';
import { useAuth } from '../hooks';

interface Investment {
  id: string;
  projectId: string;
  projectTitle: string;
  projectImage: string;
  amountInvested: number;
  currentValue: number;
  roi: number;
  status: 'active' | 'completed' | 'pending';
  startDate: string;
  expectedReturn: number;
  lastUpdate: string;
  farmerName: string;
  location: string;
  category: string;
}

interface PortefeuilleScreenProps {
  onProjectSelect?: (projectId: string) => void;
}

export const PortefeuilleScreen = ({ onProjectSelect }: PortefeuilleScreenProps) => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'1M' | '3M' | '6M' | '1Y'>('6M');

  // Données mock des investissements
  const investments: Investment[] = [
    {
      id: 'inv-1',
      projectId: 'proj-1',
      projectTitle: 'Ferme Écologique Maïs Bio',
      projectImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400',
      amountInvested: 1000,
      currentValue: 1180,
      roi: 18,
      status: 'active',
      startDate: '2024-03-15',
      expectedReturn: 1250,
      lastUpdate: '2024-11-05',
      farmerName: 'Jean Mukendi',
      location: 'Kinshasa, RDC',
      category: 'Céréales'
    },
    {
      id: 'inv-2',
      projectId: 'proj-2',
      projectTitle: 'Culture Café Premium',
      projectImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
      amountInvested: 750,
      currentValue: 892,
      roi: 18.9,
      status: 'active',
      startDate: '2024-01-20',
      expectedReturn: 950,
      lastUpdate: '2024-10-28',
      farmerName: 'Marie Kabila',
      location: 'Sud-Kivu, RDC',
      category: 'Café'
    },
    {
      id: 'inv-3',
      projectId: 'proj-3',
      projectTitle: 'Élevage Poules Pondeuses',
      projectImage: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400',
      amountInvested: 500,
      currentValue: 625,
      roi: 25,
      status: 'completed',
      startDate: '2024-06-10',
      expectedReturn: 625,
      lastUpdate: '2024-11-01',
      farmerName: 'Paul Tshisekedi',
      location: 'Lubumbashi, RDC',
      category: 'Élevage'
    }
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amountInvested, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGains = totalCurrentValue - totalInvested;
  const globalROI = ((totalCurrentValue - totalInvested) / totalInvested) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return COLORS.success;
      case 'completed': return COLORS.forestGreen;
      case 'pending': return COLORS.warning;
      default: return COLORS.gray[500];
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'completed': return 'Terminé';
      case 'pending': return 'En attente';
      default: return 'Inconnu';
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-[#F2EFE9]`}>
      {/* Header */}
      <View style={[tw`pt-12 pb-6 px-6`, { backgroundColor: COLORS.forestGreen }]}>
        <Typography variant="h2" style={tw`text-white font-bold mb-2`}>
          💼 Mon Portefeuille
        </Typography>
        <Typography variant="body" style={tw`text-white opacity-90`}>
          Suivez vos investissements agricoles en temps réel
        </Typography>
      </View>

      {/* Résumé financier */}
      <View style={tw`px-6 -mt-6 relative z-10`}>
        <View style={tw`bg-white rounded-2xl p-6 shadow-lg`}>
          <Typography variant="h3" style={[tw`font-bold mb-4 text-center`, { color: COLORS.forestGreen }]}>
            📊 Vue d'ensemble
          </Typography>
          
          <View style={tw`flex-row flex-wrap gap-4`}>
            <View style={tw`flex-1 items-center min-w-[45%]`}>
              <Typography variant="h2" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                ${totalInvested}
              </Typography>
              <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                Total investi
              </Typography>
            </View>
            
            <View style={tw`flex-1 items-center min-w-[45%]`}>
              <Typography variant="h2" style={[tw`font-bold`, { color: COLORS.success }]}>
                ${totalCurrentValue}
              </Typography>
              <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                Valeur actuelle
              </Typography>
            </View>
            
            <View style={tw`flex-1 items-center min-w-[45%]`}>
              <Typography variant="h2" style={[tw`font-bold`, { color: totalGains >= 0 ? COLORS.success : COLORS.danger }]}>
                +${totalGains}
              </Typography>
              <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                Gains totaux
              </Typography>
            </View>
            
            <View style={tw`flex-1 items-center min-w-[45%]`}>
              <Typography variant="h2" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
                {globalROI.toFixed(1)}%
              </Typography>
              <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                ROI global
              </Typography>
            </View>
          </View>
        </View>
      </View>

      {/* Période de performance */}
      <View style={tw`px-6 mt-6`}>
        <Typography variant="h3" style={[tw`font-bold mb-3`, { color: COLORS.forestGreen }]}>
          📈 Performance
        </Typography>
        
        <View style={tw`flex-row gap-2 mb-4`}>
          {['1M', '3M', '6M', '1Y'].map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period as any)}
              style={[
                tw`px-4 py-2 rounded-lg flex-1`,
                selectedPeriod === period 
                  ? { backgroundColor: COLORS.forestGreen }
                  : { backgroundColor: COLORS.lightGreen }
              ]}
            >
              <Typography 
                variant="caption" 
                style={[
                  tw`font-medium text-center`,
                  { color: selectedPeriod === period ? 'white' : COLORS.forestGreen }
                ]}
              >
                {period}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>

        <View style={tw`bg-white rounded-xl p-4 shadow-sm`}>
          <Typography variant="body" style={[tw`text-center`, { color: COLORS.earthBrown }]}>
            Graphique de performance sur {selectedPeriod}
          </Typography>
          <View style={[tw`h-32 rounded-lg mt-3 items-center justify-center`, { backgroundColor: COLORS.lightGreen }]}>
            <Typography style={tw`text-4xl mb-2`}>📈</Typography>
            <Typography variant="caption" style={[{ color: COLORS.forestGreen }]}>
              Graphique disponible prochainement
            </Typography>
          </View>
        </View>
      </View>

      {/* Liste des investissements */}
      <View style={tw`px-6 mt-6`}>
        <Typography variant="h3" style={[tw`font-bold mb-4`, { color: COLORS.forestGreen }]}>
          🌾 Mes Investissements ({investments.length})
        </Typography>
        
        <View style={tw`gap-4`}>
          {investments.map((investment) => (
            <TouchableOpacity
              key={investment.id}
              onPress={() => onProjectSelect?.(investment.projectId)}
              style={tw`bg-white rounded-xl p-4 shadow-sm`}
            >
              <View style={tw`flex-row items-start gap-4`}>
                <View style={[tw`w-16 h-16 rounded-lg items-center justify-center`, { backgroundColor: COLORS.lightGreen }]}>
                  <Typography style={tw`text-2xl`}>🌱</Typography>
                </View>
                
                <View style={tw`flex-1`}>
                  <View style={tw`flex-row items-center justify-between mb-2`}>
                    <Typography variant="body" style={[tw`font-bold flex-1`, { color: COLORS.forestGreen }]}>
                      {investment.projectTitle}
                    </Typography>
                    <View style={[tw`px-2 py-1 rounded-full`, { backgroundColor: getStatusColor(investment.status) }]}>
                      <Typography variant="caption" style={tw`text-white font-medium`}>
                        {getStatusLabel(investment.status)}
                      </Typography>
                    </View>
                  </View>
                  
                  <Typography variant="caption" style={[tw`mb-2`, { color: COLORS.earthBrown }]}>
                    👨‍🌾 {investment.farmerName} • 📍 {investment.location}
                  </Typography>
                  
                  <View style={tw`flex-row justify-between items-center`}>
                    <View>
                      <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
                        Investi: ${investment.amountInvested}
                      </Typography>
                      <Typography variant="caption" style={[{ color: COLORS.success }]}>
                        Valeur: ${investment.currentValue}
                      </Typography>
                    </View>
                    
                    <View style={tw`items-end`}>
                      <Typography variant="body" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
                        +{investment.roi}% ROI
                      </Typography>
                      <Typography variant="caption" style={[{ color: investment.currentValue > investment.amountInvested ? COLORS.success : COLORS.danger }]}>
                        +${investment.currentValue - investment.amountInvested}
                      </Typography>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Actions rapides */}
      <View style={tw`px-6 mt-6`}>
        <Typography variant="h3" style={[tw`font-bold mb-4`, { color: COLORS.forestGreen }]}>
          ⚡ Actions rapides
        </Typography>
        
        <View style={tw`flex-row gap-3 mb-4`}>
          <Button
            title="💰 Retirer gains"
            variant="primary"
            size="md"
            style={{ backgroundColor: COLORS.success, flex: 1 }}
            onPress={() => console.log('Retirer gains')}
          />
          <Button
            title="📊 Rapport détaillé"
            variant="secondary"
            size="md"
            style={{ flex: 1 }}
            onPress={() => console.log('Rapport détaillé')}
          />
        </View>

        <View style={tw`bg-white rounded-xl p-4 shadow-sm`}>
          <View style={tw`flex-row items-center gap-3 mb-3`}>
            <Typography style={tw`text-2xl`}>💡</Typography>
            <Typography variant="body" style={[tw`font-bold flex-1`, { color: COLORS.forestGreen }]}>
              Conseil d'investissement
            </Typography>
          </View>
          <Typography variant="body" style={[tw`leading-6`, { color: COLORS.earthBrown }]}>
            Votre portefeuille performe bien ! Considérez diversifier vers l'élevage pour équilibrer les risques.
          </Typography>
        </View>
      </View>

      {/* Call to action */}
      <View style={tw`px-6 mt-6 mb-8`}>
        <View style={[tw`rounded-xl p-6`, { backgroundColor: COLORS.lightGreen }]}>
          <Typography variant="h3" style={[tw`font-bold mb-2`, { color: COLORS.forestGreen }]}>
            🚀 Prêt à investir davantage ?
          </Typography>
          <Typography variant="body" style={[tw`mb-4 leading-6`, { color: COLORS.earthBrown }]}>
            Découvrez de nouveaux projets agricoles prometteurs et diversifiez votre portefeuille.
          </Typography>
          <Button
            title="Découvrir des projets"
            variant="primary"
            size="md"
            style={{ backgroundColor: COLORS.forestGreen }}
            onPress={() => console.log('Découvrir projets')}
          />
        </View>
      </View>
    </ScrollView>
  );
};
