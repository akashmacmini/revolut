import React from 'react';
import { View, Pressable } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export function Card({ children, className = '', onPress }: CardProps) {
  const baseClasses = `bg-card rounded-2xl p-4 ${className}`;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={baseClasses}
        style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      >
        {children}
      </Pressable>
    );
  }

  return <View className={baseClasses}>{children}</View>;
}
