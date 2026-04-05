const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Travel',
  'Bills',
  'Entertainment',
  'Health',
]

const EXPENSE_MERCHANTS = {
  Food: 'Whole Foods Market',
  Transport: 'Metro Transit',
  Shopping: 'Amazon',
  Travel: 'Delta Airlines',
  Bills: 'City Utilities Co',
  Entertainment: 'Netflix',
  Health: 'CVS Pharmacy',
}

function merchantForExpense(cat) {
  return EXPENSE_MERCHANTS[cat] ?? 'Merchant'
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

function randomBetween(min, max) {
  return Math.round(min + Math.random() * (max - min))
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Exactly 100 transactions; dates as ISO calendar strings (YYYY-MM-DD).
 * Each row includes optional merchant for search (e.g. "Amazon", payroll).
 */
function buildMockTransactions() {
  const list = []
  let id = 1

  const monthSpecs = [
    { y: 2025, m: 9, days: 30 },
    { y: 2025, m: 10, days: 31 },
    { y: 2025, m: 11, days: 30 },
    { y: 2025, m: 12, days: 31 },
    { y: 2026, m: 1, days: 31 },
    { y: 2026, m: 2, days: 28 },
    { y: 2026, m: 3, days: 31 },
  ]

  for (const spec of monthSpecs) {
    const salaryDay = Math.min(28, spec.days)
    list.push({
      id: id++,
      date: `${spec.y}-${pad2(spec.m)}-${pad2(salaryDay)}`,
      category: 'Salary',
      merchant: 'Acme Corp Payroll',
      amount: 5200 + (spec.m % 3) * 50,
      type: 'income',
    })

    if (spec.m % 2 === 0) {
      list.push({
        id: id++,
        date: `${spec.y}-${pad2(spec.m)}-${pad2(randomBetween(5, 12))}`,
        category: 'Freelance',
        merchant: 'Upwork',
        amount: randomBetween(400, 1800),
        type: 'income',
      })
    }

    if (spec.m % 3 === 0) {
      list.push({
        id: id++,
        date: `${spec.y}-${pad2(spec.m)}-${pad2(randomBetween(15, 22))}`,
        category: 'Investments',
        merchant: 'Fidelity Dividends',
        amount: randomBetween(120, 650),
        type: 'income',
      })
    }

    const txThisMonth = randomBetween(10, 16)
    for (let i = 0; i < txThisMonth; i++) {
      const day = randomBetween(1, spec.days)
      const cat = pick(EXPENSE_CATEGORIES)
      const base =
        cat === 'Travel'
          ? randomBetween(80, 900)
          : cat === 'Bills'
            ? randomBetween(45, 320)
            : cat === 'Shopping'
              ? randomBetween(25, 450)
              : cat === 'Food'
                ? randomBetween(12, 140)
                : cat === 'Transport'
                  ? randomBetween(8, 95)
                  : cat === 'Health'
                    ? randomBetween(25, 220)
                    : randomBetween(15, 180)

      list.push({
        id: id++,
        date: `${spec.y}-${pad2(spec.m)}-${pad2(day)}`,
        category: cat,
        merchant: merchantForExpense(cat),
        amount: base,
        type: 'expense',
      })
    }
  }

  list.sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id)
  const trimmed = list.slice(0, 100)
  trimmed.forEach((t, i) => {
    t.id = i + 1
  })

  return trimmed
}

export const mockTransactions = buildMockTransactions()
