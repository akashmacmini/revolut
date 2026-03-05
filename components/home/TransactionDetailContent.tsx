import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Transaction } from '@/types/database';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { Colors } from '@/lib/constants';

interface TransactionDetailContentProps {
  transaction: Transaction;
  onClose: () => void;
}

function StatusBadge({ status }: { status: Transaction['status'] }) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    completed: { bg: '#1a3a2a', text: Colors.success },
    pending: { bg: '#3a3a1a', text: Colors.warning },
    failed: { bg: '#3a1a1a', text: Colors.error },
    cancelled: { bg: '#2a2a2a', text: Colors.textSecondary },
  };
  const colors = colorMap[status] ?? colorMap.completed;

  return (
    <View
      className="self-center px-3 py-1 rounded-full mt-2"
      style={{ backgroundColor: colors.bg }}
    >
      <Text className="text-xs font-medium capitalize" style={{ color: colors.text }}>
        {status}
      </Text>
    </View>
  );
}

export function TransactionDetailContent({
  transaction,
  onClose,
}: TransactionDetailContentProps) {
  const date = new Date(transaction.created_at);
  const displayName =
    transaction.merchant_name ?? transaction.description;

  return (
    <View className="flex-1">
      {/* Amount */}
      <View className="items-center pb-4 border-b border-border">
        <CurrencyDisplay
          amount={transaction.amount}
          currency={transaction.currency}
          size="lg"
          showSign
        />
        <StatusBadge status={transaction.status} />
      </View>

      {/* Details */}
      <View className="mt-4">
        <DetailRow label="Merchant" value={displayName} />
        {transaction.category && (
          <DetailRow label="Category" value={transaction.category} />
        )}
        <DetailRow
          label="Date"
          value={format(date, 'dd MMMM yyyy')}
        />
        <DetailRow label="Time" value={format(date, 'HH:mm')} />
        {transaction.reference && (
          <DetailRow label="Reference" value={transaction.reference} />
        )}
      </View>

      {/* Actions */}
      <View className="mt-6 border-t border-border pt-4">
        <ActionRow
          icon="create-outline"
          label="Add note"
          onPress={() => {}}
        />
        <ActionRow
          icon="help-circle-outline"
          label="Get help"
          onPress={() => {}}
        />
        <ActionRow
          icon="share-outline"
          label="Share"
          onPress={() => {}}
        />
      </View>
    </View>
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

function ActionRow({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={20} color={Colors.textSecondary} />
      <Text className="text-text-primary text-sm ml-3">{label}</Text>
    </TouchableOpacity>
  );
}
