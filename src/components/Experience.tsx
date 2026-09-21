import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { experience } from '../data/resume'
import { Chip } from './Chip'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { TiltCard } from './TiltCard'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          id="experience-title"
          title="Experience"
          lead="Two internships: SAP ABAP Cloud development, and power systems at HAL."
        />

        <div ref={ref} className="relative">
          {/* the rail fills as you scroll */}
          <div aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10 md:left-[28%]">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-signal to-spark shadow-[0_0_10px_rgba(127,178,255,0.6)]"
              style={{ scaleY: fill }}
            />
          </div>
          <ol className="space-y-10 md:space-y-14">

          {experience.map((job) => (
            <li key={job.id} className="relative grid gap-3 pl-10 md:grid-cols-[28%_1fr] md:gap-0 md:pl-0">
              <p className="text-sm text-dim tabular-nums md:pr-12 md:pt-7 md:text-right">{job.dates}</p>
              <span
                aria-hidden="true"
                className="absolute left-0 top-[5px] h-[11px] w-[11px] rounded-full border border-signal bg-ink shadow-[0_0_14px_rgba(127,178,255,0.75)] md:left-[28%] md:top-[34px] md:-translate-x-1/2"
              />
              <Reveal className="md:pl-12">
                <TiltCard className="p-6 md:p-8" tilt={3}>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.015em] text-mist md:text-[1.7rem]">{job.role}</h3>
                  <p className="mt-1 text-signal">{job.org}</p>
                  <ul className="mt-5 space-y-3">
                    {job.points.map((p) => (
                      <li key={p} className="max-w-2xl text-[0.98rem] leading-relaxed text-dim">
                        {p}
                      </li>
                    ))}
                  </ul>
                  {job.tools.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools and topics">
                      {job.tools.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </ul>
                  )}
                </TiltCard>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
