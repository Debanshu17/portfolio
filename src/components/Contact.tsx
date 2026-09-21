import { profile } from '../data/resume'
import { ArrowUpRight, DownloadIcon } from './Icons'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'

const rows = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref, external: false },
  { label: 'LinkedIn', value: 'in/debanshu-panda-0b1109413', href: profile.linkedin, external: true },
  { label: 'GitHub', value: `github.com/${profile.githubHandle}`, href: profile.github, external: true },
]

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative pb-16 pt-28 md:pt-40">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(60%_70%_at_50%_0%,rgba(61,120,216,0.16),transparent_70%)]"
      />
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <h2
            id="contact-title"
            className="font-display max-w-4xl text-[clamp(2.8rem,8.5vw,6.75rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-mist"
          >
            Let&rsquo;s build something meaningful.
          </h2>
          <p className="mt-7 max-w-lg text-lg text-dim">
            I&rsquo;m eager to contribute to real-world software projects and grow as a developer. Get in touch, or take a look at my resume.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-mist px-7 py-3.5 text-[0.95rem] font-semibold text-ink shadow-[0_0_40px_-8px_rgba(127,178,255,0.65)] transition-transform hover:scale-[1.03] sm:w-auto"
              >
                Email me
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
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-20 md:mt-28">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.06] sm:grid-cols-2">
            {rows.map((r) => (
              <div key={r.label} className="bg-ink">
                <a
                  href={r.href}
                  {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-white/[0.04] md:px-8 md:py-6"
                >
                  <span className="min-w-0">
                    <dt className="text-sm text-faint">{r.label}</dt>
                    <dd className="mt-0.5 truncate text-[1.05rem] text-mist">
                      {r.value}
                      {r.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </dd>
                  </span>
                  <span className="shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal">
                    <ArrowUpRight size={20} />
                  </span>
                </a>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-faint">Based in {profile.location}.</p>
        </Reveal>

        <footer className="mt-24 flex flex-col justify-between gap-3 border-t border-white/8 pt-8 text-sm text-faint sm:flex-row md:mt-32">
          <p>&copy; {new Date().getFullYear()} {profile.name}</p>
          <p>Built with React, Three.js and Framer Motion.</p>
        </footer>
      </div>
    </section>
  )
}
