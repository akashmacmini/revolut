import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { Colors, Spacing, BorderRadius } from '@/lib/constants';

type DocType = 'passport' | 'national_id';

const DOC_OPTIONS: { id: DocType; label: string; icon: string; description: string }[] = [
  { id: 'passport', label: 'Passport', icon: 'book-outline', description: 'International travel document' },
  { id: 'national_id', label: 'National ID', icon: 'card-outline', description: 'Government-issued identity card' },
];

export default function IdentityDocTypeScreen() {
  const router = useRouter();
  const { setField } = useOnboardingStore();
  const [selectedDoc, setSelectedDoc] = useState<DocType | null>(null);

  const handleContinue = () => {
    if (!selectedDoc) return;
    setField('documentType', selectedDoc);
    router.push('/(auth)/identity-photo');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StepHeader onBack={() => router.back()} progress={13 / 18} />

      <View style={{ flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.xl }}>
        <Text style={{ color: Colors.text, fontSize: 28, fontWeight: '800', marginBottom: Spacing.sm }}>
          Verify your identity
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 16, marginBottom: Spacing.xl }}>
          Choose a document to verify your identity
        </Text>

        <View style={{ gap: 12 }}>
          {DOC_OPTIONS.map((doc) => {
            const isSelected = selectedDoc === doc.id;
            return (
              <TouchableOpacity
                key={doc.id}
                onPress={() => setSelectedDoc(doc.id)}
                activeOpacity={0.7}
                style={{
                  backgroundColor: Colors.surface,
                  borderRadius: BorderRadius.lg,
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  borderWidth: 2,
                  borderColor: isSelected ? Colors.primary : Colors.border,
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    backgroundColor: isSelected ? Colors.primary + '20' : Colors.surfaceLight,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons
                    name={doc.icon as any}
                    size={28}
                    color={isSelected ? Colors.primary : Colors.textSecondary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: Colors.text, fontSize: 18, fontWeight: '700', marginBottom: 4 }}>
                    {doc.label}
                  </Text>
                  <Text style={{ color: Colors.textSecondary, fontSize: 14 }}>
                    {doc.description}
                  </Text>
                </View>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl }}>
        <Button
          onPress={handleContinue}
          size="lg"
          fullWidth
          variant={selectedDoc ? 'primary' : 'disabled'}
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
}
