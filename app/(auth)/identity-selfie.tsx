import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing } from '@/lib/constants';

export default function IdentitySelfieScreen() {
  const router = useRouter();
  const { setField } = useOnboardingStore();
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    setCaptured(true);
    setField('selfieUri', 'mock://selfie.jpg');
  };

  const handleContinue = () => {
    router.push('/(auth)/ad-tracking');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={15 / 18} />

      <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          Take a selfie
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          Align your face within the oval guide
        </Text>

        {/* Camera with oval face guide */}
        <View
          style={{
            flex: 1,
            maxHeight: 400,
            backgroundColor: Colors.surface,
            borderRadius: 200,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            width: 280,
            borderWidth: 3,
            borderColor: captured ? Colors.success : Colors.primary,
          }}
        >
          {captured ? (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
              <Text style={{ color: Colors.success, fontSize: 18, fontWeight: '700', marginTop: 12 }}>
                Selfie captured
              </Text>
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="person-outline" size={80} color={Colors.textTertiary} />
              <Text style={{ color: Colors.textSecondary, fontSize: 14, marginTop: 12, textAlign: 'center' }}>
                Position your face here
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl }}>
        {captured ? (
          <Button onPress={handleContinue} size="lg" fullWidth>
            Continue
          </Button>
        ) : (
          <Button onPress={handleCapture} size="lg" fullWidth>
            Take Selfie
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}
