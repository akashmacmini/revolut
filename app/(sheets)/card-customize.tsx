import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { CardColorPicker } from '@/components/cards/CardColorPicker';
import { Button } from '@/components/ui/Button';
import { useCardStore, CardColor } from '@/stores/cardStore';
import { Colors, BorderRadius, Spacing } from '@/lib/constants';

interface CardCustomizeSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const stickers = ['\uD83C\uDFAF', '\uD83D\uDCB0', '\u2708\uFE0F', '\uD83C\uDFAE', '\uD83C\uDFB5', '\uD83C\uDFCB\uFE0F'];

export function CardCustomizeSheet({ isOpen, onClose }: CardCustomizeSheetProps) {
  const { selectedCard, setCardColor, setCardLabel, setCardSticker } = useCardStore();
  const [color, setColor] = useState<CardColor>(selectedCard?.color ?? 'dark');
  const [label, setLabel] = useState(selectedCard?.label ?? '');
  const [sticker, setSticker] = useState<string | undefined>(selectedCard?.sticker);

  const handleApply = () => {
    if (!selectedCard) return;
    setCardColor(selectedCard.id, color);
    setCardLabel(selectedCard.id, label);
    setCardSticker(selectedCard.id, sticker);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Customize card" snapPoints={['70%']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Card color */}
        <View style={{ marginBottom: Spacing.lg }}>
          <Text style={{ color: Colors.textSecondary, fontSize: 13, fontWeight: '600', marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 1 }}>
            Card color
          </Text>
          <CardColorPicker selected={color} onSelect={setColor} />
        </View>

        {/* Card label */}
        <View style={{ marginBottom: Spacing.lg }}>
          <Text style={{ color: Colors.textSecondary, fontSize: 13, fontWeight: '600', marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 1 }}>
            Card label
          </Text>
          <TextInput
            value={label}
            onChangeText={setLabel}
            placeholder="Optional custom text"
            placeholderTextColor={Colors.textTertiary}
            maxLength={20}
            style={{
              backgroundColor: Colors.surfaceLight,
              color: Colors.text,
              fontSize: 16,
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderRadius: BorderRadius.md,
            }}
          />
        </View>

        {/* Stickers */}
        <View style={{ marginBottom: Spacing.xl }}>
          <Text style={{ color: Colors.textSecondary, fontSize: 13, fontWeight: '600', marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 1 }}>
            Stickers
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {stickers.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                onPress={() => setSticker(sticker === emoji ? undefined : emoji)}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: BorderRadius.md,
                  backgroundColor: sticker === emoji ? Colors.primary : Colors.surfaceLight,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 24 }}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button onPress={handleApply} fullWidth>
          Apply
        </Button>
        <View style={{ height: 32 }} />
      </ScrollView>
    </BottomSheet>
  );
}
