import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Transaction } from '@/types/database';
import { useTransactions, TransactionGroup } from '@/hooks/useTransactions';
import { Colors } from '@/lib/constants';

const categoryColors: Record<string, string> = {
  'Food & Drink': '#FF6B6B',
  Transport: '#4ECDC4',
  Shopping: '#45B7D1',
  Entertainment: '#96CEB4',
  Income: '#2ECC71',
  Transfers: '#6C5CE7',
  Exchange: '#F39C12',
};

function TransactionRow({
  transaction,
  onPress,
}: {
  transaction: Transaction;
  onPress?: (txn: Transaction) => void;
}) {
  const isPositive = transaction.amount > 0;
  const displayName =
    transaction.merchant_name ?? transaction.description;
  const firstLetter = displayName.charAt(0).toUpperCase();
  const bgColor =
    categoryColors[transaction.category ?? ''] ?? Colors.surfaceLight;
  const amountValue = Math.abs(transaction.amount);
  const amountStr = `${isPositive ? '+' : '-'}\u00A3${(amountValue / 100).toFixed(2)}`;
  const timeStr = format(new Date(transaction.created_at), 'HH:mm');

  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-4"
      onPress={() => onPress?.(transaction)}
      activeOpacity={0.7}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: bgColor }}
      >
        <Text className="text-white text-base font-semibold">
          {firstLetter}
        </Text>
      </View>

      <View className="flex-1">
        <Text className="text-text-primary text-sm font-medium">
          {displayName}
        </Text>
        <Text className="text-text-tertiary text-xs mt-0.5">
          {transaction.category ?? transaction.type} {'\u00B7'} {timeStr}
          {transaction.status === 'pending' && ' \u00B7 Pending'}
        </Text>
      </View>

      <Text
        className={`text-sm font-medium ${
          isPositive ? 'text-success' : 'text-text-primary'
        }`}
      >
        {amountStr}
      </Text>
    </TouchableOpacity>
  );
}

interface TransactionListProps {
  onTransactionPress?: (txn: Transaction) => void;
}

export function TransactionList({ onTransactionPress }: TransactionListProps) {
  const { groupedTransactions } = useTransactions();

  return (
    <View className="mt-2">
      {groupedTransactions.map((group: TransactionGroup) => (
        <View key={group.title}>
          <Text className="text-text-secondary text-xs font-semibold uppercase px-4 py-2 bg-background">
            {group.title}
          </Text>
          {group.data.map((txn) => (
            <TransactionRow
              key={txn.id}
              transaction={txn}
              onPress={onTransactionPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
