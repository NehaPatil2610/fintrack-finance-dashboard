export function InsightsPanel({ items }) {
  if (!items?.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        Add more activity to unlock insights.
      </div>
    )
  }

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
      <ul className="flex min-w-[min(100%,720px)] gap-4 sm:min-w-0 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="w-[min(280px,85vw)] shrink-0 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:w-auto sm:shrink dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
