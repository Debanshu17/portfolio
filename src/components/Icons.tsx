import type { IconName } from '../data/resume'

const common = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function Icon({ name }: { name: IconName }) {
  switch (name) {
    case 'code':
      return (<svg {...common}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg>)
    case 'bolt':
      return (<svg {...common}><path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" /></svg>)
    case 'nodes':
      return (<svg {...common}><circle cx="6" cy="6" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="9" cy="18" r="2" /><path d="m7.7 7 8.6.7M7 8l1.6 8M17 10l-6.5 6.5" /></svg>)
    case 'layers':
      return (<svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>)
    case 'arrow':
      return (<svg {...common}><path d="M5 19 19 5M9 5h10v10" /></svg>)
    case 'people':
      return (<svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.6-3 2.7-4.5 5.5-4.5s4.9 1.5 5.5 4.5M16 6.2a3 3 0 0 1 0 5.6M18 14.8c1.6.6 2.6 2 3 4.2" /></svg>)
    case 'lens':
      return (<svg {...common}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v2M20 12h-2M12 20v-2M4 12h2" /></svg>)
  }
}

export function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
    </svg>
  )
}
