import { Text, TextProps } from 'react-native';
import tw from 'twrnc';

interface CustomTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'button';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'white' | 'black' | 'forestGreen' | 'earthBrown';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const variants = {
  title: 'text-4xl',      // 32px selon les specs
  subtitle: 'text-2xl',   // 24px selon les specs  
  h1: 'text-3xl',
  h2: 'text-2xl',
  h3: 'text-xl',
  body: 'text-base',      // 16px selon les specs
  caption: 'text-sm',     // 14px selon les specs
  button: 'text-base',    // 16px selon les specs
};

const colors = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  success: 'text-green-600',
  danger: 'text-red-600',
  warning: 'text-yellow-600',
  white: 'text-white',
  black: 'text-black',
  forestGreen: 'text-green-800',  // Approximation pour #2F5D50
  earthBrown: 'text-amber-800',   // Approximation pour #7B4B2A
};

const weights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Typography = ({ 
  variant = 'body', 
  color = 'black', 
  weight = 'normal',
  style,
  ...props 
}: CustomTextProps) => {
  const textStyle = tw`${variants[variant]} ${colors[color]} ${weights[weight]}`;
  
  return <Text style={[textStyle, style]} {...props} />;
};
