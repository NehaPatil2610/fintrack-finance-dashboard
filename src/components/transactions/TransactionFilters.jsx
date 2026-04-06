import { useFinanceStore } from '../../store/useFinanceStore'

export function TransactionFilters() {
  const filter = useFinanceStore((s) => s.filter)
  const setFilter = useFinanceStore((s) => s.setFilter)

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        Type
        <select
          value={filter.type}
          onChange={(e) => setFilter({ type: e.target.value })}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm outline-none ring-indigo-500/30 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Navbar search matches merchant, category, and type across the same
        Transactions dataset.
      </p>
    </div>
  )
}
