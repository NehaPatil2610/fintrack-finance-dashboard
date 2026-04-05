const MONTH_LABEL = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
})

function monthKey(dateStr) {
  return dateStr.slice(0, 7)
}

export function getSummary(transactions) {
  let income = 0
  let expense = 0
  for (const t of transactions) {
    if (t.type === 'income') income += t.amount
    else expense += t.amount
  }
  return {
    totalIncome: income,
    totalExpenses: expense,
    totalBalance: income - expense,
  }
}

/**
 * Cumulative balance at each month-end, limited to the last 6 months in the dataset.
 */
export function getCumulativeBalanceLast6Months(transactions) {
  if (!transactions.length) return []

  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date))
  const allMonthKeys = [
    ...new Set(sorted.map((t) => monthKey(t.date))),
  ].sort()
  const last6 = allMonthKeys.slice(-6)

  const byMonth = new Map()
  for (const k of allMonthKeys) {
    byMonth.set(k, { income: 0, expense: 0 })
  }
  for (const t of sorted) {
    const k = monthKey(t.date)
    const row = byMonth.get(k)
    if (!row) continue
    if (t.type === 'income') row.income += t.amount
    else row.expense += t.amount
  }

  let cum = 0
  const result = []
  for (const k of allMonthKeys) {
    const { income, expense } = byMonth.get(k)
    cum += income - expense
    if (last6.includes(k)) {
      result.push({
        monthKey: k,
        month: MONTH_LABEL.format(new Date(`${k}-01T12:00:00`)),
        balance: Math.round(cum * 100) / 100,
      })
    }
  }
  return result
}

export function getCategoryExpenseBreakdown(transactions) {
  const map = new Map()
  for (const t of transactions) {
    if (t.type !== 'expense') continue
    map.set(t.category, (map.get(t.category) ?? 0) + t.amount)
  }
  return [...map.entries()]
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value)
}

export function getMonthlyIncomeVsExpense(transactions) {
  const map = new Map()
  for (const t of transactions) {
    const k = monthKey(t.date)
    if (!map.has(k)) map.set(k, { income: 0, expense: 0 })
    const row = map.get(k)
    if (t.type === 'income') row.income += t.amount
    else row.expense += t.amount
  }
  const keys = [...map.keys()].sort()
  const last = keys[keys.length - 1]
  if (!last) return { monthKey: null, income: 0, expense: 0, net: 0 }
  const { income, expense } = map.get(last)
  return {
    monthKey: last,
    income: Math.round(income * 100) / 100,
    expense: Math.round(expense * 100) / 100,
    net: Math.round((income - expense) * 100) / 100,
  }
}

export function getHighestSpendingCategory(transactions) {
  const breakdown = getCategoryExpenseBreakdown(transactions)
  if (!breakdown.length) return null
  return breakdown[0]
}

/** Latest month: savings as % of income (0 if no income). */
export function getLatestMonthlySavingsPercent(transactions) {
  const m = getMonthlyIncomeVsExpense(transactions)
  if (!m.monthKey || m.income <= 0) return { percent: 0, monthKey: m.monthKey }
  const pct = ((m.income - m.expense) / m.income) * 100
  return {
    percent: Math.round(pct * 10) / 10,
    monthKey: m.monthKey,
  }
}

/**
 * Compare latest month expenses to a simple 65% of income budget ceiling.
 */
export function getBudgetStatus(transactions) {
  const m = getMonthlyIncomeVsExpense(transactions)
  if (!m.monthKey || m.income <= 0) {
    return { status: 'unknown', detail: 'Not enough income data to score budget.' }
  }
  const ceiling = m.income * 0.65
  if (m.expense <= ceiling) {
    return {
      status: 'on_track',
      detail: `Spending is below 65% of income this month ($${m.expense.toLocaleString()} vs ceiling ~$${Math.round(ceiling).toLocaleString()}).`,
    }
  }
  return {
    status: 'over',
    detail: `Spending exceeds the 65% income guideline ($${m.expense.toLocaleString()} vs ~$${Math.round(ceiling).toLocaleString()}).`,
  }
}

export function getInsights(transactions) {
  const high = getHighestSpendingCategory(transactions)
  const sav = getLatestMonthlySavingsPercent(transactions)
  const budget = getBudgetStatus(transactions)

  const items = []

  if (high) {
    items.push({
      id: 'top-cat',
      title: 'Top spending category',
      detail: `${high.name} — $${high.value.toLocaleString()} in expenses.`,
    })
  }

  items.push({
    id: 'savings-pct',
    title: 'Monthly savings %',
    detail:
      sav.monthKey && getMonthlyIncomeVsExpense(transactions).income > 0
        ? `Latest month savings rate: ${sav.percent}% of income.`
        : 'Add income in the latest month to calculate savings %.',
  })

  items.push({
    id: 'budget',
    title: 'Budget status',
    detail: budget.detail,
  })

  return items
}
