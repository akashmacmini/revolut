import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Colors, BorderRadius, Spacing } from '@/lib/constants';

interface PlanUpgradeSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Plan {
  name: string;
  price: string;
  features: string[];
  color: string;
  isCurrent?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Standard',
    price: 'Free',
    features: ['Basic card', 'UK transfers', 'Budget tools'],
    color: Colors.textSecondary,
    isCurrent: true,
  },
  {
    name: 'Plus',
    price: '\u00A33.99/mo',
    features: ['Fee-free spending abroad', 'Priority support'],
    color: Colors.accent,
  },
  {
    name: 'Premium',
    price: '\u00A37.99/mo',
    features: ['Free metal card', 'LoungeKey', 'Crypto cashback'],
    color: Colors.primary,
  },
  {
    name: 'Metal',
    price: '\u00A314.99/mo',
    features: ['Exclusive metal card', 'Airport lounge', 'Concierge'],
    color: '#C0A060',
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const handleUpgrade = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.surfaceLight,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        borderWidth: plan.isCurrent ? 1 : 0,
        borderColor: plan.color,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <View>
          <Text style={{ color: plan.color, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
            {plan.name}
          </Text>
          <Text style={{ color: Colors.text, fontSize: 20, fontWeight: '700' }}>
            {plan.price}
          </Text>
        </View>
        {plan.isCurrent && (
          <View style={{ backgroundColor: plan.color, paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.full }}>
            <Text style={{ color: Colors.background, fontSize: 11, fontWeight: '700' }}>
              CURRENT
            </Text>
          </View>
        )}
      </View>

      {plan.features.map((feature) => (
        <View key={feature} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Ionicons name="checkmark-circle" size={16} color={plan.color} style={{ marginRight: 8 }} />
          <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>{feature}</Text>
        </View>
      ))}

      {!plan.isCurrent && (
        <TouchableOpacity
          onPress={handleUpgrade}
          activeOpacity={0.7}
          style={{
            backgroundColor: plan.color,
            borderRadius: BorderRadius.md,
            paddingVertical: 10,
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '600' }}>
            Upgrade
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function PlanUpgradeSheet({ isOpen, onClose }: PlanUpgradeSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Choose your plan" snapPoints={['85%']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>
    </BottomSheet>
  );
}
