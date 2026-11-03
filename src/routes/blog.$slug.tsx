import { createFileRoute, Link, notFound, type LinkProps } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, CalendarDays, Clock, PenLine } from 'lucide-react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { PostCard } from '@/components/blog/post-card'
import { PostCover } from '@/components/blog/post-cover'
import { Breadcrumbs } from '@/components/common/breadcrumbs'
import { PageMeta } from '@/components/common/page-meta'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)

    if (!post) {
      throw notFound()
    }

    return post
  },
  component: PostPage,
})

const markdownComponents: Components = {
  a({ href, children }) {
    if (href?.startsWith('/')) {
      return <Link to={href as LinkProps['to']}>{children}</Link>
    }

    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  },
}

function PostPage() {
  const post = Route.useLoaderData()
  const relatedPosts = getRelatedPosts(post)
  const initials = post.author
    .replace('Equipo ', '')
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')

  return (
    <>
      <PageMeta title={`${post.title} — Blaugrana Store`} description={post.excerpt} />

      <article>
        <header className="relative overflow-hidden border-b border-border/60">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_85%_0%,#fbeaf2_0%,transparent_65%)]"
          />
          <div className="shell py-10 lg:py-14">
            <Breadcrumbs
              items={[
                { label: 'Inicio', to: '/' },
                { label: 'Blog', to: '/blog' },
                { label: post.title },
              ]}
            />

            <div className="mx-auto mt-8 max-w-3xl">
              <Link to="/blog" search={{ tag: post.tag }} className="inline-block">
                <Badge variant="brand">{post.tag}</Badge>
              </Link>
              <h1 className="mt-4 text-3xl leading-[1.04] font-extrabold sm:text-5xl lg:text-[3.4rem]">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-full bg-primary text-[0.6rem] font-bold text-white">
                    {initials}
                  </span>
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {post.readingMinutes} min de lectura
                </span>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-5xl">
              <PostCover post={post} className="aspect-[16/8] rounded-2xl sm:aspect-[16/7]" />
            </div>
          </div>
        </header>

        <div className="shell grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16 lg:py-16">
          <div className="mx-auto w-full max-w-3xl">
            <div className="blog-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {post.content}
              </ReactMarkdown>
            </div>

            <Separator className="my-10" />

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                  {initials}
                </span>
                <div>
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="text-xs text-muted-foreground">
                    Escribimos sobre camisetas, cuidados y cultura culer.
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-fit">
                <Link to="/blog">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Volver al blog
                </Link>
              </Button>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <p className="eyebrow">Sigue leyendo</p>
              <ul className="mt-4 space-y-4">
                {relatedPosts.map((related) => (
                  <li key={related.slug}>
                    <Link to="/blog/$slug" params={{ slug: related.slug }} className="group block">
                      <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-brand-red uppercase">
                        {related.tag}
                      </span>
                      <span className="mt-1 block font-display text-sm leading-snug font-semibold transition-colors group-hover:text-primary">
                        {related.title}
                      </span>
                      <span className="mt-1 flex items-center gap-1 text-[0.68rem] text-muted-foreground">
                        {related.readingMinutes} min
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-white">
              <div
                aria-hidden="true"
                className="brand-stripes absolute inset-x-0 top-0 h-1.5 opacity-80"
              />
              <PenLine className="size-6 text-brand-gold" aria-hidden="true" />
              <h2 className="mt-3 font-display text-xl font-bold">¿Buscas tu camiseta?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Doce diseños de catálogo, cinco estilos y una guía de tallas para acertar a la
                primera.
              </p>
              <Button asChild variant="brand" className="mt-5 w-full">
                <Link to="/tienda">
                  Ver el escaparate
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-border/70 bg-secondary/50 p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Publicado el
              </p>
              <p className="mt-1 font-display text-lg font-bold">{formatDate(post.date)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {post.readingMinutes} min de lectura · {post.tag}
              </p>
            </div>
          </aside>
        </div>

        {relatedPosts.length > 0 ? (
          <section className="shell pb-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold sm:text-3xl">También te puede interesar</h2>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link to="/blog">
                  Todos los artículos
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {relatedPosts.map((related, index) => (
                <PostCard key={related.slug} post={related} index={index + 1} featured />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </>
  )
}
