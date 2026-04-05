import { AdminOnly } from '../ui/AdminOnly'

export function TransactionRow({ transaction, onEdit, onDelete }) {
  const { date, category, merchant, amount, type } = transaction
  const isIncome = type === 'income'

  return (
    <tr className="border-b border-slate-100 last:border-0 dark:border-slate-800">
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
        {date}
      </td>
      <td className="max-w-[200px] px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
        <div className="font-medium">{category}</div>
        {merchant ? (
          <div className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
            {merchant}
          </div>
        ) : null}
      </td>
      <td
        className={`whitespace-nowrap px-4 py-3 text-right text-sm font-semibold tabular-nums ${
          isIncome ? 'text-emerald-500' : 'text-rose-500'
        }`}
      >
        {isIncome ? '+' : '−'}$
        {amount.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isIncome
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
          }`}
        >
          {type}
        </span>
      </td>
      <AdminOnly>
        <td className="whitespace-nowrap px-4 py-3 text-right">
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => onEdit(transaction)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(transaction)}
              className="text-sm font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400"
            >
              Delete
            </button>
          </div>
        </td>
      </AdminOnly>
    </tr>
  )
}
