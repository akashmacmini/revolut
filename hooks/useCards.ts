import { useCallback, useState } from 'react';
import { useCardStore, CardColor } from '@/stores/cardStore';
import * as Haptics from 'expo-haptics';

export function useCards() {
  const {
    cards,
    selectedCard,
    selectCard,
    setCardColor,
    setCardLabel,
    setCardSticker,
    setCardPin,
    toggleFreeze,
  } = useCardStore();

  const [revealedField, setRevealedField] = useState<'number' | 'cvv' | null>(null);
  const [revealTimer, setRevealTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const revealField = useCallback(
    (field: 'number' | 'cvv') => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (revealTimer) clearTimeout(revealTimer);
      setRevealedField(field);
      const timer = setTimeout(() => {
        setRevealedField(null);
      }, 30000);
      setRevealTimer(timer);
    },
    [revealTimer]
  );

  const hideField = useCallback(() => {
    if (revealTimer) clearTimeout(revealTimer);
    setRevealedField(null);
  }, [revealTimer]);

  const handleFreeze = useCallback(
    (id: string) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      toggleFreeze(id);
    },
    [toggleFreeze]
  );

  const changeColor = useCallback(
    (id: string, color: CardColor) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCardColor(id, color);
    },
    [setCardColor]
  );

  const maskedNumber = selectedCard
    ? revealedField === 'number'
      ? selectedCard.cardNumber
      : `\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${selectedCard.lastFour}`
    : '';

  const maskedCvv = selectedCard
    ? revealedField === 'cvv'
      ? selectedCard.cvv
      : '\u2022\u2022\u2022'
    : '';

  return {
    cards,
    selectedCard,
    selectCard,
    revealedField,
    revealField,
    hideField,
    maskedNumber,
    maskedCvv,
    handleFreeze,
    changeColor,
    setCardLabel,
    setCardSticker,
    setCardPin,
  };
}
