import { useMemo } from 'react'
import { useFinanceStore } from '../store/useFinanceStore'

/**
 * Applies search + type filter (no sort). Used for summary cards, charts, and insights
 * so they stay aligned with the same "dataset" the user is exploring.
 */
export function filterDataset(transactions, searchQuery, typeFilter) {
  let list = transactions
  const q = searchQuery.trim().toLowerCase()
  if (q) {
    list = list.filter((t) => {
      const merchant = (t.merchant ?? '').toLowerCase()
      const category = t.category.toLowerCase()
      const typ = t.type.toLowerCase()
      return (
        merchant.includes(q) || category.includes(q) || typ.includes(q)
      )
    })
  }
  if (typeFilter !== 'all') {
    list = list.filter((t) => t.type === typeFilter)
  }
  return list
}

export function useDatasetFiltered() {
  const transactions = useFinanceStore((s) => s.transactions)
  const searchQuery = useFinanceStore((s) => s.searchQuery)
  const typeFilter = useFinanceStore((s) => s.filter.type)

  return useMemo(
    () => filterDataset(transactions, searchQuery, typeFilter),
    [transactions, searchQuery, typeFilter],
  )
}
