import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { useFinePointer } from '../hooks/useMediaQuery'

type Props = {
  children: ReactNode
  className?: string
  /** Maximum tilt in degrees. */
  tilt?: number
}

/** Perspective tilt plus a cursor-following highlight. Static on touch / reduced motion. */
export function TiltCard({ children, className = '', tilt = 6 }: Props) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), { stiffness: 200, damping: 20 })

  if (reduced || !fine) return <div className={`card ${className}`}>{children}</div>

  return (
    <motion.div
      className={`card spot ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        px.set(x)
        py.set(y)
        e.currentTarget.style.setProperty('--mx', `${x * 100}%`)
        e.currentTarget.style.setProperty('--my', `${y * 100}%`)
      }}
      onPointerLeave={() => {
        px.set(0.5)
        py.set(0.5)
      }}
    >
      {children}
    </motion.div>
  )
}
