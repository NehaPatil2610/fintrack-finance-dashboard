import { Inbox, SearchX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions'
import { useFinanceStore } from '../../store/useFinanceStore'
import { AdminOnly } from '../ui/AdminOnly'
import { TransactionRow } from './TransactionRow'

const PAGE_SIZE = 10

function PaginatedTableBody({
  visible,
  onEdit,
  filter,
  setFilter,
  deleteTransaction,
}) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const pageSlice = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return visible.slice(start, start + PAGE_SIZE)
  }, [visible, currentPage])

  function toggleSort(field) {
    if (filter.sortBy === field) {
      setFilter({
        sortBy: field,
        sortDir: filter.sortDir === 'asc' ? 'desc' : 'asc',
      })
      return
    }

    setFilter({ sortBy: field, sortDir: 'desc' })
  }

  const sortIcon = (field) =>
    filter.sortBy === field ? (filter.sortDir === 'asc' ? '^' : 'v') : ''

  function handleDelete(tx) {
    if (
      typeof window !== 'undefined' &&
      !window.confirm('Delete this transaction?')
    ) {
      return
    }

    deleteTransaction(tx.id)
  }

  return (
    <div className="space-y-4">
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50/80 dark:bg-slate-800/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                <button
                  type="button"
                  onClick={() => toggleSort('date')}
                  className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Date {sortIcon('date')}
                </button>
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                Category
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => toggleSort('amount')}
                  className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                >
                  Amount {sortIcon('amount')}
                </button>
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                Type
              </th>
              <AdminOnly>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                >
                  Actions
                </th>
              </AdminOnly>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800/50 dark:bg-slate-900">
            {pageSlice.map((t) => (
              <TransactionRow
                key={t.id}
                transaction={t}
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{' '}
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {visible.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
            {' - '}
            {Math.min(currentPage * PAGE_SIZE, visible.length)}
          </span>{' '}
          of {visible.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:enabled:hover:bg-slate-700"
          >
            Previous
          </button>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:enabled:hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export function TransactionTable({ onEdit }) {
  const transactions = useFinanceStore((s) => s.transactions)
  const userRole = useFinanceStore((s) => s.userRole)
  const searchQuery = useFinanceStore((s) => s.searchQuery)
  const filter = useFinanceStore((s) => s.filter)
  const setFilter = useFinanceStore((s) => s.setFilter)
  const setSearch = useFinanceStore((s) => s.setSearch)
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction)

  const visible = useFilteredTransactions()

  const filterKey = `${searchQuery}|${filter.type}|${filter.sortBy}|${filter.sortDir}`

  function clearFilters() {
    setSearch('')
    setFilter({ type: 'all' })
  }

  if (!transactions.length) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-10 text-center dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
          <Inbox className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          No transactions yet
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {userRole === 'Admin'
            ? 'Start by adding your first transaction from the button above.'
            : 'Switch to Admin to add transactions, or stay in read-only mode.'}
        </p>
      </div>
    )
  }

  if (!visible.length) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-10 text-center dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
          <SearchX className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          No transactions found
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          Nothing matches your search or filters. Try another keyword, such as
          Shopping, or clear filters to see everything again.
        </p>
        <button
          type="button"
          onClick={clearFilters}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
        >
          Clear filters
        </button>
      </div>
    )
  }

  return (
    <PaginatedTableBody
      key={filterKey}
      visible={visible}
      onEdit={onEdit}
      filter={filter}
      setFilter={setFilter}
      deleteTransaction={deleteTransaction}
    />
  )
}
