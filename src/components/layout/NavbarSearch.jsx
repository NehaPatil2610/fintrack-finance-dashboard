import { Search, X } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore'

export function NavbarSearch({ id = 'global-search' }) {
  const searchQuery = useFinanceStore((s) => s.searchQuery)
  const setSearch = useFinanceStore((s) => s.setSearch)
  const hasValue = searchQuery.trim().length > 0

  return (
    <div className="relative min-w-0 w-full">
      <label className="sr-only" htmlFor={id}>
        Search transactions
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        strokeWidth={2}
        aria-hidden
      />
      <input
        id={id}
        type="search"
        value={searchQuery}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search merchant, category..."
        className="w-full rounded-xl border-0 bg-slate-100 py-3 pl-10 pr-10 text-sm text-slate-900 outline-none ring-indigo-500/25 placeholder:text-slate-400 focus:ring-2 dark:bg-slate-800 dark:text-slate-100 sm:rounded-lg sm:py-2.5"
      />
      {hasValue ? (
        <button
          type="button"
          onClick={() => setSearch('')}
          className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200/80 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      ) : null}
    </div>
  )
}
