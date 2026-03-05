import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { useAccounts } from '@/hooks/useAccounts';
import { Colors } from '@/lib/constants';

const currencyFlags: Record<string, string> = {
  GBP: '\uD83C\uDDEC\uD83C\uDDE7',
  EUR: '\uD83C\uDDEA\uD83C\uDDFA',
  USD: '\uD83C\uDDFA\uD83C\uDDF8',
};

export function BalanceHeader() {
  const {
    selectedAccount,
    totalBalance,
    balanceHidden,
    toggleBalanceVisibility,
  } = useAccounts();

  return (
    <View className="items-center pt-4 pb-6">
      <View className="flex-row items-center mb-2">
        <Text className="text-text-secondary text-sm mr-1">
          {currencyFlags[selectedAccount.currency] ?? ''} Total balance
        </Text>
      </View>

      {balanceHidden ? (
        <Text className="text-text-primary text-5xl font-bold">
          {'\u2022\u2022\u2022\u2022\u2022\u2022'}
        </Text>
      ) : (
        <CurrencyDisplay
          amount={totalBalance}
          currency={selectedAccount.currency}
          size="xl"
        />
      )}

      <TouchableOpacity
        onPress={toggleBalanceVisibility}
        className="mt-3 p-2"
        hitSlop={12}
      >
        <Ionicons
          name={balanceHidden ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color={Colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}
