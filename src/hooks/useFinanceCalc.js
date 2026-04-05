import { useMemo } from 'react'

/**
 * Derived financial totals — never persisted. Total balance, income, and expense
 * are recomputed with useMemo whenever the `transactions` reference changes,
 * keeping the UI aligned with the source of truth in Zustand.
 */
export function useFinanceCalc(transactions) {
  return useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((a, t) => a + t.amount, 0)
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((a, t) => a + t.amount, 0)
    return {
      balance: income - expense,
      income,
      expense,
    }
  }, [transactions])
}
