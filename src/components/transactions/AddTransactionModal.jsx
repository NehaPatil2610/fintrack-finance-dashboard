import { useState } from 'react'
import { useFinanceStore } from '../../store/useFinanceStore'

const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Travel',
  'Bills',
  'Entertainment',
  'Health',
  'Salary',
  'Freelance',
  'Investments',
]

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function TransactionForm({ transaction, onClose }) {
  const addTransaction = useFinanceStore((s) => s.addTransaction)
  const updateTransaction = useFinanceStore((s) => s.updateTransaction)
  const isEdit = Boolean(transaction)

  const [date, setDate] = useState(
    () => transaction?.date ?? todayISO(),
  )
  const [category, setCategory] = useState(
    () => transaction?.category ?? 'Food',
  )
  const [amount, setAmount] = useState(() =>
    transaction ? String(transaction.amount) : '',
  )
  const [type, setType] = useState(() => transaction?.type ?? 'expense')
  const [merchant, setMerchant] = useState(
    () => transaction?.merchant ?? '',
  )

  function handleSubmit(e) {
    e.preventDefault()
    const payload = { date, category, merchant: merchant.trim(), amount, type }
    if (isEdit) {
      updateTransaction(transaction.id, payload)
    } else {
      addTransaction(payload)
    }
    onClose()
  }

  return (
    <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <h2
        id="tx-modal-title"
        className="text-lg font-semibold text-slate-900 dark:text-white"
      >
        {isEdit ? 'Edit transaction' : 'Add transaction'}
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Date
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-indigo-500/30 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-indigo-500/30 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Merchant / payee
          <input
            type="text"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            placeholder="e.g. Amazon, Acme Payroll"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-indigo-500/30 placeholder:text-slate-400 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Amount
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-indigo-500/30 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <fieldset>
          <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Transaction type
          </legend>
          <div className="mt-2 flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === 'income'}
                onChange={() => setType('income')}
              />
              Income
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
              />
              Expense
            </label>
          </div>
        </fieldset>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
          >
            {isEdit ? 'Save changes' : 'Add transaction'}
          </button>
        </div>
      </form>
    </div>
  )
}

export function AddTransactionModal({ open, onClose, transaction }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tx-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close modal"
        onClick={onClose}
      />
      <TransactionForm
        key={transaction?.id ?? 'new'}
        transaction={transaction}
        onClose={onClose}
      />
    </div>
  )
}
