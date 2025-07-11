import { Text, TextProps, TextStyle } from 'react-native';

interface StyledTextProps extends TextProps {
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  color?: 'red' | 'blue' | 'green' | 'black' | 'white';
  weight?: 'normal' | 'bold';
  align?: 'left' | 'center' | 'right';
}

const sizes = {
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
};

const colors = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  black: '#000000',
  white: '#ffffff',
};

export function StyledText({ 
  size = 'base', 
  color = 'black', 
  weight = 'normal', 
  align = 'left',
  style,
  ...props 
}: StyledTextProps) {
  const textStyle: TextStyle = {
    fontSize: sizes[size],
    color: colors[color],
    fontWeight: weight,
    textAlign: align,
  };

  return <Text style={[textStyle, style]} {...props} />;
}
