import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BASE, profile } from '../data/resume'
import { useCompact, useFinePointer } from '../hooks/useMediaQuery'
import { usePointerRef } from '../hooks/usePointer'
import { webglAvailable } from '../hooks/useWebGL'
import { DownloadIcon } from './Icons'
import { SceneBoundary } from './ErrorBoundary'
import { Magnetic } from './Magnetic'

// Three.js is code-split and only fetched after first paint.
const HeroScene = lazy(() => import('../scene/HeroScene'))

const ease = [0.22, 1, 0.36, 1] as const
const line = {
  hidden: { y: '108%' },
  show: (i: number) => ({ y: 0, transition: { duration: 1.05, ease, delay: 0.05 + i * 0.1 } }),
}
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: d } }),
}

function Portrait({ ready, reduced, fine }: { ready: boolean; reduced: boolean; fine: boolean }) {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const ry = useSpring(useTransform(px, [-1, 1], [-8, 8]), { stiffness: 90, damping: 18 })
  const rx = useSpring(useTransform(py, [-1, 1], [6, -6]), { stiffness: 90, damping: 18 })
  const glowX = useTransform(px, [-1, 1], [-14, 14])
  const glowY = useTransform(py, [-1, 1], [-14, 14])

  useEffect(() => {
    if (!fine || reduced) return
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1)
      py.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [fine, reduced, px, py])

  return (
    <motion.div
      className="relative mx-auto w-[min(70vw,300px)] md:ml-auto md:mr-0 md:w-full md:max-w-[420px]"
      style={{ perspective: 1100 }}
      initial={reduced ? false : { opacity: 0, y: 30, scale: 0.96 }}
      animate={ready || reduced ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 1.2, ease, delay: 0.25 }}
    >
      <motion.div className="relative" style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
        {/* soft light behind the frame */}
        <motion.div
          aria-hidden="true"
          className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(61,120,216,0.45),transparent)] blur-2xl"
          style={{ x: glowX, y: glowY, transform: 'translateZ(-60px)' }}
        />

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/12 bg-panel shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(127,178,255,0.12)]">
          <picture>
            <source
              type="image/webp"
              srcSet={`${BASE}profile-560.webp 560w, ${BASE}profile-1000.webp 1000w`}
              sizes="(min-width: 768px) 420px, 70vw"
            />
            <img
              src={`${BASE}profile-1000.jpg`}
              srcSet={`${BASE}profile-560.jpg 560w, ${BASE}profile-1000.jpg 1000w`}
              sizes="(min-width: 768px) 420px, 70vw"
              alt="Portrait of Debanshu Panda in a dark suit and tie"
              width={1000}
              height={1000}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[50%_18%]"
              style={{ filter: 'saturate(0.92) contrast(1.03)' }}
            />
          </picture>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/0 to-ink/0" />
          <div aria-hidden="true" className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
        </div>

        {/* floating glass caption, lifted off the frame in 3D */}
        <div
          className="glass relative mt-4 rounded-2xl px-4 py-3 md:absolute md:-bottom-5 md:-left-8 md:right-auto md:mt-0 md:min-w-[15rem] md:[transform:translateZ(56px)]"
        >
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="relative mt-[7px] grid h-2 w-2 shrink-0 place-items-center">
              <span className="absolute inset-0 rounded-full bg-spark/50" style={{ animation: 'pulse-ring 2.4s ease-out infinite' }} />
              <span className="h-2 w-2 rounded-full bg-spark" />
            </span>
            <p className="text-sm leading-snug">
              <span className="block font-medium text-mist">B.Tech, Electrical Engineering</span>
              <span className="block text-dim">OUTR, 2023–2027</span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = !!useReducedMotion()
  const compact = useCompact()
  const fine = useFinePointer()
  const pointer = usePointerRef(fine && !reduced)
  const scroll = useRef(0)
  const inView = useInView(ref, { margin: '120px' })
  const [sceneOn, setSceneOn] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scroll.current = v
  })
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60])

  // Mount the WebGL scene after first paint, and only if the device can run it.
  useEffect(() => {
    if (!webglAvailable()) return
    const id = window.setTimeout(() => setSceneOn(true), 300)
    return () => window.clearTimeout(id)
  }, [])

  const state = ready || reduced ? 'show' : 'hidden'
  const initial = reduced ? 'show' : 'hidden'

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* CSS backdrop: always present, so the hero still looks intentional without WebGL */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_60%_at_78%_35%,rgba(61,120,216,0.22),transparent_70%),radial-gradient(40%_40%_at_10%_90%,rgba(127,178,255,0.08),transparent_70%)]"
      />
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={{ opacity: sceneOpacity }}>
        {sceneOn && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene
                count={compact ? 38 : 88}
                compact={compact}
                reduced={reduced}
                active={inView}
                pointer={pointer}
                scroll={scroll}
              />
            </Suspense>
          </SceneBoundary>
        )}
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pb-20 pt-28 md:grid-cols-12 md:gap-8 md:px-10 md:pb-24">
        <motion.div className="order-2 md:order-1 md:col-span-7" style={{ y: copyY }}>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.4rem,12.5vw,4.8rem)] md:text-[clamp(4.2rem,8.6vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-mist"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" custom={0} variants={line} initial={initial} animate={state}>
                {profile.firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" custom={1} variants={line} initial={initial} animate={state}>
                {profile.lastName}
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-xl font-medium leading-snug text-mist md:text-[1.6rem]"
            custom={0.55}
            variants={rise}
            initial={initial}
            animate={state}
          >
            {profile.title}
          </motion.p>
          <motion.p
            className="mt-5 max-w-lg text-base text-dim md:text-lg"
            custom={0.68}
            variants={rise}
            initial={initial}
            animate={state}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            custom={0.82}
            variants={rise}
            initial={initial}
            animate={state}
          >
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex w-full items-center justify-center rounded-full bg-mist px-7 py-3.5 text-[0.95rem] font-semibold text-ink shadow-[0_0_40px_-8px_rgba(127,178,255,0.65)] transition-transform hover:scale-[1.03] sm:w-auto"
              >
                View my work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resumeFile}
                download={profile.resumeName}
                className="glass inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold text-mist transition-colors hover:bg-white/10 sm:w-auto"
              >
                <DownloadIcon />
                Download resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.p
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-faint"
            custom={0.95}
            variants={rise}
            initial={initial}
            animate={state}
          >
            <span>{profile.location}</span>
            <a className="text-dim underline decoration-white/20 underline-offset-4 transition-colors hover:text-mist" href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="text-dim underline decoration-white/20 underline-offset-4 transition-colors hover:text-mist" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="text-dim underline decoration-white/20 underline-offset-4 transition-colors hover:text-mist" href={`mailto:${profile.email}`}>
              Email
            </a>
          </motion.p>
        </motion.div>

        <div className="order-1 md:order-2 md:col-span-5">
          <Portrait ready={ready} reduced={reduced} fine={fine} />
        </div>
      </div>
    </section>
  )
}
