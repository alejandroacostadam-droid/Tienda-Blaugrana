import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, CalendarDays, Clock, PenLine } from 'lucide-react'

import { PostCard } from '@/components/blog/post-card'
import { PostCover } from '@/components/blog/post-cover'
import { EmptyState } from '@/components/common/empty-state'
import { NewsletterForm } from '@/components/common/newsletter-form'
import { PageMeta } from '@/components/common/page-meta'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { allPosts, postTags } from '@/lib/blog'
import { validateBlogSearch } from '@/lib/search'
import { formatDate } from '@/lib/utils'

export const Route = createFileRoute('/blog/')({
  validateSearch: validateBlogSearch,
  component: BlogPage,
})

function BlogPage() {
  const { tag } = Route.useSearch()
  const navigate = Route.useNavigate()
  const filteredPosts = tag ? allPosts.filter((post) => post.tag === tag) : allPosts
  const [featuredPost, ...restPosts] = filteredPosts
  const showFeatured = !tag && Boolean(featuredPost)

  return (
    <>
      <PageMeta
        title={`${tag ? `${tag} — ` : ''}Blog — Blaugrana Store`}
        description="Guías de tallas, cuidados, estilo e historia del Barça. Consejos prácticos para elegir y cuidar tus camisetas."
      />

      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_85%_0%,#fbeaf2_0%,transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="surface-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="shell py-12 lg:py-16">
          <div className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] text-brand-red uppercase">
            <BookOpen className="size-4" aria-hidden="true" />
            Blaugrana Journal
          </div>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl leading-[0.98] font-extrabold sm:text-5xl lg:text-6xl">
                Consejos para llevar
                <br />
                <span className="text-primary">los colores mejor.</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Tallas, lavados, combinaciones e historias. Todo lo que sabemos sobre camisetas,
                explicado sin humo y con ejemplos reales.
              </p>
            </div>
            <dl className="flex gap-8">
              <div>
                <dt className="text-xs text-muted-foreground">Artículos</dt>
                <dd className="font-display text-2xl font-extrabold">{allPosts.length}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Temas</dt>
                <dd className="font-display text-2xl font-extrabold">{postTags.length}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Lectura media</dt>
                <dd className="font-display text-2xl font-extrabold">5 min</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="shell py-10">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/blog"
            search={{}}
            className={
              !tag
                ? 'inline-flex h-8 items-center rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground'
                : 'inline-flex h-8 items-center rounded-full border border-border px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary'
            }
          >
            Todos
          </Link>
          {postTags.map((postTag) => {
            const isActive = tag === postTag

            return (
              <Link
                key={postTag}
                to="/blog"
                search={{ tag: postTag }}
                className={
                  isActive
                    ? 'inline-flex h-8 items-center rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground'
                    : 'inline-flex h-8 items-center rounded-full border border-border px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary'
                }
              >
                {postTag}
              </Link>
            )
          })}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Todavía no hay artículos de este tema"
              description="Estamos preparando nuevas guías. Mientras tanto, explora el resto del blog o el escaparate."
              actionLabel="Ver todos los artículos"
              onAction={() => navigate({ search: {} })}
              icon={BookOpen}
            />
          </div>
        ) : showFeatured && featuredPost ? (
          <div className="mt-8 space-y-12">
            <article className="group grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <Link
                to="/blog/$slug"
                params={{ slug: featuredPost.slug }}
                preload="intent"
                className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <PostCover post={featuredPost} index={0} className="aspect-[16/10]" />
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="brand">{featuredPost.tag}</Badge>
                  <Badge variant="outline">Destacado</Badge>
                </div>
                <h2 className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featuredPost.slug }}
                    className="transition-colors hover:text-primary"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {formatDate(featuredPost.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {featuredPost.readingMinutes} min
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <PenLine className="size-3.5" aria-hidden="true" />
                    {featuredPost.author}
                  </span>
                </div>
                <Button asChild className="mt-6">
                  <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                    Leer el artículo
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </article>

            {restPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {restPosts.map((post, index) => (
                  <PostCard key={post.slug} post={post} index={index + 1} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}

        <div className="mt-16 overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-accent/60 via-card to-secondary/60 p-7 sm:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="eyebrow">Una vez al mes</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Recibe la guía antes que nadie
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Nuevas camisetas, consejos de cuidado y alguna historia culer. Sin ruido.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
