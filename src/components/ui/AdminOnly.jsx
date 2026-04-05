import { useFinanceStore } from '../../store/useFinanceStore'

export function AdminOnly({ children }) {
  const userRole = useFinanceStore((s) => s.userRole)
  return userRole === 'Admin' ? children : null
}
