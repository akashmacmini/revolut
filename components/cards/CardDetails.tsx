import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Colors, BorderRadius } from '@/lib/constants';

interface CardDetailsProps {
  cardNumber: string;
  expiry: string;
  cvv: string;
  revealedField: 'number' | 'cvv' | null;
  onRevealNumber: () => void;
  onRevealCvv: () => void;
}

function DetailRow({
  label,
  value,
  isMasked,
  onReveal,
}: {
  label: string;
  value: string;
  isMasked: boolean;
  onReveal?: () => void;
}) {
  const handleCopy = async () => {
    if (!isMasked) {
      await Clipboard.setStringAsync(value.replace(/\s/g, ''));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
      }}
    >
      <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Text
          style={{
            color: Colors.text,
            fontSize: 15,
            fontWeight: '500',
            letterSpacing: 1,
          }}
        >
          {value}
        </Text>
        {onReveal && isMasked && (
          <TouchableOpacity onPress={onReveal} hitSlop={8}>
            <Ionicons name="eye-outline" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
        {!isMasked && (
          <TouchableOpacity onPress={handleCopy} hitSlop={8}>
            <Ionicons name="copy-outline" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export function CardDetails({
  cardNumber,
  expiry,
  cvv,
  revealedField,
  onRevealNumber,
  onRevealCvv,
}: CardDetailsProps) {
  return (
    <View
      style={{
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: 16,
        paddingVertical: 4,
      }}
    >
      <DetailRow
        label="Card number"
        value={cardNumber}
        isMasked={revealedField !== 'number'}
        onReveal={onRevealNumber}
      />
      <DetailRow
        label="Expiry"
        value={expiry}
        isMasked={false}
      />
      <DetailRow
        label="CVV"
        value={cvv}
        isMasked={revealedField !== 'cvv'}
        onReveal={onRevealCvv}
      />
    </View>
  );
}
