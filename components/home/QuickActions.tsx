import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/lib/constants';

interface QuickAction {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
}

const actions: QuickAction[] = [
  { label: 'Add money', icon: 'arrow-down', onPress: () => {} },
  { label: 'Send', icon: 'arrow-up', onPress: () => {} },
  { label: 'Request', icon: 'swap-horizontal', onPress: () => {} },
  { label: 'More', icon: 'ellipsis-horizontal', onPress: () => {} },
];

export function QuickActions() {
  return (
    <View className="flex-row justify-around px-4 pb-6">
      {actions.map((action) => (
        <TouchableOpacity
          key={action.label}
          onPress={action.onPress}
          className="items-center"
        >
          <View
            className="w-14 h-14 rounded-full bg-surface-light items-center justify-center mb-2"
          >
            <Ionicons name={action.icon} size={22} color={Colors.text} />
          </View>
          <Text className="text-text-secondary text-xs">{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
