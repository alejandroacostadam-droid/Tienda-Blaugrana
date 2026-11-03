import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'

import { PostCover } from '@/components/blog/post-cover'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
  index?: number
  featured?: boolean
}

export function PostCard({ post, index = 0, featured = false }: PostCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        preload="intent"
        className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <PostCover
          post={post}
          index={index}
          className={featured ? 'aspect-[16/9] lg:aspect-[16/8]' : undefined}
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {post.readingMinutes} min de lectura
          </span>
        </div>

        <h3
          className={
            featured
              ? 'mt-2 font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl'
              : 'mt-2 font-display text-lg leading-snug font-semibold tracking-tight'
          }
        >
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            preload="intent"
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          preload="intent"
          className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-brand-red"
        >
          Leer artículo
          <ArrowRight
            className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}
