import { Eye } from 'lucide-react'
import { useFinanceStore } from '../../store/useFinanceStore'

export function ReadOnlyBadge() {
  const userRole = useFinanceStore((s) => s.userRole)
  if (userRole !== 'Viewer') return null

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-slate-100/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-300">
      <Eye className="h-3.5 w-3.5 opacity-80" aria-hidden />
      Read-only mode
    </span>
  )
}
