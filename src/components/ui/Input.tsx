import { Text, TextInput, TextInputProps, View } from 'react-native';
import tw from 'twrnc';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = ({ 
  label, 
  error, 
  helperText,
  leftIcon,
  rightIcon,
  style,
  ...props 
}: InputProps) => {
  return (
    <View style={tw`mb-4`}>
      {label && (
        <Text style={tw`text-gray-700 font-medium mb-2`}>{label}</Text>
      )}
      
      <View style={tw`relative`}>
        {leftIcon && (
          <View style={tw`absolute left-3 top-3 z-10`}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[
            tw`
              border border-gray-300 rounded-lg px-4 py-3 text-base
              ${leftIcon ? 'pl-12' : ''}
              ${rightIcon ? 'pr-12' : ''}
              ${error ? 'border-red-500' : 'border-gray-300'}
            `,
            style
          ]}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        
        {rightIcon && (
          <View style={tw`absolute right-3 top-3 z-10`}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && (
        <Text style={tw`text-red-500 text-sm mt-1`}>{error}</Text>
      )}
      
      {helperText && !error && (
        <Text style={tw`text-gray-500 text-sm mt-1`}>{helperText}</Text>
      )}
    </View>
  );
};
