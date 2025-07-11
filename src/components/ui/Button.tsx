import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import tw from 'twrnc';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-blue-600',
  secondary: 'bg-gray-600',
  outline: 'border border-blue-600 bg-transparent',
  ghost: 'bg-transparent',
};

const textVariants = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-blue-600',
  ghost: 'text-blue-600',
};

const sizes = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Button = ({ 
  title, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...props 
}: ButtonProps) => {
  const buttonStyle = tw`
    ${variants[variant]} 
    ${sizes[size]} 
    rounded-lg 
    items-center 
    justify-center
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50' : ''}
  `;
  
  const textStyle = tw`${textVariants[variant]} ${textSizes[size]} font-semibold`;
  
  return (
    <TouchableOpacity 
      style={[buttonStyle, style]} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#3b82f6'} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
