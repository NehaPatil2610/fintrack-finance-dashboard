import { useMemo } from 'react'
import { useFinanceStore } from '../store/useFinanceStore'
import { useDatasetFiltered } from './useDatasetFiltered'

/**
 * Table rows: same dataset as cards/charts, then sorted for the table.
 */
export function useFilteredTransactions() {
  const dataset = useDatasetFiltered()
  const filter = useFinanceStore((s) => s.filter)

  return useMemo(() => {
    const list = [...dataset]
    const dir = filter.sortDir === 'asc' ? 1 : -1
    if (filter.sortBy === 'date') {
      list.sort((a, b) => dir * a.date.localeCompare(b.date))
    } else {
      list.sort((a, b) => dir * (a.amount - b.amount))
    }
    return list
  }, [dataset, filter.sortBy, filter.sortDir])
}
