import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StepHeader } from '@/components/layout/StepHeader';
import { OTPInput } from '@/components/ui/OTPInput';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing } from '@/lib/constants';

const MOCK_OTP = '123456';
const RESEND_DELAY = 30;

export default function OtpVerifyScreen() {
  const router = useRouter();
  const { phoneNumber, countryCode } = useOnboardingStore();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(RESEND_DELAY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    setLoading(true);
    setError(false);

    // Mock verification delay
    await new Promise((r) => setTimeout(r, 500));

    if (otp === MOCK_OTP) {
      router.push('/(auth)/create-passcode');
    } else {
      setError(true);
      setOtp('');
      Alert.alert('Invalid Code', 'Please enter the correct verification code. Use 123456 for demo.');
    }
    setLoading(false);
  };

  const handleResend = () => {
    setTimer(RESEND_DELAY);
    setOtp('');
    setError(false);
    Alert.alert('Code Sent', 'A new verification code has been sent.');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={2 / 18} />

      <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          Enter verification code
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xxl }}>
          We sent a code to {countryCode} {phoneNumber}
        </Text>

        <OTPInput value={otp} onChange={setOtp} length={6} error={error} />

        <View style={{ alignItems: 'center', marginTop: Spacing.xl }}>
          {timer > 0 ? (
            <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>
              Resend code in {timer}s
            </Text>
          ) : (
            <Button variant="ghost" onPress={handleResend}>
              Resend Code
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
