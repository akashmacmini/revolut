import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/lib/constants';
import { seedSetupProgress } from '@/lib/seedData';

interface ChecklistItem {
  key: string;
  label: string;
  done: boolean;
}

function getChecklistItems(): ChecklistItem[] {
  const p = seedSetupProgress;
  return [
    { key: 'verify', label: 'Verify identity', done: p.step_verify_identity },
    { key: 'money', label: 'Add money', done: p.step_add_money },
    { key: 'card', label: 'Order card', done: p.step_order_card },
    { key: 'pin', label: 'Set up savings', done: p.step_set_pin },
    {
      key: 'notifications',
      label: 'Invite a friend',
      done: p.step_enable_notifications,
    },
  ];
}

export function SetupChecklist() {
  const [expanded, setExpanded] = useState(false);
  const items = getChecklistItems();
  const completedCount = items.filter((i) => i.done).length;

  if (completedCount === items.length) return null;

  return (
    <Card className="mx-4 mb-4">
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        className="flex-row items-center justify-between"
        activeOpacity={0.7}
      >
        <View className="flex-1">
          <Text className="text-text-primary text-base font-semibold">
            Complete your account
          </Text>
          <Text className="text-text-secondary text-sm mt-1">
            {completedCount} of {items.length}
          </Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={Colors.textSecondary}
        />
      </TouchableOpacity>

      {expanded && (
        <View className="mt-4">
          {items.map((item) => (
            <TouchableOpacity
              key={item.key}
              className="flex-row items-center py-3"
              disabled={item.done}
            >
              <View
                className={`w-6 h-6 rounded-full items-center justify-center mr-3 ${
                  item.done ? 'bg-success' : 'bg-surface-light'
                }`}
              >
                {item.done && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>
              <Text
                className={`text-sm flex-1 ${
                  item.done
                    ? 'text-text-tertiary line-through'
                    : 'text-text-primary'
                }`}
              >
                {item.label}
              </Text>
              {!item.done && (
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Colors.textTertiary}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Card>
  );
}
