import { View as RNView, ViewProps } from 'react-native';

interface TailwindViewProps extends ViewProps {
  className?: string;
}

// Mapping des classes Tailwind vers les styles React Native pour View
const tailwindToStyle = (className: string = '') => {
  const styles: any = {};
  
  // Debug: log de la className reçue
  console.log('View className reçue:', className);
  
  // Flex
  if (className.includes('flex-1')) styles.flex = 1;
  if (className.includes('flex-row')) styles.flexDirection = 'row';
  if (className.includes('flex-col')) styles.flexDirection = 'column';
  
  // Justify Content
  if (className.includes('justify-center')) styles.justifyContent = 'center';
  if (className.includes('justify-between')) styles.justifyContent = 'space-between';
  if (className.includes('justify-around')) styles.justifyContent = 'space-around';
  if (className.includes('justify-start')) styles.justifyContent = 'flex-start';
  if (className.includes('justify-end')) styles.justifyContent = 'flex-end';
  
  // Align Items
  if (className.includes('items-center')) styles.alignItems = 'center';
  if (className.includes('items-start')) styles.alignItems = 'flex-start';
  if (className.includes('items-end')) styles.alignItems = 'flex-end';
  if (className.includes('items-stretch')) styles.alignItems = 'stretch';
  
  // Background Colors
  if (className.includes('bg-white')) styles.backgroundColor = '#ffffff';
  if (className.includes('bg-black')) styles.backgroundColor = '#000000';
  if (className.includes('bg-gray-100')) styles.backgroundColor = '#f3f4f6';
  if (className.includes('bg-gray-200')) styles.backgroundColor = '#e5e7eb';
  if (className.includes('bg-gray-300')) styles.backgroundColor = '#d1d5db';
  if (className.includes('bg-red-500')) styles.backgroundColor = '#ef4444';
  if (className.includes('bg-blue-500')) styles.backgroundColor = '#3b82f6';
  if (className.includes('bg-green-500')) styles.backgroundColor = '#22c55e';
  if (className.includes('bg-yellow-200')) styles.backgroundColor = '#fef08a';
  
  // Padding
  if (className.includes('p-1')) styles.padding = 4;
  if (className.includes('p-2')) styles.padding = 8;
  if (className.includes('p-3')) styles.padding = 12;
  if (className.includes('p-4')) styles.padding = 16;
  if (className.includes('p-6')) styles.padding = 24;
  if (className.includes('p-8')) styles.padding = 32;
  
  // Margin
  if (className.includes('m-1')) styles.margin = 4;
  if (className.includes('m-2')) styles.margin = 8;
  if (className.includes('m-4')) styles.margin = 16;
  
  // Border Radius
  if (className.includes('rounded')) styles.borderRadius = 4;
  if (className.includes('rounded-lg')) styles.borderRadius = 8;
  if (className.includes('rounded-xl')) styles.borderRadius = 12;
  if (className.includes('rounded-full')) styles.borderRadius = 9999;
  
  return styles;
};

export function View({ className, style, ...props }: TailwindViewProps) {
  const tailwindStyles = tailwindToStyle(className);
  
  return <RNView style={[tailwindStyles, style]} {...props} />;
}
