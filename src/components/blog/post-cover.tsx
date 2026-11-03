import { BookOpen, Droplets, Package, Ruler, Shirt, Sparkles, Trophy } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Post, PostTag } from '@/types'

const tagIcons: Record<PostTag, typeof Shirt> = {
  Tallas: Ruler,
  Cuidados: Droplets,
  Guías: BookOpen,
  Estilo: Sparkles,
  Compras: Package,
  Historia: Trophy,
}

interface PostCoverProps {
  post: Post
  index?: number
  className?: string
}

export function PostCover({ post, index = 0, className }: PostCoverProps) {
  const Icon = tagIcons[post.tag]
  const number = String(index + 1).padStart(2, '0')

  return (
    <div
      className={cn('relative isolate aspect-[16/9] overflow-hidden rounded-xl', className)}
      style={{
        backgroundImage: `linear-gradient(135deg, ${post.cover.from} 0%, ${post.cover.to} 100%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(115deg, transparent 0 26px, ${post.cover.accent} 26px 30px)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-10 -bottom-16 size-56 rounded-full border-[18px] opacity-25"
        style={{ borderColor: post.cover.accent }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-12 -left-8 size-40 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: post.cover.accent }}
      />

      <Shirt
        aria-hidden="true"
        className="absolute -right-5 bottom-2 size-32 -rotate-12 text-white/15 sm:size-40"
        strokeWidth={1}
      />

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
            <Icon className="size-3.5" aria-hidden="true" />
            {post.tag}
          </span>
          <span className="font-display text-3xl font-bold text-white/30 tabular-nums">
            {number}
          </span>
        </div>
        <p className="font-display text-sm font-semibold tracking-[0.18em] text-white/85 uppercase">
          Blaugrana Journal
        </p>
      </div>
    </div>
  )
}
