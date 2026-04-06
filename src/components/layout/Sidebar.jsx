import BrandLogo from '../ui/BrandLogo'
import { ReadOnlyBadge } from '../ui/ReadOnlyBadge'
import { navigationItems } from './navigationItems'

export function Sidebar({ mobileOpen, collapsed, onNavigate }) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 transform flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur-md transition-[width,transform] duration-300 ease-out dark:border-slate-800/80 dark:bg-slate-900/95 md:w-[var(--sidebar-width)] md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ '--sidebar-width': collapsed ? '80px' : '240px' }}
        aria-label="Sidebar"
      >
        <div className={`flex h-full flex-col py-5 ${collapsed ? 'px-2 md:px-2' : 'px-3 md:px-4'}`}>
          <div className={`mb-6 ${collapsed ? 'flex justify-center' : ''}`}>
            <BrandLogo compact={collapsed} />
          </div>

          {!collapsed ? (
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Navigate
              </p>
              <div className="mt-4">
                <ReadOnlyBadge />
              </div>
            </div>
          ) : null}

          <nav className="flex flex-col gap-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`group flex items-center rounded-xl py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-indigo-400 ${
                    collapsed ? 'justify-center px-2' : 'gap-3 px-3'
                  }`}
                  aria-label={item.label}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" strokeWidth={1.9} aria-hidden />
                  <span className={collapsed ? 'sr-only' : 'truncate'}>
                    {item.label}
                  </span>
                </a>
              )
            })}
          </nav>
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity md:hidden"
          aria-label="Close menu"
          onClick={onNavigate}
        />
      ) : null}
    </>
  )
}
