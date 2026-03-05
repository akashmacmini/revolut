import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

const FEATURES = [
  { id: 'spending', label: 'Spending', icon: 'card-outline' as const },
  { id: 'saving', label: 'Saving', icon: 'wallet-outline' as const },
  { id: 'crypto', label: 'Crypto', icon: 'logo-bitcoin' as const },
  { id: 'travel', label: 'Travel', icon: 'airplane-outline' as const },
  { id: 'business', label: 'Business', icon: 'briefcase-outline' as const },
];

export default function PreferencesScreen() {
  const router = useRouter();
  const { setField } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    setField('preferences', selected);
    router.push('/(auth)/plan-selection');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={11 / 18} />

      <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          What are you interested in?
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          Select one or more to personalise your experience
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {FEATURES.map((feature) => {
            const isSelected = selected.includes(feature.id);
            return (
              <TouchableOpacity
                key={feature.id}
                onPress={() => toggle(feature.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: BorderRadius.xl,
                  backgroundColor: isSelected ? Colors.primary : Colors.surface,
                  borderWidth: 1,
                  borderColor: isSelected ? Colors.primary : Colors.border,
                }}
              >
                <Ionicons
                  name={feature.icon}
                  size={20}
                  color={isSelected ? '#FFFFFF' : Colors.textSecondary}
                />
                <Text
                  style={{
                    color: isSelected ? '#FFFFFF' : Colors.text,
                    fontSize: 15,
                    fontWeight: '600',
                  }}
                >
                  {feature.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl }}>
        <Button
          onPress={handleContinue}
          size="lg"
          fullWidth
          variant={selected.length > 0 ? 'primary' : 'disabled'}
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
}
