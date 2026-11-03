import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  tone?: 'default' | 'light'
}

export function Logo({ className, tone = 'default' }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Blaugrana Store, ir al inicio"
      className={cn('group flex items-center gap-3 rounded-lg', className)}
    >
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary shadow-[0_8px_20px_-10px_rgb(0_77_152/0.8)] transition-transform duration-300 group-hover:-rotate-3">
        <span className="brand-stripes absolute inset-0" aria-hidden="true" />
        <span
          className="absolute inset-0 bg-gradient-to-br from-white/15 to-ink/30"
          aria-hidden="true"
        />
        <span className="relative font-display text-lg font-extrabold text-white">B</span>
      </span>
      <span className="flex flex-col gap-0.5 leading-none">
        <span
          className={cn(
            'font-display text-[1.05rem] font-extrabold tracking-tight',
            tone === 'light' && 'text-white',
          )}
        >
          Blaugrana<span className="text-brand-red">.</span>
        </span>
        <span
          className={cn(
            'text-[0.6rem] font-medium tracking-[0.24em] uppercase',
            tone === 'light' ? 'text-white/50' : 'text-muted-foreground',
          )}
        >
          Store · Barcelona
        </span>
      </span>
    </Link>
  )
}
