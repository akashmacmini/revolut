import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

export default function IdentityPhotoScreen() {
  const router = useRouter();
  const { documentType, setField } = useOnboardingStore();
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    // Mock capture — simulate taking a photo
    setCaptured(true);
    setField('documentFrontUri', 'mock://document-front.jpg');
  };

  const handleContinue = () => {
    router.push('/(auth)/identity-selfie');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={14 / 18} />

      <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          Scan your {documentType === 'passport' ? 'passport' : 'ID'}
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          Position your document within the frame
        </Text>

        {/* Camera viewfinder placeholder */}
        <View
          style={{
            flex: 1,
            maxHeight: 320,
            backgroundColor: Colors.surface,
            borderRadius: BorderRadius.lg,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: captured ? Colors.success : Colors.border,
            borderStyle: 'dashed',
          }}
        >
          {captured ? (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
              <Text style={{ color: Colors.success, fontSize: 18, fontWeight: '700', marginTop: 12 }}>
                Document captured
              </Text>
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="camera-outline" size={64} color={Colors.textTertiary} />
              <Text style={{ color: Colors.textSecondary, fontSize: 16, marginTop: 12 }}>
                Camera viewfinder
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
            Capture
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}
