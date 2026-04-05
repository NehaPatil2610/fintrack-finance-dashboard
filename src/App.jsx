import { useEffect, useState } from 'react'
import { BottomNav } from './components/layout/BottomNav'
import { Navbar } from './components/layout/Navbar'
import { Sidebar } from './components/layout/Sidebar'
import { Dashboard } from './pages/Dashboard'

const THEME_KEY = 'fintrack-theme'

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY)
  } catch {
    return null
  }
}

function applyTheme(mode) {
  const root = document.documentElement
  if (mode === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export default function App() {
  const [dark, setDark] = useState(() => readStoredTheme() === 'dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
    applyTheme(dark ? 'dark' : 'light')
  }, [dark])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar open={menuOpen} onNavigate={closeMenu} />

      <div className="flex min-w-0 flex-1 flex-col pb-20 lg:pb-0">
        <Navbar
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((o) => !o)}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
        />

        <Dashboard />
        <BottomNav onNavigate={closeMenu} />
      </div>
    </div>
  )
}
