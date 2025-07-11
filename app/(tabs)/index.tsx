
import { Text, View } from 'react-native';
import tw from 'twrnc';

export default function HomeScreen(){
 return (
    <View style={tw`flex-1 items-center justify-center bg-blue-500`}>
      {/* Test style inline pour comparaison */}
      <Text style={{color: '#dc2626', fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>
        ✅ Style inline rouge
      </Text>
      
      {/* Test twrnc - alternative stable à NativeWind */}
      <Text style={tw`text-red-600 text-lg font-bold mb-4`}>
        � TWRNC - Rouge (ça marche !)
      </Text>
      <Text style={tw`text-white text-base`}>
        � TWRNC - Blanc (ça marche !)
      </Text>
      
      {/* Test de plusieurs couleurs */}
      <Text style={tw`text-yellow-400 text-base mt-2`}>
        🚀 TWRNC - Jaune
      </Text>
      <Text style={tw`text-green-400 text-base mt-2`}>
        🚀 TWRNC - Vert
      </Text>
    </View>
  );
}
    