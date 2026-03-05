import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../lib/constants';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'disabled';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress: () => void;
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: Colors.primary, text: '#FFFFFF' },
  secondary: { bg: Colors.surface, text: '#FFFFFF', border: Colors.border },
  ghost: { bg: 'transparent', text: Colors.primary },
  disabled: { bg: Colors.surface, text: Colors.textTertiary },
};

const sizeStyles: Record<ButtonSize, { height: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { height: 40, paddingHorizontal: 16, fontSize: 14 },
  md: { height: 52, paddingHorizontal: 24, fontSize: 16 },
  lg: { height: 56, paddingHorizontal: 32, fontSize: 18 },
};

export function Button({
  variant = 'primary',
  size = 'md',
  onPress,
  children,
  loading,
  fullWidth,
  icon,
}: ButtonProps) {
  const isDisabled = variant === 'disabled' || loading;
  const styles = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const handlePress = () => {
    if (isDisabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={{
        backgroundColor: styles.bg,
        height: sizeStyle.height,
        paddingHorizontal: sizeStyle.paddingHorizontal,
        borderRadius: 16,
        borderWidth: styles.border ? 1 : 0,
        borderColor: styles.border,
        opacity: isDisabled ? 0.5 : 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: fullWidth ? 'stretch' : 'auto',
      }}
    >
      {loading ? (
        <ActivityIndicator color={styles.text} size="small" />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          {typeof children === 'string' ? (
            <Text
              style={{
                color: styles.text,
                fontSize: sizeStyle.fontSize,
                fontWeight: '600',
              }}
            >
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}
