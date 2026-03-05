import React from 'react';
import { View, Text, Image } from 'react-native';
import { Colors } from '../../lib/constants';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  uri?: string | null;
  name: string;
  size?: AvatarSize;
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 80,
  xl: 120,
};

const fontSizeMap: Record<AvatarSize, number> = {
  sm: 12,
  md: 18,
  lg: 28,
  xl: 42,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColorFromName(name: string): string {
  const colors = [
    '#6C5CE7', '#0984E3', '#2ECC71', '#F39C12',
    '#E74C3C', '#8B7CF0', '#00CEC9', '#E17055',
    '#A29BFE', '#55EFC4', '#FDCB6E', '#74B9FF',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ uri, name, size = 'md' }: AvatarProps) {
  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: Colors.surfaceLight,
        }}
      />
    );
  }

  return (
    <View
      style={{
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
        backgroundColor: getColorFromName(name),
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize, fontWeight: '700' }}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
