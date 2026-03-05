import { useMemo } from 'react';
import { useAccountStore } from '@/stores/accountStore';
import { Transaction } from '@/types/database';
import { format, isToday, isYesterday } from 'date-fns';

export interface TransactionGroup {
  title: string;
  data: Transaction[];
}

export function useTransactions() {
  const transactions = useAccountStore((s) => s.transactions);
  const fetchTransactions = useAccountStore((s) => s.fetchTransactions);

  const groupedTransactions = useMemo((): TransactionGroup[] => {
    const groups = new Map<string, Transaction[]>();

    for (const txn of transactions) {
      const date = new Date(txn.created_at);
      let label: string;
      if (isToday(date)) {
        label = 'Today';
      } else if (isYesterday(date)) {
        label = 'Yesterday';
      } else {
        label = format(date, 'EEEE, d MMMM');
      }

      const existing = groups.get(label);
      if (existing) {
        existing.push(txn);
      } else {
        groups.set(label, [txn]);
      }
    }

    return Array.from(groups.entries()).map(([title, data]) => ({
      title,
      data,
    }));
  }, [transactions]);

  return {
    transactions,
    groupedTransactions,
    fetchTransactions,
  };
}
