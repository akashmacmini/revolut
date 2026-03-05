import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Colors } from '../../lib/constants';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
  error?: boolean;
}

export function OTPInput({
  value,
  onChange,
  length = 6,
  autoFocus = true,
  error,
}: OTPInputProps) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [autoFocus]);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
    onChange(cleaned);
  };

  const focusedIndex = value.length < length ? value.length : length - 1;

  return (
    <View className="items-center">
      <Pressable onPress={handlePress} className="flex-row gap-3">
        {Array.from({ length }).map((_, i) => {
          const isFocused = i === focusedIndex;
          const isFilled = i < value.length;

          return (
            <View
              key={i}
              className={`w-12 h-14 rounded-xl items-center justify-center border-2 ${
                error
                  ? 'border-error'
                  : isFocused
                    ? 'border-primary'
                    : isFilled
                      ? 'border-surface-light'
                      : 'border-border'
              }`}
              style={{ backgroundColor: Colors.surface }}
            >
              <Text className="text-text-primary text-xl font-semibold">
                {value[i] ?? ''}
              </Text>
            </View>
          );
        })}
      </Pressable>

      {/* Hidden TextInput for keyboard */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        style={{
          position: 'absolute',
          opacity: 0,
          height: 0,
          width: 0,
        }}
      />
    </View>
  );
}
