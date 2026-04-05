import { Menu, Moon, Sun } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import { NavbarSearch } from './NavbarSearch'
import { ReadOnlyBadge } from '../ui/ReadOnlyBadge'
import { RoleSwitcher } from '../ui/RoleSwitcher'

export function Navbar({ menuOpen, onMenuToggle, dark, onToggleDark }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex shrink-0 rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            onClick={onMenuToggle}
          >
            <Menu className="h-6 w-6" strokeWidth={2} aria-hidden />
          </button>
          <BrandLogo />
          <ReadOnlyBadge />
        </div>

        <div className="relative hidden min-w-0 max-w-md flex-1 md:flex">
          <NavbarSearch id="global-search-desktop" variant="desktop" />
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <RoleSwitcher />
          <button
            type="button"
            onClick={onToggleDark}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition-all duration-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700"
            aria-pressed={dark}
          >
            {dark ? (
              <>
                <Sun className="h-4 w-4" strokeWidth={2} aria-hidden />
                Light
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" strokeWidth={2} aria-hidden />
                Dark
              </>
            )}
          </button>
        </div>
      </div>

      <div className="md:hidden px-4 pb-4 pt-1">
        <NavbarSearch id="global-search-mobile" variant="mobile" />
      </div>
    </header>
  )
}
