import { useFinanceStore } from '../../store/useFinanceStore'

export function RoleSwitcher() {
  const userRole = useFinanceStore((s) => s.userRole)
  const setUserRole = useFinanceStore((s) => s.setUserRole)

  return (
    <label className="flex min-w-0 items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <span className="hidden sm:inline">Role</span>
      <select
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
        className="w-[96px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm outline-none ring-indigo-500/30 transition focus:ring-2 sm:w-auto dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <option value="Viewer">Viewer</option>
        <option value="Admin">Admin</option>
      </select>
    </label>
  )
}
