import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

type PlanType = 'standard' | 'plus' | 'premium' | 'metal';

interface Plan {
  id: PlanType;
  name: string;
  price: string;
  color: string;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: 'standard',
    name: 'Free',
    price: '£0',
    color: Colors.textSecondary,
    features: ['Basic transfers', 'Budget tools', 'Standard card'],
  },
  {
    id: 'plus',
    name: 'Plus',
    price: '£3.99/mo',
    color: Colors.accent,
    features: ['No FX fees up to £1,000', 'Disposable virtual cards', 'Priority support'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '£7.99/mo',
    color: Colors.primary,
    features: ['Unlimited FX', 'Lounge access', 'Travel insurance', 'Crypto trading'],
  },
  {
    id: 'metal',
    name: 'Metal',
    price: '£14.99/mo',
    color: Colors.warning,
    features: ['Everything in Premium', 'Exclusive metal card', '1% cashback', 'Concierge service'],
  },
];

export default function PlanSelectionScreen() {
  const router = useRouter();
  const { setField } = useOnboardingStore();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('standard');

  const handleContinue = () => {
    setField('accountPlan', selectedPlan);
    router.push('/(auth)/identity-doc-type');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={12 / 18} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, paddingBottom: Spacing.lg }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          Choose your plan
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          You can upgrade or downgrade anytime
        </Text>

        <View style={{ gap: 12 }}>
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.7}
                style={{
                  backgroundColor: Colors.surface,
                  borderRadius: BorderRadius.lg,
                  padding: 20,
                  borderWidth: 2,
                  borderColor: isSelected ? plan.color : Colors.border,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <View>
                    <Text style={{ color: plan.color, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                      {plan.name}
                    </Text>
                    <Text style={{ color: Colors.text, fontSize: 22, fontWeight: '800' }}>
                      {plan.price}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: isSelected ? plan.color : Colors.border,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && (
                      <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: plan.color }} />
                    )}
                  </View>
                </View>

                {plan.features.map((feature, idx) => (
                  <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <Ionicons name="checkmark-circle" size={16} color={plan.color} />
                    <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>{feature}</Text>
                  </View>
                ))}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl }}>
        <Button onPress={handleContinue} size="lg" fullWidth>
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
}
