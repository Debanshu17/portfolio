import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { navItems } from './data/resume'
import { useActiveSection } from './hooks/useActiveSection'

const sectionIds = navItems.map((n) => n.id)

export default function App() {
  const reduced = !!useReducedMotion()
  const [loaded, setLoaded] = useState(false)
  const active = useActiveSection(sectionIds)
  const ready = reduced || loaded

  // Safety net: never leave the loader up if the animation callback is missed.
  useEffect(() => {
    const id = window.setTimeout(() => setLoaded(true), 2500)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <AnimatePresence>{!ready && <Loader key="loader" onDone={() => setLoaded(true)} />}</AnimatePresence>
      <Nav active={active} />
      <main>
        <Hero ready={ready} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  )
}
