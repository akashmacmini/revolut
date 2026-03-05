import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useAccountStore } from '@/stores/accountStore';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { Colors } from '@/lib/constants';

export default function TransactionDetailSheet() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const transactions = useAccountStore((s) => s.transactions);
  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.surface }}
        edges={['top', 'bottom']}
      >
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Transaction not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const date = new Date(transaction.created_at);
  const displayName =
    transaction.merchant_name ?? transaction.description;

  const statusColors: Record<string, { bg: string; text: string }> = {
    completed: { bg: '#1a3a2a', text: Colors.success },
    pending: { bg: '#3a3a1a', text: Colors.warning },
    failed: { bg: '#3a1a1a', text: Colors.error },
    cancelled: { bg: '#2a2a2a', text: Colors.textSecondary },
  };
  const statusStyle = statusColors[transaction.status] ?? statusColors.completed;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.surface }}
      edges={['top', 'bottom']}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4 border-b border-border">
        <Text className="text-text-primary text-lg font-semibold">
          Transaction
        </Text>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Amount */}
      <View className="items-center py-6 border-b border-border">
        <CurrencyDisplay
          amount={transaction.amount}
          currency={transaction.currency}
          size="lg"
          showSign
        />
        <View
          className="px-3 py-1 rounded-full mt-3"
          style={{ backgroundColor: statusStyle.bg }}
        >
          <Text
            className="text-xs font-medium capitalize"
            style={{ color: statusStyle.text }}
          >
            {transaction.status}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View className="px-5 mt-4">
        <DetailRow label="Merchant" value={displayName} />
        {transaction.category && (
          <DetailRow label="Category" value={transaction.category} />
        )}
        <DetailRow label="Date" value={format(date, 'dd MMMM yyyy')} />
        <DetailRow label="Time" value={format(date, 'HH:mm')} />
        {transaction.reference && (
          <DetailRow label="Reference" value={transaction.reference} />
        )}
      </View>

      {/* Actions */}
      <View className="px-5 mt-6 border-t border-border pt-4">
        <ActionButton icon="create-outline" label="Add note" />
        <ActionButton icon="help-circle-outline" label="Get help" />
        <ActionButton icon="share-outline" label="Share" />
      </View>
    </SafeAreaView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-3">
      <Text className="text-text-secondary text-sm">{label}</Text>
      <Text className="text-text-primary text-sm font-medium">{value}</Text>
    </View>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3"
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={20} color={Colors.textSecondary} />
      <Text className="text-text-primary text-sm ml-3">{label}</Text>
    </TouchableOpacity>
  );
}
