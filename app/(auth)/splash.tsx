import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/lib/constants';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ color: Colors.text, fontSize: 32, fontWeight: '800', marginBottom: 16 }}>
        Revolut
      </Text>
      <Text style={{ color: Colors.textSecondary, fontSize: 16, textAlign: 'center', marginBottom: 48 }}>
        A better way to handle your money
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 48,
          paddingVertical: 16,
          borderRadius: 12,
          width: '100%',
          alignItems: 'center',
        }}
        onPress={() => router.push('/(auth)/phone')}
      >
        <Text style={{ color: Colors.text, fontSize: 16, fontWeight: '700' }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
