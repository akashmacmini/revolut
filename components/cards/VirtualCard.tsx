import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

type CardColor = 'dark' | 'purple' | 'blue' | 'gradient';

interface VirtualCardProps {
  lastFour: string;
  cardholderName: string;
  color?: CardColor;
  onFlip?: () => void;
}

const gradientColors: Record<CardColor, [string, string, ...string[]]> = {
  dark: ['#1C1C1E', '#2C2C2E'],
  purple: ['#6C5CE7', '#8B7CF0'],
  blue: ['#0984E3', '#74B9FF'],
  gradient: ['#6C5CE7', '#0984E3'],
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export function VirtualCard({
  lastFour,
  cardholderName,
  color = 'dark',
  onFlip,
}: VirtualCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    rotation.value = withTiming(next ? 180 : 0, {
      duration: 600,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    onFlip?.();
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  const colors = gradientColors[color];

  return (
    <TouchableOpacity
      onPress={handleFlip}
      activeOpacity={0.95}
      style={{ aspectRatio: 1.586 }} // Standard credit card ratio (85.6mm x 53.98mm)
    >
      {/* Front */}
      <AnimatedLinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          frontStyle,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 16,
            padding: 24,
            justifyContent: 'space-between',
          },
        ]}
      >
        {/* Top row: chip area + logo */}
        <View className="flex-row justify-between items-start">
          {/* Chip placeholder */}
          <View className="w-10 h-7 rounded-md bg-white/20" />
          {/* Logo placeholder */}
          <Text className="text-white/60 text-sm font-bold tracking-wider">
            REVOLUT
          </Text>
        </View>

        {/* Card number */}
        <Text className="text-white text-lg tracking-[4px] font-medium">
          {'\u2022\u2022\u2022\u2022  \u2022\u2022\u2022\u2022  \u2022\u2022\u2022\u2022  '}{lastFour}
        </Text>

        {/* Cardholder */}
        <View className="flex-row justify-between items-end">
          <Text className="text-white text-sm font-medium tracking-wider uppercase">
            {cardholderName}
          </Text>
          {/* Card network placeholder */}
          <Text className="text-white/40 text-xs font-bold">VISA</Text>
        </View>
      </AnimatedLinearGradient>

      {/* Back */}
      <AnimatedLinearGradient
        colors={['#1C1C1E', '#2C2C2E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          backStyle,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 16,
            justifyContent: 'center',
          },
        ]}
      >
        {/* Magnetic stripe */}
        <View
          className="bg-black/60 h-12 w-full mb-6"
          style={{ marginTop: -20 }}
        />

        {/* CVV area */}
        <View className="mx-6">
          <View className="bg-white/10 rounded-lg px-4 py-3 flex-row justify-between items-center">
            <Text className="text-text-secondary text-xs tracking-wider">
              CVV
            </Text>
            <Text className="text-white text-base font-semibold tracking-[6px]">
              {'\u2022\u2022\u2022'}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="absolute bottom-5 right-6">
          <Text className="text-white/30 text-xs font-bold tracking-wider">
            REVOLUT
          </Text>
        </View>
      </AnimatedLinearGradient>
    </TouchableOpacity>
  );
}
