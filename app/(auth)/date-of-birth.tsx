import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

export default function DateOfBirthScreen() {
  const router = useRouter();
  const { setField } = useOnboardingStore();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const isComplete = day.length >= 1 && month.length >= 1 && year.length === 4;

  const validate = (): boolean => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
    if (m < 1 || m > 12 || d < 1 || d > 31) return false;

    const dob = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age >= 18;
  };

  const handleContinue = () => {
    if (!validate()) {
      Alert.alert('Invalid Date', 'You must be at least 18 years old to use Revolut.');
      return;
    }
    const formatted = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    setField('dateOfBirth', formatted);
    router.push('/(auth)/address');
  };

  const inputStyle = {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 16,
    height: 56,
    color: Colors.text,
    fontSize: 18,
    textAlign: 'center' as const,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={9 / 18} />

      <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          Date of birth
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          You must be at least 18 years old
        </Text>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TextInput
            value={day}
            onChangeText={(t) => setDay(t.replace(/[^0-9]/g, '').slice(0, 2))}
            placeholder="DD"
            placeholderTextColor={Colors.textTertiary}
            keyboardType="number-pad"
            maxLength={2}
            autoFocus
            style={[inputStyle, { flex: 1 }]}
          />
          <TextInput
            value={month}
            onChangeText={(t) => setMonth(t.replace(/[^0-9]/g, '').slice(0, 2))}
            placeholder="MM"
            placeholderTextColor={Colors.textTertiary}
            keyboardType="number-pad"
            maxLength={2}
            style={[inputStyle, { flex: 1 }]}
          />
          <TextInput
            value={year}
            onChangeText={(t) => setYear(t.replace(/[^0-9]/g, '').slice(0, 4))}
            placeholder="YYYY"
            placeholderTextColor={Colors.textTertiary}
            keyboardType="number-pad"
            maxLength={4}
            style={[inputStyle, { flex: 1.5 }]}
          />
        </View>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl }}>
        <Button
          onPress={handleContinue}
          size="lg"
          fullWidth
          variant={isComplete ? 'primary' : 'disabled'}
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
}
