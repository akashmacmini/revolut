import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

export default function FaceIdScreen() {
  const router = useRouter();
  const { setField } = useOnboardingStore();

  const handleEnable = () => {
    setField('biometricsEnabled', true);
    router.push('/(auth)/email');
  };

  const handleSkip = () => {
    setField('biometricsEnabled', false);
    router.push('/(auth)/email');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={5 / 18} />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.lg }}>
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: Colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.xl,
          }}
        >
          <Ionicons name="scan-outline" size={56} color={Colors.primary} />
        </View>

        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: Spacing.sm }}>
          Enable Face ID
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: Spacing.xxl }}>
          Use Face ID for quick and secure access to your account
        </Text>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, gap: 12 }}>
        <Button onPress={handleEnable} size="lg" fullWidth>
          Enable Face ID
        </Button>
        <TouchableOpacity onPress={handleSkip} style={{ alignItems: 'center', paddingVertical: 12 }}>
          <Text style={{ color: Colors.textSecondary, fontSize: 16 }}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
