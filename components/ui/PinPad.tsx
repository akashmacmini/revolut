import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../lib/constants';

interface PinPadProps {
  length: 4 | 6;
  value: string;
  onInput: (digit: string) => void;
  onDelete: () => void;
  onBiometric?: () => void;
  error?: boolean;
}

export function PinPad({
  length,
  value,
  onInput,
  onDelete,
  onBiometric,
  error,
}: PinPadProps) {
  const shakeX = useSharedValue(0);

  useEffect(() => {
    if (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      shakeX.value = withSequence(
        withTiming(-12, { duration: 50 }),
        withTiming(12, { duration: 50 }),
        withTiming(-12, { duration: 50 }),
        withTiming(12, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error, shakeX]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const handlePress = useCallback(
    (digit: string) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onInput(digit);
    },
    [onInput]
  );

  const handleDelete = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDelete();
  }, [onDelete]);

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <View className="items-center">
      {/* Dot indicators */}
      <Animated.View
        style={shakeStyle}
        className="flex-row items-center justify-center mb-10 gap-4"
      >
        {Array.from({ length }).map((_, i) => (
          <View
            key={i}
            className={`w-3.5 h-3.5 rounded-full ${
              i < value.length
                ? 'bg-primary'
                : error
                  ? 'bg-error'
                  : 'bg-surface-light'
            }`}
          />
        ))}
      </Animated.View>

      {/* Keypad grid */}
      <View className="w-full px-10">
        {/* Rows 1-3 (digits 1-9) */}
        {[0, 1, 2].map((row) => (
          <View key={row} className="flex-row justify-between mb-4">
            {digits.slice(row * 3, row * 3 + 3).map((digit) => (
              <PadButton key={digit} onPress={() => handlePress(digit)}>
                <Text className="text-text-primary text-2xl font-semibold">
                  {digit}
                </Text>
              </PadButton>
            ))}
          </View>
        ))}

        {/* Bottom row: biometric/empty, 0, delete */}
        <View className="flex-row justify-between">
          <PadButton
            onPress={onBiometric}
            disabled={!onBiometric}
          >
            {onBiometric ? (
              <Ionicons name="scan-outline" size={28} color={Colors.text} />
            ) : (
              <View />
            )}
          </PadButton>

          <PadButton onPress={() => handlePress('0')}>
            <Text className="text-text-primary text-2xl font-semibold">0</Text>
          </PadButton>

          <PadButton onPress={handleDelete}>
            <Ionicons name="backspace-outline" size={28} color={Colors.text} />
          </PadButton>
        </View>
      </View>
    </View>
  );
}

function PadButton({
  children,
  onPress,
  disabled,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      className="w-20 h-20 rounded-full items-center justify-center"
      style={{ backgroundColor: disabled ? 'transparent' : Colors.surface }}
    >
      {children}
    </TouchableOpacity>
  );
}
