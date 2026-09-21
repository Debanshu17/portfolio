import { skillGroups } from '../data/resume'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { TiltCard } from './TiltCard'

export function Skills() {
  let n = 0
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          id="skills-title"
          title="Skills"
          lead="The technical skills listed on my resume, grouped by area."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.id} delay={(gi % 3) * 0.07} className="h-full">
              <TiltCard className="h-full p-6 md:p-7" tilt={5}>
                <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-dim">{g.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {g.items.map((item) => {
                    const delay = (n++ % 6) * -0.9
                    return (
                      <li
                        key={item}
                        className="floaty group flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[0.95rem] font-medium text-mist transition-[border-color,box-shadow] duration-300 hover:border-signal/60 hover:shadow-[0_0_24px_-4px_rgba(127,178,255,0.55)]"
                        style={{ animationDelay: `${delay}s` }}
                      >
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
                        {item}
                      </li>
                    )
                  })}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
