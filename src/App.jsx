import { useEffect, useState } from 'react'
import { BottomNav } from './components/layout/BottomNav'
import { Navbar } from './components/layout/Navbar'
import { Sidebar } from './components/layout/Sidebar'
import { Dashboard } from './pages/Dashboard'

const THEME_KEY = 'fintrack-theme'
const DESKTOP_MEDIA_QUERY = '(min-width: 768px)'

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

function readDesktopMatch() {
  if (typeof window === 'undefined') return false
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches
}

export default function App() {
  const [dark, setDark] = useState(() => readStoredTheme() === 'dark')
  const [isDesktop, setIsDesktop] = useState(readDesktopMatch)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
    applyTheme(dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
    const syncViewport = (event) => {
      const matches = 'matches' in event ? event.matches : mediaQuery.matches
      setIsDesktop(matches)
      if (matches) setMobileMenuOpen(false)
    }

    syncViewport(mediaQuery)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncViewport)
      return () => mediaQuery.removeEventListener('change', syncViewport)
    }

    mediaQuery.addListener(syncViewport)
    return () => mediaQuery.removeListener(syncViewport)
  }, [])

  function handleSidebarToggle() {
    if (isDesktop) {
      setSidebarCollapsed((collapsed) => !collapsed)
      return
    }

    setMobileMenuOpen((open) => !open)
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-300 md:flex-row dark:bg-slate-950 dark:text-slate-100">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        collapsed={isDesktop && sidebarCollapsed}
        onNavigate={closeMobileMenu}
      />

      <div
        className="flex min-h-screen w-full min-w-0 flex-1 flex-col overflow-x-hidden pb-20 transition-[padding-left] duration-300 md:pb-0"
        style={isDesktop ? { paddingLeft: sidebarCollapsed ? '80px' : '240px' } : undefined}
      >
        <Navbar
          isDesktop={isDesktop}
          mobileMenuOpen={mobileMenuOpen}
          sidebarCollapsed={sidebarCollapsed}
          onMenuToggle={handleSidebarToggle}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
        />

        <Dashboard />
        <BottomNav onNavigate={closeMobileMenu} />
      </div>
    </div>
  )
}
