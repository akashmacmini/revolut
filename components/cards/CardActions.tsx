import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/lib/constants';

interface CardAction {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

interface CardActionsProps {
  onTopUp: () => void;
  onTransfer: () => void;
  onDetails: () => void;
  onSettings: () => void;
}

export function CardActions({ onTopUp, onTransfer, onDetails, onSettings }: CardActionsProps) {
  const actions: CardAction[] = [
    { icon: 'add-circle-outline', label: 'Top up', onPress: onTopUp },
    { icon: 'swap-horizontal-outline', label: 'Transfer', onPress: onTransfer },
    { icon: 'document-text-outline', label: 'Details', onPress: onDetails },
    { icon: 'settings-outline', label: 'Settings', onPress: onSettings },
  ];

  return (
    <View className="flex-row justify-between px-4">
      {actions.map((action) => (
        <TouchableOpacity
          key={action.label}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            action.onPress();
          }}
          activeOpacity={0.7}
          className="items-center"
          style={{ width: 72 }}
        >
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: Colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name={action.icon} size={24} color={Colors.text} />
          </View>
          <Text
            style={{
              color: Colors.textSecondary,
              fontSize: 12,
              marginTop: 6,
              textAlign: 'center',
            }}
          >
            {action.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
