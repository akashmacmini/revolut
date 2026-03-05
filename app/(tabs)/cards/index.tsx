import { View, Text } from 'react-native';
import { Colors } from '@/lib/constants';

export default function CardsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: Colors.text, fontSize: 24, fontWeight: '700' }}>Cards</Text>
    </View>
  );
}
