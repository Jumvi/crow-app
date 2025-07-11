import { Text as RNText, TextProps } from 'react-native';

interface TailwindTextProps extends TextProps {
  className?: string;
}

// Mapping des classes Tailwind vers les styles React Native
const tailwindToStyle = (className: string = '') => {
  const styles: any = {};
  
  // Debug: log de la className reçue
  console.log('Text className reçue:', className);
  
  // Couleurs de texte - ordre important (plus spécifique en premier)
  if (className.includes('text-red-600')) {
    styles.color = '#dc2626';
    console.log('Couleur rouge 600 appliquée');
  } else if (className.includes('text-red-500')) {
    styles.color = '#ef4444';
    console.log('Couleur rouge 500 appliquée');
  }
  
  if (className.includes('text-blue-600')) {
    styles.color = '#2563eb';
    console.log('Couleur bleu 600 appliquée');
  } else if (className.includes('text-blue-500')) {
    styles.color = '#3b82f6';
    console.log('Couleur bleu 500 appliquée');
  }
  
  if (className.includes('text-green-600')) {
    styles.color = '#16a34a';
    console.log('Couleur vert 600 appliquée');
  } else if (className.includes('text-green-500')) {
    styles.color = '#22c55e';
    console.log('Couleur vert 500 appliquée');
  }
  
  if (className.includes('text-gray-600')) styles.color = '#4b5563';
  if (className.includes('text-gray-500')) styles.color = '#6b7280';
  if (className.includes('text-white')) styles.color = '#ffffff';
  if (className.includes('text-black')) styles.color = '#000000';
  
  // Tailles de texte
  if (className.includes('text-xs')) styles.fontSize = 12;
  if (className.includes('text-sm')) styles.fontSize = 14;
  if (className.includes('text-base')) styles.fontSize = 16;
  if (className.includes('text-lg')) styles.fontSize = 18;
  if (className.includes('text-xl')) styles.fontSize = 20;
  if (className.includes('text-2xl')) styles.fontSize = 24;
  if (className.includes('text-3xl')) styles.fontSize = 30;
  
  // Poids de police
  if (className.includes('font-bold')) styles.fontWeight = 'bold';
  if (className.includes('font-semibold')) styles.fontWeight = '600';
  if (className.includes('font-medium')) styles.fontWeight = '500';
  
  // Alignement
  if (className.includes('text-center')) styles.textAlign = 'center';
  if (className.includes('text-left')) styles.textAlign = 'left';
  if (className.includes('text-right')) styles.textAlign = 'right';
  
  // Margins
  if (className.includes('mb-1')) styles.marginBottom = 4;
  if (className.includes('mb-2')) styles.marginBottom = 8;
  if (className.includes('mb-3')) styles.marginBottom = 12;
  if (className.includes('mb-4')) styles.marginBottom = 16;
  if (className.includes('mb-5')) styles.marginBottom = 20;
  if (className.includes('mb-6')) styles.marginBottom = 24;
  
  if (className.includes('mt-1')) styles.marginTop = 4;
  if (className.includes('mt-2')) styles.marginTop = 8;
  if (className.includes('mt-3')) styles.marginTop = 12;
  if (className.includes('mt-4')) styles.marginTop = 16;
  if (className.includes('mt-5')) styles.marginTop = 20;
  if (className.includes('mt-6')) styles.marginTop = 24;
  
  // Padding
  if (className.includes('p-1')) styles.padding = 4;
  if (className.includes('p-2')) styles.padding = 8;
  if (className.includes('p-3')) styles.padding = 12;
  if (className.includes('p-4')) styles.padding = 16;
  
  // Debug: log du style final
  console.log('Style final généré:', styles);
  
  return styles;
};

export function Text({ className, style, ...props }: TailwindTextProps) {
  const tailwindStyles = tailwindToStyle(className);
  
  return <RNText style={[tailwindStyles, style]} {...props} />;
}
