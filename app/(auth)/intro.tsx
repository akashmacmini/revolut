import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Carousel } from '@/components/ui/Carousel';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing } from '@/lib/constants';

const slides = [
  {
    id: '1',
    icon: 'paper-plane-outline' as const,
    title: 'Send money worldwide',
    subtitle: 'Transfer money to 150+ countries with the real exchange rate.',
  },
  {
    id: '2',
    icon: 'pie-chart-outline' as const,
    title: 'Track spending',
    subtitle: 'Get instant notifications and smart analytics for every transaction.',
  },
  {
    id: '3',
    icon: 'card-outline' as const,
    title: 'Manage cards',
    subtitle: 'Virtual and physical cards with full control at your fingertips.',
  },
];

export default function IntroScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData = slides.map((slide) => ({
    id: slide.id,
    content: (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl }}>
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: Colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.xl,
          }}
        >
          <Ionicons name={slide.icon} size={56} color={Colors.primary} />
        </View>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: Spacing.md }}>
          {slide.title}
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, textAlign: 'center', lineHeight: 24 }}>
          {slide.subtitle}
        </Text>
      </View>
    ),
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Carousel data={carouselData} onIndexChange={setCurrentIndex} />
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl }}>
        <Button onPress={() => router.push('/(auth)/phone-entry')} size="lg" fullWidth>
          Get Started
        </Button>
      </View>
    </SafeAreaView>
  );
}
