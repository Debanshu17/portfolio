import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'
import { useFinePointer } from '../hooks/useMediaQuery'

/** Nudges its child toward the cursor. Off for touch devices and reduced motion. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  if (reduced || !fine) return <span className="inline-flex">{children}</span>

  return (
    <motion.span
      className="inline-flex"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
