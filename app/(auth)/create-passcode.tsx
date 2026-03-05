import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StepHeader } from '@/components/layout/StepHeader';
import { PinPad } from '@/components/ui/PinPad';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing } from '@/lib/constants';

export default function CreatePasscodeScreen() {
  const router = useRouter();
  const { setField } = useOnboardingStore();
  const [pin, setPin] = useState('');

  const handleInput = useCallback((digit: string) => {
    setPin((prev) => {
      const next = prev + digit;
      if (next.length === 6) {
        // Store temporarily and navigate to confirm
        setTimeout(() => {
          setField('passcode', next);
          router.push('/(auth)/confirm-passcode');
        }, 200);
      }
      return next.length <= 6 ? next : prev;
    });
  }, [router, setField]);

  const handleDelete = useCallback(() => {
    setPin((prev) => prev.slice(0, -1));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={3 / 18} />

      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.lg }}>
        <Text style={{ color: Colors.text, fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: Spacing.sm }}>
          Create your passcode
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, textAlign: 'center', marginBottom: Spacing.xxl }}>
          Choose a 6-digit passcode to secure your account
        </Text>

        <PinPad
          length={6}
          value={pin}
          onInput={handleInput}
          onDelete={handleDelete}
        />
      </View>
    </SafeAreaView>
  );
}
