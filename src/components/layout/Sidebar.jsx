import BrandLogo from '../ui/BrandLogo'

const LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#charts', label: 'Charts' },
  { href: '#insights', label: 'Insights' },
  { href: '#transactions', label: 'Transactions' },
]

export function Sidebar({ open, onNavigate }) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex min-h-screen w-64 transform flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur-md transition-transform duration-300 ease-out dark:border-slate-800/80 dark:bg-slate-900/90 lg:static lg:z-0 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col px-4 py-6 lg:px-5">
          <div className="mb-6">
            <BrandLogo />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Navigate
          </p>
          <nav className="mt-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onNavigate}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm transition-opacity lg:hidden"
          aria-label="Close menu"
          onClick={onNavigate}
        />
      ) : null}
    </>
  )
}
