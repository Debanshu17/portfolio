import { highlights } from '../data/resume'
import { Icon } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { TiltCard } from './TiltCard'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          id="about-title"
          title="About"
          lead="An Electrical Engineering undergraduate and aspiring software developer, building full-stack and AI-powered applications."
        />
        <div className="grid gap-4 md:grid-cols-6">
          {highlights.map((h, i) => (
            <Reveal key={h.id} delay={(i % 3) * 0.06} className={`${h.span} h-full`}>
              <TiltCard className="h-full p-6 md:p-8" tilt={4}>
                <div className="mb-6 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-signal">
                  <Icon name={h.icon} />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-mist">{h.title}</h3>
                <p className="mt-2 max-w-md text-[0.98rem] leading-relaxed text-dim">{h.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
