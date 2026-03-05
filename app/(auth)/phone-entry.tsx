import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { CountryPicker } from '@/components/ui/CountryPicker';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';
import { countries, Country } from '@/lib/countries';

export default function PhoneEntryScreen() {
  const router = useRouter();
  const { phoneNumber, countryCode, setField, setFields } = useOnboardingStore();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [localPhone, setLocalPhone] = useState(phoneNumber);

  const selectedCountry = countries.find((c) => c.dialCode === countryCode) || countries.find((c) => c.code === 'GB')!;

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\s/g, '');
    return cleaned.length >= 7 && cleaned.length <= 15 && /^\d+$/.test(cleaned);
  };

  const handleContinue = () => {
    if (!validatePhone(localPhone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number.');
      return;
    }
    setFields({ phoneNumber: localPhone, countryCode: selectedCountry.dialCode });
    router.push('/(auth)/otp-verify');
  };

  const handleCountrySelect = (country: Country) => {
    setField('countryCode', country.dialCode);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={1 / 18} />

      <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          What's your phone number?
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          We'll send you a verification code
        </Text>

        <View style={{ flexDirection: 'row', gap: 12, marginBottom: Spacing.xl }}>
          <TouchableOpacity
            onPress={() => setPickerVisible(true)}
            style={{
              backgroundColor: Colors.surface,
              borderRadius: BorderRadius.md,
              paddingHorizontal: 16,
              height: 56,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 20 }}>{selectedCountry.flag}</Text>
            <Text style={{ color: Colors.text, fontSize: 16 }}>{selectedCountry.dialCode}</Text>
          </TouchableOpacity>

          <TextInput
            value={localPhone}
            onChangeText={setLocalPhone}
            placeholder="Phone number"
            placeholderTextColor={Colors.textTertiary}
            keyboardType="phone-pad"
            autoFocus
            style={{
              flex: 1,
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
          variant={validatePhone(localPhone) ? 'primary' : 'disabled'}
        >
          Continue
        </Button>
      </View>

      <CountryPicker
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        selected={selectedCountry.code}
        onSelect={handleCountrySelect}
      />
    </SafeAreaView>
  );
}
