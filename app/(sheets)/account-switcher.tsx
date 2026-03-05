import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccounts } from '@/hooks/useAccounts';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { Colors } from '@/lib/constants';

const currencyFlags: Record<string, string> = {
  GBP: '\uD83C\uDDEC\uD83C\uDDE7',
  EUR: '\uD83C\uDDEA\uD83C\uDDFA',
  USD: '\uD83C\uDDFA\uD83C\uDDF8',
};

const currencyNames: Record<string, string> = {
  GBP: 'British Pound',
  EUR: 'Euro',
  USD: 'US Dollar',
};

export default function AccountSwitcherSheet() {
  const { accounts, selectedAccount, selectAccount } = useAccounts();

  const handleSelect = (accountId: string) => {
    selectAccount(accountId);
    router.back();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      edges={['top', 'bottom']}
    >
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-border">
        <Text className="text-text-primary text-lg font-semibold">
          Accounts
        </Text>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View className="px-5 pt-2">
        {accounts.map((account) => {
          const isSelected = account.id === selectedAccount.id;
          return (
            <TouchableOpacity
              key={account.id}
              className="flex-row items-center py-4 border-b border-border"
              onPress={() => handleSelect(account.id)}
              activeOpacity={0.7}
            >
              <Text className="text-2xl mr-3">
                {currencyFlags[account.currency] ?? ''}
              </Text>

              <View className="flex-1">
                <Text className="text-text-primary text-base font-medium">
                  {currencyNames[account.currency] ?? account.currency}
                </Text>
                {account.is_primary && (
                  <Text className="text-text-tertiary text-xs">Primary</Text>
                )}
              </View>

              <CurrencyDisplay
                amount={account.balance}
                currency={account.currency}
                size="sm"
              />

              {isSelected && (
                <Ionicons
                  name="checkmark"
                  size={20}
                  color={Colors.primary}
                  style={{ marginLeft: 8 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
