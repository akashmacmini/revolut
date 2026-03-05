import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/constants';

interface StepHeaderProps {
  onBack?: () => void;
  progress?: number;
  title?: string;
}

export function StepHeader({ onBack, progress, title }: StepHeaderProps) {
  return (
    <View>
      <View className="flex-row items-center justify-between h-14 px-4">
        {/* Back button */}
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            hitSlop={12}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}

        {/* Centered title */}
        {title ? (
          <Text className="text-text-primary text-base font-semibold flex-1 text-center">
            {title}
          </Text>
        ) : (
          <View className="flex-1" />
        )}

        {/* Spacer to balance back button */}
        <View className="w-10" />
      </View>

      {/* Progress bar */}
      {progress !== undefined && (
        <View className="h-1 mx-4 rounded-full bg-surface-light overflow-hidden">
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
          />
        </View>
      )}
    </View>
  );
}
