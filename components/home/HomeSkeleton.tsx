import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard } from '@/components/ui/Skeleton';
import { Colors, Spacing } from '@/lib/constants';

export function HomeSkeleton() {
  return (
    <View style={styles.container}>
      {/* Balance skeleton */}
      <View style={styles.balanceSection}>
        <SkeletonText width={100} height={14} />
        <Skeleton width={180} height={36} borderRadius={8} style={{ marginTop: Spacing.sm }} />
      </View>

      {/* Quick actions skeleton - 4 circles */}
      <View style={styles.quickActions}>
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={styles.quickAction}>
            <SkeletonCircle size={48} />
            <SkeletonText width={48} height={10} style={{ marginTop: Spacing.xs }} />
          </View>
        ))}
      </View>

      {/* Transaction list skeleton - 8 rows */}
      <View style={styles.transactions}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View key={i} style={styles.transactionRow}>
            <SkeletonCircle size={40} />
            <View style={styles.transactionText}>
              <SkeletonText width={140} height={14} />
              <SkeletonText width={90} height={12} style={{ marginTop: Spacing.xs }} />
            </View>
            <SkeletonText width={60} height={14} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  quickAction: {
    alignItems: 'center',
  },
  transactions: {
    gap: Spacing.md,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  transactionText: {
    flex: 1,
  },
});
