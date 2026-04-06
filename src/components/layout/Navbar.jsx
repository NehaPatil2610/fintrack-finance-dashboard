import { Menu, Moon, Sun } from 'lucide-react'
import { NavbarSearch } from './NavbarSearch'
import { RoleSwitcher } from '../ui/RoleSwitcher'

export function Navbar({
  isDesktop,
  mobileMenuOpen,
  sidebarCollapsed,
  onMenuToggle,
  dark,
  onToggleDark,
}) {
  const menuLabel = isDesktop
    ? sidebarCollapsed
      ? 'Expand sidebar'
      : 'Collapse sidebar'
    : mobileMenuOpen
      ? 'Close menu'
      : 'Open menu'

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="order-1 flex shrink-0 items-center">
          <button
            type="button"
            className="inline-flex shrink-0 rounded-xl border border-slate-200 bg-white/90 p-2 text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-expanded={isDesktop ? !sidebarCollapsed : mobileMenuOpen}
            aria-label={menuLabel}
            onClick={onMenuToggle}
          >
            <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="order-3 basis-full md:order-2 md:min-w-0 md:flex-1">
          <NavbarSearch id="global-search" />
        </div>

        <div className="order-2 ml-auto flex shrink-0 items-center gap-2 sm:gap-3 md:order-3 md:ml-0">
          <button
            type="button"
            onClick={onToggleDark}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-800 shadow-sm transition-all duration-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700 sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2"
            aria-pressed={dark}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? (
              <>
                <Sun className="h-4 w-4" strokeWidth={2} aria-hidden />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" strokeWidth={2} aria-hidden />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
          <RoleSwitcher />
        </div>
      </div>
    </header>
  )
}
