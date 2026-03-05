import { create } from 'zustand';
import { Account, Transaction } from '@/types/database';
import { seedAccounts, seedTransactions } from '@/lib/seedData';

interface AccountState {
  accounts: Account[];
  selectedAccount: Account;
  transactions: Transaction[];
  balanceHidden: boolean;
  selectAccount: (accountId: string) => void;
  fetchTransactions: (accountId?: string) => void;
  toggleBalanceVisibility: () => void;
}

export const useAccountStore = create<AccountState>((set, get) => ({
  accounts: seedAccounts,
  selectedAccount: seedAccounts[0],
  transactions: seedTransactions.filter(
    (t) => t.account_id === seedAccounts[0].id
  ),
  balanceHidden: false,

  selectAccount: (accountId: string) => {
    const account = get().accounts.find((a) => a.id === accountId);
    if (account) {
      set({ selectedAccount: account });
      get().fetchTransactions(accountId);
    }
  },

  fetchTransactions: (accountId?: string) => {
    const id = accountId ?? get().selectedAccount.id;
    const filtered = seedTransactions
      .filter((t) => t.account_id === id)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    set({ transactions: filtered });
  },

  toggleBalanceVisibility: () => {
    set((state) => ({ balanceHidden: !state.balanceHidden }));
  },
}));
