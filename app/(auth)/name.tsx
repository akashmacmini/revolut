import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

export default function NameScreen() {
  const router = useRouter();
  const { setFields } = useOnboardingStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const isValid = firstName.trim().length >= 2 && lastName.trim().length >= 2;

  const handleContinue = () => {
    setFields({ firstName: firstName.trim(), lastName: lastName.trim() });
    router.push('/(auth)/country');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={7 / 18} />

      <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          What's your name?
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          As it appears on your official ID
        </Text>

        <View style={{ gap: 12 }}>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            placeholderTextColor={Colors.textTertiary}
            autoFocus
            autoCapitalize="words"
            style={{
              backgroundColor: Colors.surface,
              borderRadius: BorderRadius.md,
              paddingHorizontal: 16,
              height: 56,
              color: Colors.text,
              fontSize: 16,
            }}
          />
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            placeholderTextColor={Colors.textTertiary}
            autoCapitalize="words"
            style={{
              backgroundColor: Colors.surface,
              borderRadius: BorderRadius.md,
              paddingHorizontal: 16,
              height: 56,
              color: Colors.text,
              fontSize: 16,
            }}
          />
        </View>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl }}>
        <Button
          onPress={handleContinue}
          size="lg"
          fullWidth
          variant={isValid ? 'primary' : 'disabled'}
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
}
