import { useId } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function formatMoney(n) {
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

function BalanceTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const value = payload[0]?.value

  return (
    <div className="rounded-xl border border-slate-200/70 bg-white/85 px-4 py-3 shadow-2xl backdrop-blur-md dark:border-slate-600/60 dark:bg-slate-900/90">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold tracking-tight tabular-nums text-slate-900 dark:text-white">
        {formatMoney(value)}
      </p>
      <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
        Balance
      </p>
    </div>
  )
}

export function BalanceTrendChart({ data }) {
  const gradId = useId().replace(/:/g, '')

  if (!data?.length) {
    return (
      <div className="flex h-[280px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
        Not enough data to plot balance trend.
      </div>
    )
  }

  return (
    <div className="h-[280px] w-full md:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--chart-grid-stroke)"
            vertical={false}
            horizontal
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: 'currentColor' }}
            className="text-slate-500 dark:text-slate-400"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'currentColor' }}
            className="text-slate-500 dark:text-slate-400"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip
            content={(props) => <BalanceTooltip {...props} />}
            cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            className="fintrack-area-glow"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
