import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CardColor } from '@/stores/cardStore';
import { Colors, BorderRadius } from '@/lib/constants';

interface CardColorPickerProps {
  selected: CardColor;
  onSelect: (color: CardColor) => void;
}

const colorOptions: { key: CardColor; label: string; colors: [string, string] }[] = [
  { key: 'dark', label: 'Dark', colors: ['#1A1A1A', '#2C2C2E'] },
  { key: 'purple', label: 'Purple', colors: ['#6C5CE7', '#8B7CF0'] },
  { key: 'blue', label: 'Blue', colors: ['#0984E3', '#74B9FF'] },
  { key: 'gradient', label: 'Gradient', colors: ['#6C5CE7', '#0984E3'] },
  { key: 'rose', label: 'Rose', colors: ['#E84393', '#FD79A8'] },
  { key: 'green', label: 'Green', colors: ['#00B894', '#55EFC4'] },
];

export function CardColorPicker({ selected, onSelect }: CardColorPickerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingVertical: 8 }}
    >
      {colorOptions.map((option) => {
        const isSelected = selected === option.key;
        return (
          <TouchableOpacity
            key={option.key}
            onPress={() => onSelect(option.key)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={option.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 64,
                height: 40,
                borderRadius: BorderRadius.sm,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: isSelected ? 2 : 0,
                borderColor: '#FFFFFF',
              }}
            >
              {isSelected && (
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
              )}
            </LinearGradient>
            <Text
              style={{
                color: isSelected ? Colors.text : Colors.textSecondary,
                fontSize: 11,
                textAlign: 'center',
                marginTop: 4,
              }}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
