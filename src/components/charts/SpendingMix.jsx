import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

/** Curated semantic palette: Teal, Rose, Amber, Violet, Sky */
const PALETTE = ['#14b8a6', '#f43f5e', '#f59e0b', '#8b5cf6', '#0ea5e9']

function formatMoney(n) {
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const row = payload[0]
  const name = row?.name ?? row?.payload?.name
  const value = row?.value

  return (
    <div className="px-1 py-0.5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {name}
      </p>
      <p className="mt-1 text-lg font-semibold tracking-tight tabular-nums text-slate-900 dark:text-white">
        {formatMoney(value)}
      </p>
      <p className="text-xs font-medium text-rose-600 dark:text-rose-400">Expense</p>
    </div>
  )
}

export function SpendingMix({ data }) {
  if (!data?.length) {
    return (
      <div className="flex h-[280px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
        No expense data in the current filter.
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative mx-auto h-[248px] w-full max-w-[320px] md:h-[268px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="90%"
              paddingAngle={5}
              cornerRadius={10}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{
                pointerEvents: 'none',
                zIndex: 1000,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translate(0, 0)',
              }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              content={(props) => <DonutTooltip {...props} />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: PALETTE[i % PALETTE.length] }}
            />
            {d.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
