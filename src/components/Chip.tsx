export function Chip({ children }: { children: string }) {
  return (
    <li className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.8rem] leading-6 text-dim">
      {children}
    </li>
  )
}
