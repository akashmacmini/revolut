import React, { useCallback, useState } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/lib/constants';
import { Transaction } from '@/types/database';
import { useAccountStore } from '@/stores/accountStore';
import { BalanceHeader } from '@/components/home/BalanceHeader';
import { QuickActions } from '@/components/home/QuickActions';
import { SetupChecklist } from '@/components/home/SetupChecklist';
import { SpendingInsights } from '@/components/home/SpendingInsights';
import { Watchlist } from '@/components/home/Watchlist';
import { TransactionList } from '@/components/home/TransactionList';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { AccountSwitcherContent } from '@/components/home/AccountSwitcherContent';
import { TransactionDetailContent } from '@/components/home/TransactionDetailContent';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const fetchTransactions = useAccountStore((s) => s.fetchTransactions);

  const [accountSheetOpen, setAccountSheetOpen] = useState(false);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTransactions();
    setTimeout(() => setRefreshing(false), 800);
  }, [fetchTransactions]);

  const handleTransactionPress = useCallback((txn: Transaction) => {
    setSelectedTransaction(txn);
    setDetailSheetOpen(true);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.textSecondary}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <BalanceHeader />
          <QuickActions />
          <SetupChecklist />
          <SpendingInsights />
          <Watchlist />
          <TransactionList onTransactionPress={handleTransactionPress} />
        </ScrollView>
      </SafeAreaView>

      <BottomSheet
        isOpen={accountSheetOpen}
        onClose={() => setAccountSheetOpen(false)}
        title="Accounts"
        snapPoints={['40%']}
      >
        <AccountSwitcherContent
          onClose={() => setAccountSheetOpen(false)}
        />
      </BottomSheet>

      <BottomSheet
        isOpen={detailSheetOpen}
        onClose={() => setDetailSheetOpen(false)}
        title="Transaction"
        snapPoints={['60%']}
      >
        {selectedTransaction && (
          <TransactionDetailContent
            transaction={selectedTransaction}
            onClose={() => setDetailSheetOpen(false)}
          />
        )}
      </BottomSheet>
    </View>
  );
}
