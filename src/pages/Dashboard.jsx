import { SearchX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { BalanceTrendChart } from '../components/charts/BalanceTrendChart'
import { CategorySpendingChart } from '../components/charts/CategorySpendingChart'
import { InsightsPanel } from '../components/insights/InsightsPanel'
import { AddTransactionModal } from '../components/transactions/AddTransactionModal'
import { TransactionFilters } from '../components/transactions/TransactionFilters'
import { TransactionTable } from '../components/transactions/TransactionTable'
import { AdminOnly } from '../components/ui/AdminOnly'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SummaryCard } from '../components/ui/SummaryCard'
import { useDatasetFiltered } from '../hooks/useDatasetFiltered'
import { useFinanceCalc } from '../hooks/useFinanceCalc'
import { useFinanceStore } from '../store/useFinanceStore'
import {
  getCategoryExpenseBreakdown,
  getCumulativeBalanceLast6Months,
  getInsights,
} from '../utils/analytics'

function formatCurrency(n) {
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`
}

export function Dashboard() {
  const allTransactions = useFinanceStore((s) => s.transactions)
  const searchQuery = useFinanceStore((s) => s.searchQuery)
  const setSearch = useFinanceStore((s) => s.setSearch)
  const setFilter = useFinanceStore((s) => s.setFilter)

  const dataset = useDatasetFiltered()
  const calc = useFinanceCalc(dataset)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const balanceTrend = useMemo(
    () => getCumulativeBalanceLast6Months(dataset),
    [dataset],
  )

  const categoryData = useMemo(
    () => getCategoryExpenseBreakdown(dataset),
    [dataset],
  )
  const totalCategoryExpense = useMemo(
    () => categoryData.reduce((sum, category) => sum + category.value, 0),
    [categoryData],
  )

  const insights = useMemo(() => getInsights(dataset), [dataset])

  const hasNoSearchResults =
    allTransactions.length > 0 && dataset.length === 0

  const emptyTitle =
    searchQuery.trim().length > 0
      ? `No results for '${searchQuery.trim()}'`
      : 'No transactions match your filters'

  function openAdd() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(tx) {
    setEditing(tx)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditing(null)
  }

  return (
    <>
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 overflow-x-hidden px-6 py-6 md:grid-cols-2 lg:grid-cols-3">
        <section id="overview" className="scroll-mt-28 md:col-span-2 lg:col-span-3">
          <div className="w-full rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-indigo-50/80 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/80 md:p-8">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Overview
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
              Search filters merchants, categories, and types across the same
              Transactions dataset, so your totals, charts, and insights all stay in sync.
            </p>
          </div>
        </section>

        <section className="md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <SummaryCard
              title="Balance"
              value={formatCurrency(calc.balance)}
              subtitle="Filtered dataset"
              variant="balance"
            />
            <SummaryCard
              title="Income"
              value={formatCurrency(calc.income)}
              subtitle="Filtered inflows"
              variant="income"
            />
            <SummaryCard
              title="Expenses"
              value={formatCurrency(calc.expense)}
              subtitle="Filtered outflows"
              variant="expense"
            />
          </div>
        </section>

        {hasNoSearchResults ? (
          <section id="charts" className="scroll-mt-28 md:col-span-2 lg:col-span-3">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-gradient-to-b from-slate-50 to-white p-10 text-center dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
                <SearchX className="h-7 w-7" strokeWidth={1.75} aria-hidden />
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                {emptyTitle}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                Adjust search, type filter, or clear to restore charts and insights.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setFilter({ type: 'all' })
                }}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
              >
                Clear search & filters
              </button>
            </div>
          </section>
        ) : (
          <>
            <section id="charts" className="scroll-mt-28 md:col-span-2 lg:col-span-2">
              <div className="flex h-full w-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
                <SectionHeader
                  title="Balance trend"
                  description="Cumulative balance from your filtered dataset over the last six months in range."
                />
                <BalanceTrendChart data={balanceTrend} />
              </div>
            </section>

            <section className="md:col-span-2 lg:col-span-1">
              <div className="flex h-full w-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
                <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white md:text-xl">
                      Spending mix
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                      Expense categories from the filtered dataset.
                    </p>
                  </div>
                  <div className="self-end rounded-xl bg-slate-50 px-4 py-3 text-right dark:bg-slate-800/70 sm:self-auto">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Total expenses
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-tight tabular-nums text-slate-900 dark:text-white">
                      {formatCurrency(totalCategoryExpense)}
                    </p>
                  </div>
                </div>
                <CategorySpendingChart data={categoryData} />
              </div>
            </section>

            <section id="insights" className="scroll-mt-28 md:col-span-2 lg:col-span-3">
              <div className="flex h-full w-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
                <SectionHeader
                  title="Insights"
                  description="Top category, savings rate, and budget posture from the filtered Transactions data."
                />
                <InsightsPanel items={insights} />
              </div>
            </section>
          </>
        )}

        <section id="transactions" className="scroll-mt-28 md:col-span-2 lg:col-span-3">
          <div className="flex h-full w-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
            <SectionHeader
              title="Transactions"
              description="Sortable list with pagination (10 per page)."
              action={
                <AdminOnly>
                  <button
                    type="button"
                    onClick={openAdd}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-500"
                  >
                    + Add transaction
                  </button>
                </AdminOnly>
              }
            />
            <div className="space-y-4">
              <TransactionFilters />
              <TransactionTable onEdit={openEdit} />
            </div>
          </div>
        </section>
      </main>

      <AdminOnly>
        <AddTransactionModal
          open={modalOpen}
          onClose={closeModal}
          transaction={editing}
        />
      </AdminOnly>
    </>
  )
}
