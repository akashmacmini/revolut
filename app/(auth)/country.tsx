import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { CountryPicker } from '@/components/ui/CountryPicker';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { countries, Country } from '@/lib/countries';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

export default function CountryScreen() {
  const router = useRouter();
  const { country, setField } = useOnboardingStore();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState(country || 'GB');

  const selectedCountry = countries.find((c) => c.code === selectedCode);

  const handleSelect = (c: Country) => {
    setSelectedCode(c.code);
  };

  const handleContinue = () => {
    setField('country', selectedCode);
    router.push('/(auth)/date-of-birth');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={8 / 18} />

      <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          Country of residence
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          Where do you currently live?
        </Text>

        <TouchableOpacity
          onPress={() => setPickerVisible(true)}
          style={{
            backgroundColor: Colors.surface,
            borderRadius: BorderRadius.md,
            paddingHorizontal: 16,
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={{ fontSize: 24 }}>{selectedCountry?.flag || ''}</Text>
            <Text style={{ color: Colors.text, fontSize: 16 }}>
              {selectedCountry?.name || 'Select country'}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl }}>
        <Button onPress={handleContinue} size="lg" fullWidth variant={selectedCode ? 'primary' : 'disabled'}>
          Continue
        </Button>
      </View>

      <CountryPicker
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        selected={selectedCode}
        onSelect={handleSelect}
      />
    </SafeAreaView>
  );
}
