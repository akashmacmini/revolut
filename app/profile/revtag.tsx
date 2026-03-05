import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/lib/constants';
import { StepHeader } from '@/components/layout/StepHeader';
import { Button } from '@/components/ui/Button';

type AvailabilityStatus = 'idle' | 'checking' | 'available' | 'unavailable' | 'invalid';

export default function RevTagScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<AvailabilityStatus>('idle');

  const validateTag = (tag: string): boolean => {
    return /^[a-z0-9_]{3,20}$/.test(tag);
  };

  useEffect(() => {
    if (username.length === 0) {
      setStatus('idle');
      return;
    }

    if (!validateTag(username)) {
      setStatus('invalid');
      return;
    }

    setStatus('checking');
    const timer = setTimeout(() => {
      // Mock availability check - always available except "taken"
      if (username === 'taken') {
        setStatus('unavailable');
      } else {
        setStatus('available');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [username]);

  const handleTextChange = (text: string) => {
    // Force lowercase, remove spaces
    setUsername(text.toLowerCase().replace(/\s/g, ''));
  };

  const handleSave = () => {
    if (status === 'available') {
      router.back();
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'available': return Colors.success;
      case 'unavailable': return Colors.error;
      case 'invalid': return Colors.warning;
      default: return Colors.textTertiary;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'checking': return 'Checking availability...';
      case 'available': return 'This RevTag is available!';
      case 'unavailable': return 'This RevTag is already taken';
      case 'invalid': return 'Must be 3-20 characters (lowercase, numbers, underscores)';
      default: return '';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StepHeader title="RevTag" onBack={() => router.back()} />

      <View className="flex-1 px-6 pt-8">
        {/* Large @ symbol */}
        <View className="items-center mb-8">
          <Text
            style={{ color: Colors.primary }}
            className="text-6xl font-bold"
          >
            @
          </Text>
        </View>

        {/* Input */}
        <View
          className="flex-row items-center rounded-2xl px-4 h-14"
          style={{ backgroundColor: Colors.surface }}
        >
          <Text style={{ color: Colors.textTertiary }} className="text-lg mr-1">
            @
          </Text>
          <TextInput
            value={username}
            onChangeText={handleTextChange}
            placeholder="username"
            placeholderTextColor={Colors.textTertiary}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            maxLength={20}
            style={{ color: Colors.text, fontSize: 18, flex: 1 }}
          />
          {status === 'checking' && (
            <ActivityIndicator size="small" color={Colors.textSecondary} />
          )}
          {status === 'available' && (
            <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
          )}
          {status === 'unavailable' && (
            <Ionicons name="close-circle" size={22} color={Colors.error} />
          )}
          {status === 'invalid' && username.length > 0 && (
            <Ionicons name="warning" size={22} color={Colors.warning} />
          )}
        </View>

        {/* Status message */}
        {status !== 'idle' && (
          <Text
            style={{ color: getStatusColor() }}
            className="text-sm mt-2 ml-1"
          >
            {getStatusMessage()}
          </Text>
        )}

        {/* Description */}
        <Text className="text-text-secondary text-sm mt-6 text-center leading-5">
          Your RevTag is how friends find you on Revolut.{'\n'}
          You can change it anytime.
        </Text>

        {/* Save button */}
        <View className="mt-auto mb-8">
          <Button
            variant={status === 'available' ? 'primary' : 'disabled'}
            size="lg"
            fullWidth
            onPress={handleSave}
          >
            Save
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
