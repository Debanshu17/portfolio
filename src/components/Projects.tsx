import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import type { ComponentType } from 'react'
import { projects } from '../data/resume'
import type { ProjectVisual } from '../data/resume'
import { Chip } from './Chip'
import { ArrowUpRight } from './Icons'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { TiltCard } from './TiltCard'

/*
 * The resume has no screenshots, so each project gets a small abstract motif that
 * says what it does — layered documents, a device topology, a conversation.
 * They are purely illustrative: no numbers, scores or results are drawn.
 */

const layer = (z: number) => ({ transform: `translateZ(${z}px)` })

function AnalyzerVisual() {
  return (
    <div className="absolute inset-0 [transform-style:preserve-3d]">
      <div className="absolute left-[9%] top-[14%] h-[68%] w-[40%] rounded-xl border border-white/12 bg-white/[0.05] p-4" style={layer(18)}>
        {[82, 58, 90, 46, 72, 38].map((w, i) => (
          <span key={i} className="mb-2.5 block h-1.5 rounded-full bg-white/15" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div
        className="absolute left-[38%] top-[26%] h-[62%] w-[44%] rounded-xl border border-signal/30 bg-signal/[0.07] p-4 shadow-[0_20px_50px_-20px_rgba(61,120,216,0.6)]"
        style={layer(54)}
      >
        {[70, 88, 52, 76, 44].map((w, i) => (
          <span key={i} className="mb-2.5 block h-1.5 rounded-full bg-signal/35" style={{ width: `${w}%` }} />
        ))}
        <span
          aria-hidden="true"
          className="absolute inset-x-3 top-3 h-px bg-spark shadow-[0_0_12px_var(--color-spark)]"
          style={{ animation: 'scan 4.5s ease-in-out infinite' }}
        />
      </div>
    </div>
  )
}

function NetworkVisual() {
  const nodes = [
    { x: 50, y: 20 },
    { x: 18, y: 52 },
    { x: 82, y: 50 },
    { x: 34, y: 82 },
    { x: 68, y: 80 },
  ]
  const links = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 2]]
  return (
    <div className="absolute inset-0 [transform-style:preserve-3d]" style={layer(24)}>
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {links.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgba(127,178,255,0.35)" strokeWidth="0.5" />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            {i === 2 && <circle cx={n.x} cy={n.y} r="6" fill="none" stroke="#ffbf66" strokeWidth="0.4" style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: 'pulse-ring 2.6s ease-out infinite' }} />}
            <rect x={n.x - 5} y={n.y - 3.5} width="10" height="7" rx="1.5" fill="#0c0f15" stroke={i === 2 ? '#ffbf66' : 'rgba(127,178,255,0.7)'} strokeWidth="0.6" />
            <circle cx={n.x - 2.4} cy={n.y} r="0.8" fill={i === 2 ? '#ffbf66' : '#7fb2ff'} />
            <circle cx={n.x + 0.2} cy={n.y} r="0.8" fill="rgba(255,255,255,0.3)" />
            <circle cx={n.x + 2.6} cy={n.y} r="0.8" fill="rgba(255,255,255,0.3)" />
          </g>
        ))}
      </svg>
    </div>
  )
}

function ChatVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 px-[9%] [transform-style:preserve-3d]">
      <div className="max-w-[62%] rounded-2xl rounded-bl-md border border-white/12 bg-white/[0.06] px-4 py-3" style={layer(20)}>
        <span className="mb-2 block h-1.5 w-24 rounded-full bg-white/20" />
        <span className="block h-1.5 w-16 rounded-full bg-white/15" />
      </div>
      <div className="ml-auto max-w-[66%] rounded-2xl rounded-br-md border border-signal/30 bg-signal/[0.12] px-4 py-3" style={layer(46)}>
        <span className="mb-2 block h-1.5 w-28 rounded-full bg-signal/45" />
        <span className="mb-2 block h-1.5 w-20 rounded-full bg-signal/35" />
        <span className="block h-1.5 w-12 rounded-full bg-signal/30" />
      </div>
      <div className="flex w-16 items-center justify-center gap-1.5 rounded-2xl rounded-bl-md border border-white/12 bg-white/[0.06] px-4 py-3.5" style={layer(30)} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="floaty h-1.5 w-1.5 rounded-full bg-spark" style={{ animationDelay: `${i * 0.25}s`, animationDuration: '1.4s' }} />
        ))}
      </div>
    </div>
  )
}

const visuals: Record<ProjectVisual, ComponentType> = {
  analyzer: AnalyzerVisual,
  network: NetworkVisual,
  chat: ChatVisual,
}

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const Visual = visuals[p.visual]
  const detailsId = `${p.id}-details`

  return (
    <Reveal>
      <TiltCard className="overflow-visible p-3 md:p-4" tilt={2.5}>
        <article aria-labelledby={`${p.id}-title`} className="grid gap-6 [transform-style:preserve-3d] md:grid-cols-[1.05fr_1fr] md:gap-10">
          <div className="relative min-h-[240px] rounded-[1rem] border border-white/8 bg-[radial-gradient(80%_80%_at_30%_20%,rgba(61,120,216,0.2),transparent_70%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] [transform-style:preserve-3d] md:min-h-[340px]">
            <Visual />
          </div>

          <div className="flex flex-col p-3 md:p-5 md:pl-0">
            <h3 id={`${p.id}-title`} className="font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-mist md:text-[2rem]">
              {p.name}
            </h3>
            <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-dim">{p.summary}</p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {p.tech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-auto md:pt-8">
              {p.demo && (
                <Magnetic strength={0.2}>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-mist px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                  >
                    Live demo
                    <ArrowUpRight />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Magnetic>
              )}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={detailsId}
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-mist transition-colors hover:bg-white/[0.06]"
              >
                {open ? 'Hide details' : 'What I built'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={detailsId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ul className="mt-6 space-y-3 border-t border-white/8 pt-6">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[0.95rem] leading-relaxed text-dim">
                        <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-signal" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  )
}

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          id="projects-title"
          title="Projects"
          lead="Two AI applications built on Google Gemini, and a Python tool that automates Cisco device monitoring."
        />
        <div className="space-y-6 md:space-y-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
