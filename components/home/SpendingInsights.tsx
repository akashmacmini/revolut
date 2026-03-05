import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/components/ui/Card';
import { spendingByCategory } from '@/lib/seedData';

function formatAmount(pence: number): string {
  return `\u00A3${(pence / 100).toFixed(2)}`;
}

export function SpendingInsights() {
  const totalSpending = spendingByCategory.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  const maxAmount = Math.max(...spendingByCategory.map((c) => c.amount));

  return (
    <Card className="mx-4 mb-4">
      <Text className="text-text-primary text-base font-semibold mb-1">
        This month
      </Text>
      <Text className="text-text-secondary text-sm mb-4">
        Spent {formatAmount(totalSpending)} - 12% less than last month
      </Text>

      {spendingByCategory.map((item) => (
        <View key={item.category} className="mb-3">
          <View className="flex-row justify-between mb-1">
            <Text className="text-text-primary text-sm">{item.category}</Text>
            <Text className="text-text-secondary text-sm">
              {formatAmount(item.amount)}
            </Text>
          </View>
          <View className="h-2 bg-surface-light rounded-full overflow-hidden">
            <View
              style={{
                width: `${(item.amount / maxAmount) * 100}%`,
                backgroundColor: item.color,
                height: '100%',
                borderRadius: 9999,
              }}
            />
          </View>
        </View>
      ))}
    </Card>
  );
}
