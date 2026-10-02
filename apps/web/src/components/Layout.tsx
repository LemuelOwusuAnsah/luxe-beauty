import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { site } from '../data/site'
import { useTheme } from '../lib/theme'
import { useCart } from '../lib/cart'
import { useAuth } from '../lib/auth'
import FooterGradient from './FooterGradient'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const socials = [
  { label: 'Facebook', href: site.social.facebook },
  { label: 'Instagram', href: site.social.instagram },
  { label: 'Twitter', href: site.social.twitter },
  { label: 'Pinterest', href: site.social.pinterest },
]

function IconCart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export default function Layout() {
  const { theme, toggle } = useTheme()
  const cartCount = useCart((s) => s.count())
  const { current, signout } = useAuth()
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])


  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white/95 dark:bg-[#0f1115]/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="" className="w-8 h-8" />
            <span className="font-semibold text-lg">{site.name}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive: a }) =>
                  `text-sm font-medium transition ${
                    a
                      ? 'text-[var(--color-primary)]'
                      : 'text-neutral-800 dark:text-neutral-200 hover:text-[var(--color-primary)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme" data-hide-mobile="1"
              className="hidden lg:flex w-9 h-9 items-center justify-center text-neutral-800 dark:text-neutral-200 hover:text-[var(--color-primary)] transition"
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex w-9 h-9 items-center justify-center text-neutral-800 dark:text-neutral-200 hover:text-[var(--color-primary)] transition"
            >
              <IconCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/book"
              aria-label="Book"
              className="hidden lg:flex w-9 h-9 items-center justify-center text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition"
            >
              <IconPhone />
            </Link>

            {current ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Account"
                  className="w-9 h-9 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 flex items-center justify-center bg-white"
                >
                  <img src="/favicon.svg" alt="" className="w-6 h-6" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#16181d] shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                      <div className="text-sm font-medium truncate">{current.name}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                        {current.email}
                      </div>
                    </div>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                      Admin
                    </Link>
                    <button
                      onClick={() => {
                        signout()
                        setMenuOpen(false)
                        navigate('/')
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                aria-label="Sign in"
                className="hidden lg:flex w-9 h-9 items-center justify-center text-neutral-800 dark:text-neutral-200 hover:text-[var(--color-primary)] transition"
              >
                <IconUser />
              </Link>
            )}

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden w-9 h-9 flex items-center justify-center text-neutral-800 dark:text-neutral-200 hover:text-[var(--color-primary)] transition"
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0f1115] animate-[fadeIn_150ms_ease-out]">
            <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} onClick={close} className="px-3 py-3 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                  {item.label}
                </Link>
              ))}

              <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />

              <Link to="/cart" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <IconCart />
                <span>Cart{cartCount > 0 ? ` (${cartCount})` : ""}</span>
              </Link>

              <Link to="/book" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <IconPhone />
                <span>Book</span>
              </Link>

              <Link to="/checkout" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <IconCart />
                <span>Checkout</span>
              </Link>

              <button onClick={toggle} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-left">
                {theme === "dark" ? <IconSun /> : <IconMoon />}
                <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
              </button>

              <Link to="/contact" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <IconMail />
                <span>Contact</span>
              </Link>

              <Link to="/colophon" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <IconMail />
                <span>Colophon</span>
              </Link>

              <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />

              {current ? (
                <>
                  <Link to="/admin" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                    <IconUser />
                    <span>Admin</span>
                  </Link>
                  <button onClick={() => { signout(); close(); navigate("/") }} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-left">
                    <IconLogout />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium bg-[var(--color-primary)] text-white">
                  <IconUser />
                  <span>Sign in / Sign up</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="relative overflow-hidden border-t border-neutral-200 dark:border-neutral-800 mt-16">
        <FooterGradient />
        <div className="max-w-6xl mx-auto px-5 py-10 grid gap-8 md:grid-cols-4 text-sm">
          <div>
            <div className="font-semibold mb-2">{site.name}</div>
            <p className="text-neutral-700 dark:text-neutral-300">
              {site.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="text-xs px-2 py-1 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-[var(--color-primary)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Explore</div>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/book">Book</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Company</div>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/colophon">Colophon</Link></li>
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to="/auth">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Contact</div>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>
                <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </li>
              <li>{site.contact.address}</li>
              <li>{site.contact.hours}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800">
          <div className="max-w-6xl mx-auto px-5 py-5 text-xs text-neutral-600 dark:text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} {site.name}</span>
            <span>
              Built by{' '}
              <a
                href={site.author.url}
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[var(--color-primary)]"
              >
                {site.author.handle}
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
