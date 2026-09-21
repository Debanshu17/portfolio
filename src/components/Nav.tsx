import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { navItems, profile } from '../data/resume'

export function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-signal shadow-[0_0_12px_rgba(127,178,255,0.8)]"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          aria-label="Primary"
          className="glass flex w-full max-w-md items-center justify-between rounded-full py-2 pl-2 pr-2 md:w-auto md:max-w-none md:gap-1"
        >
          <a
            href="#home"
            aria-label={`${profile.name}, back to top`}
            className="font-display grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-[0.95rem] font-semibold tracking-tight text-mist transition-colors hover:bg-white/[0.12]"
          >
            DP
          </a>

          <ul className="hidden items-center gap-0.5 md:flex md:pl-2">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors ${
                      isActive ? 'text-mist' : 'text-dim hover:text-mist'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.09] ring-1 ring-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-mist md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/92 px-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`font-display block py-2 text-[2.6rem] font-semibold tracking-[-0.03em] ${
                      active === item.id ? 'text-mist' : 'text-faint'
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
