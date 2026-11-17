import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { navItems, profile } from '../data/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll'
import { cn } from '../utils/cn'

const SECTION_IDS = navItems.map((item) => item.id)
const DESKTOP_NAV = ['about', 'work', 'credentials', 'route', 'arcade']

function NavLink({ item, active, onNavigate, dark = false }) {
  return (
    <Link
      to={`/#${item.id}`}
      onClick={onNavigate}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'group relative inline-flex items-baseline gap-1.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300',
        active ? 'text-ink' : dark ? 'text-paper/60 hover:text-paper' : 'text-ink/65 hover:text-ink',
      )}
    >
      <span className="text-[8px] text-red-text">{item.number}</span>
      <span className="relative">
        {item.label}
        <span
          className={cn(
            'absolute -bottom-1 left-0 h-px bg-red transition-all duration-300',
            active ? 'w-full' : 'w-0 group-hover:w-full',
          )}
        />
      </span>
    </Link>
  )
}

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const active = useScrollSpy(SECTION_IDS)
  const activeSection = isHome
    ? active
    : location.pathname.startsWith('/work')
      ? 'work'
      : null
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)

  useLockBodyScroll(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const timer = window.setTimeout(() => closeRef.current?.focus(), 120)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
    }
  }, [open])

  const desktopItems = navItems.filter((item) => DESKTOP_NAV.includes(item.id))

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-colors duration-500',
          scrolled
            ? 'border-b border-ink/15 bg-paper/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[76px]">
          <Link
            to="/"
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex h-7 w-7 items-center justify-center bg-ink text-paper">
              <span className="font-mono text-[9px] font-medium tracking-[-0.02em]">
                {profile.initials}
              </span>
              <span className="absolute -right-[3px] -top-[3px] h-[6px] w-[6px] bg-red" />
            </span>
            <span className="flex flex-col font-mono text-[9px] uppercase leading-[1.35] tracking-[0.16em]">
              <span>Mominur</span>
              <span className="text-ink/62">Rahman</span>
            </span>
            <span className="sr-only">— home</span>
          </Link>

          <div className="hidden items-center gap-2.5 lg:flex xl:absolute xl:left-1/2 xl:-translate-x-1/2">
            <span className="h-[6px] w-[6px] animate-blink rounded-full bg-red" aria-hidden="true" />
            <span className="label-tight text-ink/65">{profile.status}</span>
          </div>

          <div className="flex items-center gap-4">
            <nav aria-label="Primary" className="hidden items-center gap-4 xl:flex">
              {desktopItems.map((item) => (
                <NavLink key={item.id} item={item} active={activeSection === item.id} />
              ))}
            </nav>

            <Link
              to="/#contact"
              className="btn-editorial group hidden !px-3.5 !py-2.5 lg:inline-flex"
              data-cursor="say hi"
            >
              Let&apos;s talk
              <ArrowUpRight
                size={12}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex items-center gap-2 border border-ink/30 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-ink hover:bg-ink hover:text-paper xl:hidden"
            >
              Menu
              <span className="flex w-3.5 flex-col gap-[3px]" aria-hidden="true">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[85] flex flex-col overflow-y-auto bg-paper"
          >
            <div className="shell flex h-16 shrink-0 items-center justify-between border-b border-ink/15 lg:h-[76px]">
              <span className="font-mono text-[9px] uppercase leading-[1.35] tracking-[0.16em]">
                Index
                <br />
                <span className="text-ink/62">{profile.issue}</span>
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border border-ink px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:bg-ink hover:text-paper"
              >
                Close <X size={12} strokeWidth={2} />
              </button>
            </div>

            <nav aria-label="Menu" className="shell flex flex-1 flex-col justify-center py-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.045, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={`/#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between gap-6 border-b border-ink/15 py-2.5 sm:py-3"
                  >
                    <span className="display text-[clamp(2.1rem,8.4vw,4.6rem)] transition-colors group-hover:text-red">
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-ink/62">
                      {item.number}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="shell flex shrink-0 flex-col gap-4 border-t border-ink/15 py-5 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${profile.email}`}
                className="link-line font-mono text-[11px] uppercase tracking-[0.12em]"
              >
                {profile.email}
              </a>
              <span className="label-tight text-ink/62">
                {profile.location} · {profile.issue}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
