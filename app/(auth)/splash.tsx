import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Colors } from '@/lib/constants';

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withTiming(1, { duration: 800 });

    const timeout = setTimeout(() => {
      router.replace('/(auth)/intro');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[{ alignItems: 'center' }, animatedStyle]}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: Colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '800' }}>R</Text>
        </View>
        <Text style={{ color: Colors.text, fontSize: 32, fontWeight: '800' }}>Revolut</Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginTop: 8 }}>
          A better way to handle your money
        </Text>
      </Animated.View>
    </View>
  );
}
