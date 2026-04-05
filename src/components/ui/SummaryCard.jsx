export function SummaryCard({ title, value, subtitle, variant = 'balance' }) {
  const styles = {
    balance:
      'border-indigo-200/80 bg-white from-indigo-500/10 to-indigo-600/5 dark:border-indigo-500/20 dark:bg-slate-900 dark:from-indigo-500/15 dark:to-indigo-600/5',
    income:
      'border-emerald-200/80 bg-white from-emerald-500/10 to-emerald-600/5 dark:border-emerald-500/20 dark:bg-slate-900 dark:from-emerald-500/15 dark:to-emerald-600/5',
    expense:
      'border-rose-200/80 bg-white from-rose-500/10 to-rose-600/5 dark:border-rose-500/20 dark:bg-slate-900 dark:from-rose-500/15 dark:to-rose-600/5',
  }

  const valueTone = {
    balance: 'text-slate-900 dark:text-white',
    income: 'text-emerald-600 dark:text-emerald-400',
    expense: 'text-rose-600 dark:text-rose-400',
  }

  return (
    <div
      className={`rounded-xl border bg-gradient-to-br p-4 shadow-sm transition-shadow hover:shadow-md md:p-5 ${styles[variant]}`}
    >
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p
        className={`mt-2 text-2xl font-semibold tracking-tight tabular-nums md:text-3xl ${valueTone[variant]}`}
      >
        {value}
      </p>
      {subtitle ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
