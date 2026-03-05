import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { VirtualCard } from '@/components/cards/VirtualCard';
import { CardActions } from '@/components/cards/CardActions';
import { CardDetails } from '@/components/cards/CardDetails';
import { CardCustomizeSheet } from '@/app/(sheets)/card-customize';
import { CardPinSheet } from '@/app/(sheets)/card-pin';
import { PlanUpgradeSheet } from '@/app/(sheets)/plan-upgrade';
import { Button } from '@/components/ui/Button';
import { useCards } from '@/hooks/useCards';
import { Colors, BorderRadius, Spacing } from '@/lib/constants';

function SettingsRow({
  icon,
  label,
  onPress,
  trailing,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
      }}
    >
      <Ionicons name={icon} size={22} color={Colors.textSecondary} style={{ marginRight: 14 }} />
      <Text style={{ color: Colors.text, fontSize: 16, flex: 1 }}>{label}</Text>
      {trailing ?? <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />}
    </TouchableOpacity>
  );
}

export default function CardsScreen() {
  const {
    selectedCard,
    maskedNumber,
    maskedCvv,
    revealedField,
    revealField,
    handleFreeze,
  } = useCards();

  const [showCustomize, setShowCustomize] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showPlanUpgrade, setShowPlanUpgrade] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (!selectedCard) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: Colors.textSecondary, fontSize: 16 }}>No card available</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Card display */}
        <View style={{ paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl, paddingBottom: Spacing.md }}>
          <VirtualCard
            lastFour={selectedCard.lastFour}
            cardholderName={selectedCard.cardholderName}
            color={selectedCard.color as any}
          />
        </View>

        {/* Add to Apple Wallet */}
        <View style={{ paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg }}>
          <Button
            variant="secondary"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            fullWidth
            icon={<Ionicons name="wallet-outline" size={20} color={Colors.text} />}
          >
            Add to Apple Wallet
          </Button>
        </View>

        {/* Action buttons */}
        <View style={{ marginBottom: Spacing.xl }}>
          <CardActions
            onTopUp={() => {}}
            onTransfer={() => {}}
            onDetails={() => setShowDetails(!showDetails)}
            onSettings={() => setShowCustomize(true)}
          />
        </View>

        {/* Card details (toggled) */}
        {showDetails && (
          <View style={{ paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg }}>
            <CardDetails
              cardNumber={maskedNumber}
              expiry={selectedCard.expiry}
              cvv={maskedCvv}
              revealedField={revealedField}
              onRevealNumber={() => revealField('number')}
              onRevealCvv={() => revealField('cvv')}
            />
          </View>
        )}

        {/* Card settings */}
        <View
          style={{
            backgroundColor: Colors.surface,
            borderRadius: BorderRadius.lg,
            marginHorizontal: Spacing.lg,
            overflow: 'hidden',
          }}
        >
          <SettingsRow
            icon="snow-outline"
            label="Freeze card"
            trailing={
              <Switch
                value={selectedCard.isFrozen}
                onValueChange={() => handleFreeze(selectedCard.id)}
                trackColor={{ false: Colors.surfaceLight, true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            }
          />
          <SettingsRow
            icon="speedometer-outline"
            label="Card limits"
            onPress={() => {}}
          />
          <SettingsRow
            icon="keypad-outline"
            label={selectedCard.hasPin ? 'Change PIN' : 'Set PIN'}
            onPress={() => setShowPin(true)}
          />
          <SettingsRow
            icon="color-palette-outline"
            label="Customize card"
            onPress={() => setShowCustomize(true)}
          />
          {selectedCard.isVirtual && (
            <SettingsRow
              icon="card-outline"
              label="Get physical card"
              onPress={() => setShowPlanUpgrade(true)}
            />
          )}
        </View>
      </ScrollView>

      {/* Bottom sheets */}
      <CardCustomizeSheet isOpen={showCustomize} onClose={() => setShowCustomize(false)} />
      <CardPinSheet isOpen={showPin} onClose={() => setShowPin(false)} />
      <PlanUpgradeSheet isOpen={showPlanUpgrade} onClose={() => setShowPlanUpgrade(false)} />
    </View>
  );
}
