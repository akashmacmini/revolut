import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

interface AccountSwitcherContentProps {
  onClose: () => void;
}

export function AccountSwitcherContent({
  onClose,
}: AccountSwitcherContentProps) {
  const { accounts, selectedAccount, selectAccount } = useAccounts();

  return (
    <View>
      {accounts.map((account) => {
        const isSelected = account.id === selectedAccount.id;
        return (
          <TouchableOpacity
            key={account.id}
            className="flex-row items-center py-4 border-b border-border"
            onPress={() => {
              selectAccount(account.id);
              onClose();
            }}
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
  );
}
