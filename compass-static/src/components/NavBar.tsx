import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'

export default function NavBar() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Features', to: '/#features' },
    { name: 'Assess a Program', to: '/assess' },
    { name: 'Reports', to: '/reports' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-foreground hover:text-primary transition-colors"
        >
          <CompassSVG size={32} />
          <span className="text-sm font-semibold leading-6">COMPASS</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-6 pb-4 lg:hidden">
          <ul className="mt-3 space-y-2">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

function CompassSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Outer ring */}
      <circle cx="16" cy="16" r="13.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* N tick — orange */}
      <line x1="16" y1="3.5" x2="16" y2="8" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      {/* E/S/W ticks */}
      <line x1="28.5" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.45" />
      <line x1="16" y1="28.5" x2="16" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.45" />
      <line x1="3.5" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.45" />
      {/* Intercardinal ticks */}
      <line x1="25.55" y1="6.45" x2="24.49" y2="7.51" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.25" />
      <line x1="25.55" y1="25.55" x2="24.49" y2="24.49" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.25" />
      <line x1="6.45" y1="25.55" x2="7.51" y2="24.49" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.25" />
      <line x1="6.45" y1="6.45" x2="7.51" y2="7.51" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.25" />
      {/* Needle rotated 20° */}
      <g transform="rotate(20 16 16)">
        <polygon points="16,5.5 13.5,16 18.5,16" fill="#f97316" />
        <polygon points="16,26.5 13.5,16 18.5,16" fill="currentColor" fillOpacity="0.2" />
      </g>
      {/* Center bearing */}
      <circle cx="16" cy="16" r="2.5" fill="#f97316" />
      <circle cx="16" cy="16" r="1" fill="white" />
    </svg>
  )
}
