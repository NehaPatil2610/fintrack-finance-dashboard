import { LayoutDashboard, LineChart, List, Sparkles } from 'lucide-react'

const ITEMS = [
  { href: '#overview', label: 'Home', icon: LayoutDashboard },
  { href: '#charts', label: 'Charts', icon: LineChart },
  { href: '#insights', label: 'Insights', icon: Sparkles },
  { href: '#transactions', label: 'Transactions', icon: List },
]

export function BottomNav({ onNavigate }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
              <span className="truncate">{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
