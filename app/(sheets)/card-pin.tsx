import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { PinPad } from '@/components/ui/PinPad';
import { useCardStore } from '@/stores/cardStore';
import { Colors } from '@/lib/constants';

interface CardPinSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'create' | 'confirm' | 'success';

export function CardPinSheet({ isOpen, onClose }: CardPinSheetProps) {
  const { selectedCard, setCardPin } = useCardStore();
  const [step, setStep] = useState<Step>('create');
  const [firstPin, setFirstPin] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const successScale = useSharedValue(0);

  const successStyle = useAnimatedStyle(() => ({
    transform: [{ scale: successScale.value }],
    opacity: successScale.value,
  }));

  const handleReset = useCallback(() => {
    setStep('create');
    setFirstPin('');
    setPin('');
    setError(false);
  }, []);

  const handleClose = useCallback(() => {
    handleReset();
    onClose();
  }, [handleReset, onClose]);

  const handleInput = useCallback(
    (digit: string) => {
      if (step === 'success') return;

      const newPin = pin + digit;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (step === 'create') {
          setFirstPin(newPin);
          setPin('');
          setStep('confirm');
        } else if (step === 'confirm') {
          if (newPin === firstPin) {
            // PINs match - success
            if (selectedCard) {
              setCardPin(selectedCard.id, newPin);
            }
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setStep('success');
            successScale.value = withSequence(
              withTiming(1.2, { duration: 200 }),
              withTiming(1, { duration: 150 })
            );
            // Auto close after animation
            setTimeout(() => {
              handleClose();
            }, 1500);
          } else {
            // PINs don't match
            setError(true);
            setTimeout(() => {
              setPin('');
            }, 500);
          }
        }
      }
    },
    [pin, step, firstPin, selectedCard, setCardPin, successScale, handleClose]
  );

  const handleDelete = useCallback(() => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  }, []);

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      snapPoints={['75%']}
      title={step === 'success' ? '' : step === 'create' ? 'Create a PIN' : 'Confirm your PIN'}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {step === 'success' ? (
          <Animated.View style={[successStyle, { alignItems: 'center' }]}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: Colors.success,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <Ionicons name="checkmark" size={40} color="#FFFFFF" />
            </View>
            <Text style={{ color: Colors.text, fontSize: 18, fontWeight: '600' }}>
              PIN set successfully
            </Text>
          </Animated.View>
        ) : (
          <View style={{ width: '100%' }}>
            {error && (
              <Text
                style={{
                  color: Colors.error,
                  fontSize: 14,
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                PINs don't match. Try again.
              </Text>
            )}
            <PinPad
              length={4}
              value={pin}
              onInput={handleInput}
              onDelete={handleDelete}
              error={error}
            />
          </View>
        )}
      </View>
    </BottomSheet>
  );
}
