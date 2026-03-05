import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

export default function AdTrackingScreen() {
  const router = useRouter();
  const { setField, completeOnboarding } = useOnboardingStore();

  const handleAllow = () => {
    setField('adTrackingAllowed', true);
    completeOnboarding();
    router.replace('/(tabs)');
  };

  const handleDontAllow = () => {
    setField('adTrackingAllowed', false);
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={18 / 18} />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.lg }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: Colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.xl,
          }}
        >
          <Ionicons name="shield-checkmark-outline" size={40} color={Colors.primary} />
        </View>

        <Text style={{ color: Colors.text, fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: Spacing.md }}>
          Allow Revolut to track your activity?
        </Text>

        <Text style={{ color: Colors.textSecondary, fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: Spacing.sm }}>
          Your data will be used to deliver personalised ads and measure their effectiveness.
        </Text>

        <View
          style={{
            backgroundColor: Colors.surface,
            borderRadius: BorderRadius.md,
            padding: 16,
            marginTop: Spacing.md,
            width: '100%',
          }}
        >
          <Text style={{ color: Colors.textSecondary, fontSize: 14, lineHeight: 22 }}>
            This uses Apple's App Tracking Transparency framework. You can change this later in Settings.
            We respect your privacy and never sell your personal data.
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, gap: 12 }}>
        <Button onPress={handleAllow} size="lg" fullWidth>
          Allow
        </Button>
        <Button onPress={handleDontAllow} size="lg" fullWidth variant="secondary">
          Don't Allow
        </Button>
      </View>
    </SafeAreaView>
  );
}
