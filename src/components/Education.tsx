import { certifications, education } from '../data/resume'
import { ArrowUpRight } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { TiltCard } from './TiltCard'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          id="education-title"
          title="Education"
          lead="Electrical Engineering at OUTR, and certifications in SAP, networking, Python, cloud and AI."
        />

        <div className="grid gap-4 md:grid-cols-6">
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.07} className={`h-full ${e.featured ? 'md:col-span-6' : 'md:col-span-3'}`}>
              <TiltCard className={`h-full ${e.featured ? 'p-7 md:p-10' : 'p-6 md:p-8'}`} tilt={3}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <p className="text-sm text-signal tabular-nums">{e.years}</p>
                  <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 text-sm text-dim tabular-nums">{e.score}</p>
                </div>
                <h3
                  className={`font-display mt-4 font-semibold tracking-[-0.02em] text-mist ${
                    e.featured ? 'text-3xl md:text-[2.5rem] md:leading-tight' : 'text-xl md:text-2xl'
                  }`}
                >
                  {e.degree}
                </h3>
                <p className={`mt-2 text-dim ${e.featured ? 'text-lg' : ''}`}>{e.school}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <Reveal className="mb-10 max-w-xl">
            <h3 id="certifications-title" className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-tight tracking-[-0.025em] text-mist">
              Certifications
            </h3>
            <p className="mt-3 text-dim">Each item links to the certificate.</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2" aria-labelledby="certifications-title" role="group">
            {certifications.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 0.07} className="h-full">
                <TiltCard className="h-full p-6 md:p-7" tilt={3}>
                  <h4 className="font-display text-lg font-semibold tracking-[-0.01em] text-mist">{c.group}</h4>
                  <ul className="mt-4 divide-y divide-white/[0.07]">
                    {c.items.map((it) => (
                      <li key={it.label}>
                        <a
                          href={it.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 py-3 text-[0.97rem] text-dim transition-colors hover:text-mist"
                        >
                          <span>
                            {it.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </span>
                          <span className="shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal">
                            <ArrowUpRight />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
