import { motion } from 'framer-motion'

/** Brief page-load moment. Hands over to the hero entrance via onDone. */
export function Loader({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-7">
        <motion.span
          className="font-display text-6xl font-semibold tracking-[-0.05em] text-mist"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          DP
        </motion.span>
        <span className="relative block h-px w-44 overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-0 origin-left bg-gradient-to-r from-signal to-spark"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={onDone}
          />
        </span>
      </div>
    </motion.div>
  )
}
