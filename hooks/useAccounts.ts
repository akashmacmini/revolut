import { useAccountStore } from '@/stores/accountStore';

export function useAccounts() {
  const accounts = useAccountStore((s) => s.accounts);
  const selectedAccount = useAccountStore((s) => s.selectedAccount);
  const selectAccount = useAccountStore((s) => s.selectAccount);
  const balanceHidden = useAccountStore((s) => s.balanceHidden);
  const toggleBalanceVisibility = useAccountStore(
    (s) => s.toggleBalanceVisibility
  );

  const totalBalance = accounts.reduce((sum, acc) => {
    // Simplified: treat all as GBP equivalent for display
    if (acc.currency === 'GBP') return sum + acc.balance;
    if (acc.currency === 'EUR') return sum + Math.round(acc.balance * 0.86);
    if (acc.currency === 'USD') return sum + Math.round(acc.balance * 0.79);
    return sum + acc.balance;
  }, 0);

  return {
    accounts,
    selectedAccount,
    selectAccount,
    totalBalance,
    balanceHidden,
    toggleBalanceVisibility,
  };
}
