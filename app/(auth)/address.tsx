import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

export default function AddressScreen() {
  const router = useRouter();
  const { setFields } = useOnboardingStore();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const isValid = street.trim().length >= 3 && city.trim().length >= 2 && postalCode.trim().length >= 3;

  const handleContinue = () => {
    setFields({
      addressLine1: street.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
    });
    router.push('/(auth)/preferences');
  };

  const inputStyle = {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 16,
    height: 56,
    color: Colors.text,
    fontSize: 16,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={10 / 18} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          Home address
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          We need this for regulatory purposes
        </Text>

        <View style={{ gap: 12 }}>
          <TextInput
            value={street}
            onChangeText={setStreet}
            placeholder="Street address"
            placeholderTextColor={Colors.textTertiary}
            autoFocus
            style={inputStyle}
          />
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="City"
            placeholderTextColor={Colors.textTertiary}
            style={inputStyle}
          />
          <TextInput
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Postal code"
            placeholderTextColor={Colors.textTertiary}
            autoCapitalize="characters"
            style={inputStyle}
          />
        </View>
      </ScrollView>

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
