import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StepHeader } from '@/components/layout/StepHeader';
import { PinPad } from '@/components/ui/PinPad';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing } from '@/lib/constants';

export default function ConfirmPasscodeScreen() {
  const router = useRouter();
  const { passcode, setField } = useOnboardingStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleInput = useCallback((digit: string) => {
    setError(false);
    setPin((prev) => {
      const next = prev + digit;
      if (next.length === 6) {
        if (next === passcode) {
          // Match — store hashed passcode (simple hash for demo)
          const hashed = btoa(next);
          setField('passcode', hashed);
          setTimeout(() => {
            router.push('/(auth)/face-id');
          }, 200);
        } else {
          // Mismatch — shake + error
          setTimeout(() => {
            setError(true);
            setPin('');
          }, 100);
        }
      }
      return next.length <= 6 ? next : prev;
    });
  }, [passcode, router, setField]);

  const handleDelete = useCallback(() => {
    setError(false);
    setPin((prev) => prev.slice(0, -1));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={4 / 18} />

      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.lg }}>
        <Text style={{ color: Colors.text, fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: Spacing.sm }}>
          Confirm your passcode
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, textAlign: 'center', marginBottom: Spacing.xxl }}>
          Re-enter your 6-digit passcode
        </Text>

        {error && (
          <Text style={{ color: Colors.error, fontSize: 14, textAlign: 'center', marginBottom: Spacing.md }}>
            Passcodes don't match. Try again.
          </Text>
        )}

        <PinPad
          length={6}
          value={pin}
          onInput={handleInput}
          onDelete={handleDelete}
          error={error}
        />
      </View>
    </SafeAreaView>
  );
}
