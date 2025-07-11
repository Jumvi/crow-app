import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { Button, Input, Typography } from '../components/ui';
import { COLORS, PROJECT_CATEGORIES } from '../constants';
import { useAuth } from '../hooks';

interface CreateProjectFormData {
  title: string;
  description: string;
  targetAmount: string;
  duration: string;
  category: string;
  location: string;
  expectedReturn: string;
  riskLevel: 'Faible' | 'Modéré' | 'Élevé';
  images: string[];
  businessPlan: string;
  useOfFunds: string;
}

export const CreateProjectScreen = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreateProjectFormData>({
    title: '',
    description: '',
    targetAmount: '',
    duration: '',
    category: '',
    location: '',
    expectedReturn: '',
    riskLevel: 'Modéré',
    images: [],
    businessPlan: '',
    useOfFunds: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
        if (!formData.description.trim()) newErrors.description = 'La description est requise';
        if (!formData.category) newErrors.category = 'La catégorie est requise';
        if (!formData.location.trim()) newErrors.location = 'La localisation est requise';
        break;
      case 2:
        if (!formData.targetAmount.trim()) newErrors.targetAmount = 'Le montant cible est requis';
        if (!formData.duration.trim()) newErrors.duration = 'La durée est requise';
        if (!formData.expectedReturn.trim()) newErrors.expectedReturn = 'Le retour attendu est requis';
        break;
      case 3:
        if (!formData.businessPlan.trim()) newErrors.businessPlan = 'Le plan d\'affaires est requis';
        if (!formData.useOfFunds.trim()) newErrors.useOfFunds = 'L\'utilisation des fonds est requise';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      'Projet soumis !',
      'Votre projet a été soumis avec succès. Notre équipe l\'examinera dans les 48h.',
      [
        {
          text: 'OK',
          onPress: () => router.push('/projects'),
        },
      ]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, result.assets[0].uri],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const renderStepIndicator = () => (
    <View style={tw`flex-row justify-center items-center mb-8`}>
      {[1, 2, 3, 4].map((step) => (
        <View key={step} style={tw`flex-row items-center`}>
          <View
            style={[
              tw`w-8 h-8 rounded-full flex items-center justify-center`,
              step <= currentStep
                ? { backgroundColor: COLORS.forestGreen }
                : tw`bg-gray-300`,
            ]}
          >
            <Typography
              variant="caption"
              style={tw`font-bold ${step <= currentStep ? 'text-white' : 'text-gray-600'}`}
            >
              {step}
            </Typography>
          </View>
          {step < 4 && (
            <View
              style={[
                tw`w-8 h-1 mx-2`,
                step < currentStep
                  ? { backgroundColor: COLORS.forestGreen }
                  : tw`bg-gray-300`,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View>
      <Typography variant="h3" style={[tw`font-bold mb-6`, { color: COLORS.forestGreen }]}>
        Informations générales
      </Typography>

      <Input
        label="Titre du projet *"
        value={formData.title}
        onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
        placeholder="Ex: Culture de tomates biologiques"
        error={errors.title}
        style={tw`mb-4`}
      />

      <View style={tw`mb-4`}>
        <Typography variant="body" style={[tw`font-semibold mb-2`, { color: COLORS.earthBrown }]}>
          Description du projet *
        </Typography>
        <Input
          value={formData.description}
          onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
          placeholder="Décrivez votre projet agricole en détail..."
          multiline
          numberOfLines={4}
          error={errors.description}
        />
      </View>

      <View style={tw`mb-4`}>
        <Typography variant="body" style={[tw`font-semibold mb-2`, { color: COLORS.earthBrown }]}>
          Catégorie *
        </Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-2`}>
          {Object.entries(PROJECT_CATEGORIES).map(([key, category]) => (
            <TouchableOpacity
              key={key}
              style={[
                tw`px-4 py-2 rounded-full mr-3 border`,
                formData.category === category.label
                  ? { backgroundColor: COLORS.forestGreen, borderColor: COLORS.forestGreen }
                  : { borderColor: COLORS.lightGreen },
              ]}
              onPress={() => setFormData(prev => ({ ...prev, category: category.label }))}
            >
              <Typography
                variant="caption"
                style={[
                  tw`font-medium`,
                  formData.category === category.label
                    ? tw`text-white`
                    : { color: COLORS.forestGreen },
                ]}
              >
                {category.icon} {category.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {errors.category && (
          <Typography variant="caption" style={tw`text-red-500 mt-1`}>
            {errors.category}
          </Typography>
        )}
      </View>

      <Input
        label="Localisation *"
        value={formData.location}
        onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
        placeholder="Ex: Kinshasa, RDC"
        error={errors.location}
        style={tw`mb-4`}
      />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Typography variant="h3" style={[tw`font-bold mb-6`, { color: COLORS.forestGreen }]}>
        Financement
      </Typography>

      <Input
        label="Montant cible (USD) *"
        value={formData.targetAmount}
        onChangeText={(text) => setFormData(prev => ({ ...prev, targetAmount: text }))}
        placeholder="Ex: 50000"
        keyboardType="numeric"
        error={errors.targetAmount}
        style={tw`mb-4`}
      />

      <Input
        label="Durée du projet (mois) *"
        value={formData.duration}
        onChangeText={(text) => setFormData(prev => ({ ...prev, duration: text }))}
        placeholder="Ex: 12"
        keyboardType="numeric"
        error={errors.duration}
        style={tw`mb-4`}
      />

      <Input
        label="Retour attendu (%) *"
        value={formData.expectedReturn}
        onChangeText={(text) => setFormData(prev => ({ ...prev, expectedReturn: text }))}
        placeholder="Ex: 15"
        keyboardType="numeric"
        error={errors.expectedReturn}
        style={tw`mb-4`}
      />

      <View style={tw`mb-4`}>
        <Typography variant="body" style={[tw`font-semibold mb-2`, { color: COLORS.earthBrown }]}>
          Niveau de risque
        </Typography>
        <View style={tw`flex-row`}>
          {(['Faible', 'Modéré', 'Élevé'] as const).map((risk) => (
            <TouchableOpacity
              key={risk}
              style={[
                tw`flex-1 py-3 rounded-lg mr-2 border`,
                formData.riskLevel === risk
                  ? { backgroundColor: COLORS.forestGreen, borderColor: COLORS.forestGreen }
                  : { borderColor: COLORS.lightGreen },
              ]}
              onPress={() => setFormData(prev => ({ ...prev, riskLevel: risk }))}
            >
              <Typography
                variant="caption"
                style={[
                  tw`text-center font-medium`,
                  formData.riskLevel === risk
                    ? tw`text-white`
                    : { color: COLORS.forestGreen },
                ]}
              >
                {risk}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Typography variant="h3" style={[tw`font-bold mb-6`, { color: COLORS.forestGreen }]}>
        Plan d'affaires
      </Typography>

      <View style={tw`mb-4`}>
        <Typography variant="body" style={[tw`font-semibold mb-2`, { color: COLORS.earthBrown }]}>
          Plan d'affaires détaillé *
        </Typography>
        <Input
          value={formData.businessPlan}
          onChangeText={(text) => setFormData(prev => ({ ...prev, businessPlan: text }))}
          placeholder="Décrivez votre stratégie, votre marché cible, vos prévisions financières..."
          multiline
          numberOfLines={6}
          error={errors.businessPlan}
        />
      </View>

      <View style={tw`mb-4`}>
        <Typography variant="body" style={[tw`font-semibold mb-2`, { color: COLORS.earthBrown }]}>
          Utilisation des fonds *
        </Typography>
        <Input
          value={formData.useOfFunds}
          onChangeText={(text) => setFormData(prev => ({ ...prev, useOfFunds: text }))}
          placeholder="Expliquez comment vous comptez utiliser les fonds collectés..."
          multiline
          numberOfLines={4}
          error={errors.useOfFunds}
        />
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View>
      <Typography variant="h3" style={[tw`font-bold mb-6`, { color: COLORS.forestGreen }]}>
        Images et documents
      </Typography>

      <View style={tw`mb-6`}>
        <Typography variant="body" style={[tw`font-semibold mb-2`, { color: COLORS.earthBrown }]}>
          Photos du projet
        </Typography>
        <Typography variant="caption" style={tw`text-gray-600 mb-4`}>
          Ajoutez des photos pour illustrer votre projet (terrain, équipements, etc.)
        </Typography>

        <TouchableOpacity
          style={[
            tw`border-2 border-dashed rounded-lg p-6 items-center`,
            { borderColor: COLORS.lightGreen },
          ]}
          onPress={pickImage}
        >
          <Typography variant="body" style={[tw`text-center`, { color: COLORS.forestGreen }]}>
            📷 Ajouter une photo
          </Typography>
        </TouchableOpacity>

        {formData.images.length > 0 && (
          <View style={tw`mt-4`}>
            <Typography variant="body" style={[tw`font-semibold mb-2`, { color: COLORS.earthBrown }]}>
              Photos ajoutées ({formData.images.length})
            </Typography>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {formData.images.map((uri, index) => (
                <View key={index} style={tw`mr-3 relative`}>
                  <Image source={{ uri }} style={tw`w-20 h-20 rounded-lg`} />
                  <TouchableOpacity
                    style={tw`absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center`}
                    onPress={() => removeImage(index)}
                  >
                    <Typography variant="caption" style={tw`text-white font-bold`}>
                      ×
                    </Typography>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Résumé du projet */}
      <View style={[tw`rounded-xl p-4 mb-6`, { backgroundColor: COLORS.lightGreen }]}>
        <Typography variant="h3" style={[tw`font-bold mb-3`, { color: COLORS.forestGreen }]}>
          📋 Résumé de votre projet
        </Typography>
        <Typography variant="caption" style={[tw`mb-1`, { color: COLORS.earthBrown }]}>
          <Text style={tw`font-bold`}>Titre:</Text> {formData.title}
        </Typography>
        <Typography variant="caption" style={[tw`mb-1`, { color: COLORS.earthBrown }]}>
          <Text style={tw`font-bold`}>Catégorie:</Text> {formData.category}
        </Typography>
        <Typography variant="caption" style={[tw`mb-1`, { color: COLORS.earthBrown }]}>
          <Text style={tw`font-bold`}>Montant:</Text> ${formData.targetAmount} USD
        </Typography>
        <Typography variant="caption" style={[tw`mb-1`, { color: COLORS.earthBrown }]}>
          <Text style={tw`font-bold`}>Durée:</Text> {formData.duration} mois
        </Typography>
        <Typography variant="caption" style={[{ color: COLORS.earthBrown }]}>
          <Text style={tw`font-bold`}>Localisation:</Text> {formData.location}
        </Typography>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-[#F2EFE9]`}>
      {/* Header */}
      <View style={[tw`pt-12 pb-6 px-6`, { backgroundColor: COLORS.forestGreen }]}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity onPress={() => router.back()}>
            <Typography variant="body" style={tw`text-white font-medium`}>
              ← Retour
            </Typography>
          </TouchableOpacity>
          <Typography variant="h3" style={tw`text-white font-bold`}>
            Créer un projet
          </Typography>
          <View style={tw`w-16`} />
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-6 py-6`}>
          {renderStepIndicator()}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation buttons */}
          <View style={tw`flex-row justify-between mt-8`}>
            {currentStep > 1 && (
              <Button
                title="Précédent"
                variant="outline"
                size="md"
                onPress={handlePrevious}
                style={tw`flex-1 mr-3`}
              />
            )}
            <Button
              title={currentStep === totalSteps ? 'Soumettre le projet' : 'Suivant'}
              variant="primary"
              size="md"
              onPress={handleNext}
              style={[
                tw`flex-1 ${currentStep > 1 ? 'ml-3' : ''}`,
                { backgroundColor: COLORS.forestGreen }
              ]}
            />
          </View>

          {/* Note de sécurité */}
          <View style={tw`mt-6 p-4 bg-blue-50 rounded-lg`}>
            <Typography variant="caption" style={tw`text-blue-800 text-center`}>
              🔒 Vos informations sont sécurisées et seront examinées par notre équipe avant publication.
            </Typography>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
