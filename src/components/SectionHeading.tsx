import { Reveal } from './Reveal'

export function SectionHeading({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <Reveal className="mb-14 max-w-2xl md:mb-20">
      <h2 id={id} className="font-display text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-mist">
        {title}
      </h2>
      {lead && <p className="mt-5 max-w-xl text-lg text-dim">{lead}</p>}
    </Reveal>
  )
}
