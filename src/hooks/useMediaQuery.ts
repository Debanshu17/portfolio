import { useEffect, useState } from 'react'

/** Subscribes to a CSS media query. Returns `initial` during SSR / first paint. */
export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? initial : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** Small screens and touch devices get a lighter 3D scene and no pointer effects. */
export const useCompact = () => useMediaQuery('(max-width: 767px), (pointer: coarse)')

/** True only when a real hover-capable pointer is present. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
