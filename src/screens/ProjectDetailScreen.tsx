import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Button, Input, Typography } from '../components/ui';
import { COLORS, PROJECT_CATEGORIES, RISK_LEVELS } from '../constants';
import { Project } from '../types';

interface ProjectDetailScreenProps {
  project: Project;
  onBack: () => void;
  onInvest: (amount: number) => void;
}

export const ProjectDetailScreen = ({ project, onBack, onInvest }: ProjectDetailScreenProps) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'details' | 'updates'>('overview');

  const progressPercentage = (project.raisedAmount / project.targetAmount) * 100;
  const category = PROJECT_CATEGORIES[project.category];
  const riskLevel = RISK_LEVELS[project.riskLevel];
  const daysLeft = Math.ceil((new Date(project.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const expectedReturn = parseInt(investmentAmount) * (project.roi / 100);

  const handleInvest = () => {
    const amount = parseInt(investmentAmount);
    if (amount && amount > 0) {
      Alert.alert(
        'Confirmer l\'investissement',
        `Investir $${amount.toLocaleString()} dans "${project.title}"?\n\nRetour attendu: $${expectedReturn.toLocaleString()} (${project.roi}%)`,
        [
          { text: 'Annuler', style: 'cancel' },
          { 
            text: 'Confirmer', 
            onPress: () => {
              onInvest(amount);
              setShowInvestModal(false);
              setInvestmentAmount('');
            }
          }
        ]
      );
    }
  };

  return (
    <View style={tw`flex-1 bg-[#F2EFE9]`}>
      {/* Header avec image */}
      <View style={tw`relative`}>
        <Image
          source={{ uri: project.image }}
          style={tw`w-full h-64`}
          resizeMode="cover"
        />
        
        {/* Overlay gradient */}
        <View style={[tw`absolute inset-0`, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
        
        {/* Bouton retour */}
        <TouchableOpacity
          style={[tw`absolute top-12 left-4 w-10 h-10 rounded-full items-center justify-center`, { backgroundColor: 'rgba(255,255,255,0.9)' }]}
          onPress={onBack}
        >
          <Typography style={tw`text-lg`}>←</Typography>
        </TouchableOpacity>
        
        {/* Badge catégorie */}
        <View style={[tw`absolute top-12 right-4 px-3 py-1 rounded-full`, { backgroundColor: category.color }]}>
          <Typography variant="caption" style={tw`text-white font-medium`}>
            {category.icon} {category.label}
          </Typography>
        </View>
        
        {/* ROI Badge */}
        <View style={[tw`absolute bottom-4 right-4 px-4 py-2 rounded-full`, { backgroundColor: COLORS.sunYellow }]}>
          <Typography variant="body" style={tw`text-black font-bold`}>
            ROI {project.roi}%
          </Typography>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Informations principales */}
        <View style={tw`bg-white -mt-6 rounded-t-3xl pt-6 px-6`}>
          <Typography variant="h2" style={[tw`font-bold mb-2`, { color: COLORS.forestGreen }]}>
            {project.title}
          </Typography>
          
          <View style={tw`flex-row items-center mb-4`}>
            <Typography variant="body" style={[tw`mr-4`, { color: COLORS.earthBrown }]}>
              📍 {project.location}
            </Typography>
            <View style={tw`flex-row items-center`}>
              <View style={[tw`w-3 h-3 rounded-full mr-2`, { backgroundColor: riskLevel.color }]} />
              <Typography variant="caption" style={[tw`font-medium`, { color: riskLevel.color }]}>
                {riskLevel.label}
              </Typography>
            </View>
          </View>

          {/* Barre de progression principale */}
          <View style={tw`mb-6`}>
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                ${project.raisedAmount.toLocaleString()}
              </Typography>
              <Typography variant="body" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
                {Math.round(progressPercentage)}%
              </Typography>
            </View>
            
            <View style={[tw`h-3 rounded-full mb-2`, { backgroundColor: COLORS.cream }]}>
              <View
                style={[
                  tw`h-3 rounded-full`,
                  { 
                    backgroundColor: COLORS.forestGreen,
                    width: `${Math.min(progressPercentage, 100)}%`
                  }
                ]}
              />
            </View>
            
            <Typography variant="caption" style={tw`text-gray-600`}>
              sur ${project.targetAmount.toLocaleString()} · {daysLeft} jours restants
            </Typography>
          </View>

          {/* Stats rapides */}
          <View style={tw`flex-row gap-3 mb-6`}>
            <View style={[tw`flex-1 bg-gray-50 rounded-xl p-3`]}>
              <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                {project.investors}
              </Typography>
              <Typography variant="caption" style={tw`text-gray-600`}>
                Investisseurs
              </Typography>
            </View>
            
            <View style={[tw`flex-1 bg-gray-50 rounded-xl p-3`]}>
              <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.earthBrown }]}>
                {project.duration}
              </Typography>
              <Typography variant="caption" style={tw`text-gray-600`}>
                Mois
              </Typography>
            </View>
            
            <View style={[tw`flex-1 bg-gray-50 rounded-xl p-3`]}>
              <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
                ${Math.round(project.targetAmount * project.roi / 100).toLocaleString()}
              </Typography>
              <Typography variant="caption" style={tw`text-gray-600`}>
                Retour attendu
              </Typography>
            </View>
          </View>

          {/* Fermier */}
          <View style={tw`bg-gray-50 rounded-xl p-4 mb-6`}>
            <Typography variant="h3" style={[tw`font-semibold mb-3`, { color: COLORS.forestGreen }]}>
              👨‍🌾 Fermier responsable
            </Typography>
            
            <View style={tw`flex-row items-center`}>
              <View style={[tw`w-12 h-12 rounded-full items-center justify-center mr-4`, { backgroundColor: COLORS.lightGreen }]}>
                <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                  {project.farmer.name.charAt(0)}
                </Typography>
              </View>
              
              <View style={tw`flex-1`}>
                <Typography variant="body" style={tw`font-semibold mb-1`}>
                  {project.farmer.name}
                </Typography>
                <Typography variant="caption" style={tw`text-gray-600 mb-1`}>
                  ⭐ {project.farmer.experience} ans d'expérience
                </Typography>
                <Typography variant="caption" style={[{ color: COLORS.success }]}>
                  ✅ Fermier vérifié
                </Typography>
              </View>
            </View>
          </View>

          {/* Onglets */}
          <View style={tw`flex-row mb-4`}>
            {[
              { key: 'overview', label: 'Aperçu' },
              { key: 'details', label: 'Détails' },
              { key: 'updates', label: 'Mises à jour' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setSelectedTab(tab.key as any)}
                style={[
                  tw`flex-1 py-3 rounded-lg mr-2`,
                  selectedTab === tab.key 
                    ? { backgroundColor: COLORS.forestGreen }
                    : { backgroundColor: COLORS.lightGreen }
                ]}
              >
                <Typography 
                  variant="caption" 
                  style={[
                    tw`text-center font-medium`,
                    { color: selectedTab === tab.key ? 'white' : COLORS.forestGreen }
                  ]}
                >
                  {tab.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>

          {/* Contenu des onglets */}
          {selectedTab === 'overview' && (
            <View style={tw`mb-6`}>
              <Typography variant="body" style={[tw`leading-6 mb-4`, { color: COLORS.gray[700] }]}>
                {project.description}
              </Typography>
              
              {/* Impact Social et Environnemental */}
              {project.impactMetrics && (
                <View style={tw`bg-green-50 border border-green-200 rounded-xl p-4 mb-4`}>
                  <Typography variant="h3" style={[tw`font-semibold mb-3`, { color: COLORS.forestGreen }]}>
                    🌍 Impact Social & Environnemental
                  </Typography>
                  <View style={tw`flex-row flex-wrap gap-4`}>
                    <View style={tw`flex-1 min-w-20`}>
                      <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                        {project.impactMetrics.jobsCreated}
                      </Typography>
                      <Typography variant="caption" style={tw`text-gray-600`}>Emplois créés</Typography>
                    </View>
                    <View style={tw`flex-1 min-w-20`}>
                      <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
                        {project.impactMetrics.familiesBenefited}
                      </Typography>
                      <Typography variant="caption" style={tw`text-gray-600`}>Familles bénéficiaires</Typography>
                    </View>
                    <View style={tw`flex-1 min-w-20`}>
                      <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.success }]}>
                        {project.impactMetrics.carbonOffset}T
                      </Typography>
                      <Typography variant="caption" style={tw`text-gray-600`}>CO2 compensé</Typography>
                    </View>
                    <View style={tw`flex-1 min-w-20`}>
                      <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                        {project.impactMetrics.waterSaved}L
                      </Typography>
                      <Typography variant="caption" style={tw`text-gray-600`}>Eau économisée</Typography>
                    </View>
                  </View>
                </View>
              )}
              
              <View style={tw`bg-yellow-50 border border-yellow-200 rounded-xl p-4`}>
                <Typography variant="h3" style={[tw`font-semibold mb-2`, { color: COLORS.sunYellow }]}>
                  💰 Analyse financière
                </Typography>
                <Typography variant="caption" style={tw`text-gray-700 leading-5`}>
                  • Investissement minimum: ${project.minimumInvestment.toLocaleString()}{'\n'}
                  • ROI projeté: {project.roi}% sur {project.duration} mois{'\n'}
                  • Revenus projetés: ${project.businessPlan?.projectedRevenue.toLocaleString() || 'N/A'}{'\n'}
                  • Remboursement: trimestriel{'\n'}
                  • Garanties: récolte assurée à 80%
                </Typography>
              </View>
            </View>
          )}

          {selectedTab === 'details' && (
            <View style={tw`mb-6`}>
              {/* Plan d'Affaires */}
              {project.businessPlan && (
                <View style={tw`mb-6`}>
                  <Typography variant="h3" style={[tw`font-semibold mb-3`, { color: COLORS.forestGreen }]}>
                    📊 Plan d'Affaires
                  </Typography>
                  
                  <View style={tw`bg-white rounded-xl p-4 mb-4 border border-gray-200`}>
                    <Typography variant="body" style={[tw`font-semibold mb-2`, { color: COLORS.earthBrown }]}>
                      📈 Analyse du Marché
                    </Typography>
                    <Typography variant="caption" style={[tw`leading-5 mb-4`, { color: COLORS.gray[700] }]}>
                      {project.businessPlan.marketAnalysis}
                    </Typography>
                    
                    <Typography variant="body" style={[tw`font-semibold mb-2`, { color: COLORS.earthBrown }]}>
                      🎯 Positionnement Concurrentiel
                    </Typography>
                    <Typography variant="caption" style={[tw`leading-5`, { color: COLORS.gray[700] }]}>
                      {project.businessPlan.competition}
                    </Typography>
                  </View>
                  
                  {/* Risques et Mitigation */}
                  <View style={tw`bg-orange-50 border border-orange-200 rounded-xl p-4`}>
                    <Typography variant="body" style={[tw`font-semibold mb-3`, { color: COLORS.warning }]}>
                      ⚠️ Gestion des Risques
                    </Typography>
                    
                    <Typography variant="caption" style={[tw`font-medium mb-2`, { color: COLORS.gray[800] }]}>
                      Risques identifiés:
                    </Typography>
                    {project.businessPlan.keyRisks.map((risk, index) => (
                      <Typography key={index} variant="caption" style={[tw`leading-4 mb-1`, { color: COLORS.gray[600] }]}>
                        • {risk}
                      </Typography>
                    ))}
                    
                    <Typography variant="caption" style={[tw`font-medium mb-2 mt-3`, { color: COLORS.gray[800] }]}>
                      Stratégies de mitigation:
                    </Typography>
                    {project.businessPlan.mitigationStrategies.map((strategy, index) => (
                      <Typography key={index} variant="caption" style={[tw`leading-4 mb-1`, { color: COLORS.success }]}>
                        ✓ {strategy}
                      </Typography>
                    ))}
                  </View>
                </View>
              )}
              
              <View style={tw`space-y-3`}>
                <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
                  <Typography variant="caption" style={tw`text-gray-600`}>Durée du projet</Typography>
                  <Typography variant="caption" style={tw`font-medium`}>{project.duration} mois</Typography>
                </View>
                
                <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
                  <Typography variant="caption" style={tw`text-gray-600`}>Statut</Typography>
                  <Typography variant="caption" style={[tw`font-medium capitalize`, { color: project.status === 'active' ? COLORS.success : COLORS.warning }]}>
                    {project.status === 'active' ? '🟢 Actif' : project.status}
                  </Typography>
                </View>
                
                <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
                  <Typography variant="caption" style={tw`text-gray-600`}>Nombre d'investisseurs</Typography>
                  <Typography variant="caption" style={tw`font-medium`}>{project.investors} personnes</Typography>
                </View>
                
                <View style={tw`flex-row justify-between py-2 border-b border-gray-100`}>
                  <Typography variant="caption" style={tw`text-gray-600`}>Date de début</Typography>
                  <Typography variant="caption" style={tw`font-medium`}>{project.startDate.toLocaleDateString('fr-FR')}</Typography>
                </View>
                
                <View style={tw`flex-row justify-between py-2`}>
                  <Typography variant="caption" style={tw`text-gray-600`}>Assurance récolte</Typography>
                  <Typography variant="caption" style={[tw`font-medium`, { color: COLORS.success }]}>✅ Incluse</Typography>
                </View>
              </View>
            </View>
          )}

          {selectedTab === 'updates' && (
            <View style={tw`mb-6`}>
              <Typography variant="h3" style={[tw`font-semibold mb-4`, { color: COLORS.forestGreen }]}>
                📢 Mises à jour du projet
              </Typography>
              
              {project.updates && project.updates.length > 0 ? (
                project.updates.map((update, index) => (
                  <View key={index} style={tw`mb-6 bg-white rounded-xl p-4 border border-gray-200`}>
                    <View style={tw`flex-row items-center justify-between mb-3`}>
                      <Typography variant="body" style={[tw`font-semibold`, { color: COLORS.forestGreen }]}>
                        {update.title}
                      </Typography>
                      <Typography variant="caption" style={tw`text-gray-500`}>
                        {update.date.toLocaleDateString('fr-FR')}
                      </Typography>
                    </View>
                    
                    <Typography variant="caption" style={[tw`leading-5 mb-3`, { color: COLORS.gray[700] }]}>
                      {update.content}
                    </Typography>
                    
                    {update.images && update.images.length > 0 && (
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`-mx-1`}>
                        {update.images.map((imageUrl, imgIndex) => (
                          <Image
                            key={imgIndex}
                            source={{ uri: imageUrl }}
                            style={tw`w-24 h-24 rounded-lg mr-3`}
                            resizeMode="cover"
                          />
                        ))}
                      </ScrollView>
                    )}
                  </View>
                ))
              ) : (
                <View style={tw`bg-gray-50 rounded-xl p-6 items-center`}>
                  <Typography variant="body" style={tw`text-gray-500 text-center`}>
                    Aucune mise à jour disponible pour le moment.
                  </Typography>
                  <Typography variant="caption" style={tw`text-gray-400 text-center mt-2`}>
                    Les nouvelles du projet seront publiées ici.
                  </Typography>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bouton d'investissement fixe */}
      <View style={tw`bg-white px-6 py-4 border-t border-gray-200`}>
        <Button
          title="💰 Investir maintenant"
          variant="primary"
          size="lg"
          fullWidth
          style={{ backgroundColor: COLORS.forestGreen }}
          onPress={() => setShowInvestModal(true)}
        />
      </View>

      {/* Modal d'investissement */}
      <Modal
        visible={showInvestModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={tw`flex-1 bg-white`}>
          <View style={tw`px-6 py-4 border-b border-gray-200`}>
            <View style={tw`flex-row items-center justify-between`}>
              <Typography variant="h3" style={[tw`font-bold`, { color: COLORS.forestGreen }]}>
                Investir dans le projet
              </Typography>
              <TouchableOpacity onPress={() => setShowInvestModal(false)}>
                <Typography variant="h3">✕</Typography>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={tw`flex-1 px-6 py-6`}>
            <Typography variant="body" style={[tw`mb-4`, { color: COLORS.forestGreen }]}>
              {project.title}
            </Typography>

            <Input
              label="Montant d'investissement (USD)"
              value={investmentAmount}
              onChangeText={setInvestmentAmount}
              keyboardType="numeric"
              placeholder="Ex: 500"
            />

            {investmentAmount && parseInt(investmentAmount) > 0 && (
              <View style={[tw`rounded-xl p-4 mb-4`, { backgroundColor: COLORS.lightGreen }]}>
                <Typography variant="h3" style={[tw`font-bold mb-2`, { color: COLORS.forestGreen }]}>
                  📈 Simulation d'investissement
                </Typography>
                
                <View style={tw`space-y-2`}>
                  <View style={tw`flex-row justify-between`}>
                    <Typography variant="caption">Montant investi:</Typography>
                    <Typography variant="caption" style={tw`font-bold`}>
                      ${parseInt(investmentAmount).toLocaleString()}
                    </Typography>
                  </View>
                  
                  <View style={tw`flex-row justify-between`}>
                    <Typography variant="caption">ROI ({project.roi}%):</Typography>
                    <Typography variant="caption" style={[tw`font-bold`, { color: COLORS.sunYellow }]}>
                      ${expectedReturn.toLocaleString()}
                    </Typography>
                  </View>
                  
                  <View style={tw`flex-row justify-between border-t border-green-200 pt-2`}>
                    <Typography variant="body" style={tw`font-bold`}>Retour total:</Typography>
                    <Typography variant="body" style={[tw`font-bold`, { color: COLORS.success }]}>
                      ${(parseInt(investmentAmount) + expectedReturn).toLocaleString()}
                    </Typography>
                  </View>
                </View>
              </View>
            )}

            <View style={tw`bg-gray-50 rounded-xl p-4 mb-6`}>
              <Typography variant="caption" style={tw`text-gray-700 leading-5`}>
                ⚠️ Important:{'\n'}
                • Investissement minimum: $100{'\n'}
                • Les retours sont basés sur les projections{'\n'}
                • Investissement sujet aux risques agricoles{'\n'}
                • Remboursement trimestriel sur {project.duration} mois
              </Typography>
            </View>

            <Button
              title={`Investir $${investmentAmount ? parseInt(investmentAmount).toLocaleString() : '0'}`}
              variant="primary"
              size="lg"
              fullWidth
              disabled={!investmentAmount || parseInt(investmentAmount) < 100}
              style={{ backgroundColor: COLORS.forestGreen }}
              onPress={handleInvest}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
