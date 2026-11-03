import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Search, SlidersHorizontal, X } from 'lucide-react'

import { Breadcrumbs } from '@/components/common/breadcrumbs'
import { EmptyState } from '@/components/common/empty-state'
import { PageMeta } from '@/components/common/page-meta'
import { ProductGrid } from '@/components/shop/product-grid'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categories, categoryMeta } from '@/lib/catalog'
import { sortOptions, validateTiendaSearch, type SortOrder } from '@/lib/search'
import { products } from '@/data/products'

export const Route = createFileRoute('/tienda/')({
  validateSearch: validateTiendaSearch,
  component: TiendaPage,
})

function TiendaPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const filteredProducts = products
    .filter((product) => !search.categoria || product.category === search.categoria)
    .filter((product) => {
      if (!search.q) return true
      const haystack =
        `${product.name} ${product.description} ${categoryMeta[product.category].label}`.toLowerCase()
      return haystack.includes(search.q.toLowerCase())
    })
    .sort((a, b) => {
      switch (search.orden) {
        case 'precio-asc':
          return a.price - b.price
        case 'precio-desc':
          return b.price - a.price
        case 'novedades':
          return Number(Boolean(b.badge === 'Nueva')) - Number(Boolean(a.badge === 'Nueva'))
        default:
          return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      }
    })

  const activeCategory = search.categoria ? categoryMeta[search.categoria] : undefined
  const hasFilters = Boolean(search.categoria || search.q || search.orden)

  function updateSearch(next: Partial<{ q: string; orden: SortOrder }>) {
    navigate({
      search: (prev) => ({ ...prev, ...next }),
      replace: true,
      resetScroll: false,
    })
  }

  function clearFilters() {
    navigate({ search: {}, replace: true, resetScroll: false })
  }

  return (
    <>
      <PageMeta
        title={`${activeCategory ? `${activeCategory.label} — ` : ''}Tienda — Blaugrana Store`}
        description={
          activeCategory?.description ??
          'Escaparate de camisetas del Barça: local, visitante, tercera, retro y entrenamiento. Filtra por categoría y encuentra tu talla.'
        }
      />

      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden="true"
          className="surface-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="shell py-10 lg:py-14">
          <Breadcrumbs
            items={[
              { label: 'Inicio', to: '/' },
              { label: 'Tienda', to: '/tienda' },
              ...(activeCategory ? [{ label: activeCategory.label }] : []),
            ]}
          />
          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">El escaparate</p>
              <h1 className="mt-3 text-4xl leading-[0.98] font-extrabold sm:text-5xl">
                {activeCategory ? activeCategory.label : 'Todas las camisetas'}
                <span className="text-brand-red">.</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {activeCategory
                  ? activeCategory.description
                  : 'Doce diseños de catálogo, cinco estilos y una sola idea: que encuentres la camiseta que te apetece ponerte mañana.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-white/70">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'camiseta' : 'camisetas'}
              </Badge>
              <Badge variant="secondary">Envío 24–48 h</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-8 lg:py-10">
        <div className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-[0_18px_45px_-38px_rgb(11_21_38/0.5)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <form
              role="search"
              className="flex w-full gap-2 lg:max-w-md"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  value={search.q ?? ''}
                  onChange={(event) => updateSearch({ q: event.target.value || undefined })}
                  placeholder="Buscar por nombre o estilo…"
                  aria-label="Buscar camisetas"
                  className="pl-10"
                />
              </div>
              {search.q ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => updateSearch({ q: undefined })}
                  aria-label="Borrar búsqueda"
                >
                  <X className="size-4" />
                </Button>
              ) : null}
            </form>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <SlidersHorizontal className="size-3.5" aria-hidden="true" />
                Ordenar
              </span>
              <Select
                value={search.orden ?? 'relevancia'}
                onValueChange={(value) =>
                  updateSearch({
                    orden: value === 'relevancia' ? undefined : (value as SortOrder),
                  })
                }
              >
                <SelectTrigger className="w-[13.5rem]" aria-label="Ordenar camisetas">
                  <SelectValue placeholder="Relevancia" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            <Link
              to="/tienda"
              search={{ q: search.q, orden: search.orden }}
              className={
                !search.categoria
                  ? 'inline-flex h-8 items-center rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground'
                  : 'inline-flex h-8 items-center rounded-full border border-border px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary'
              }
            >
              Todas
            </Link>
            {categories.map((category) => {
              const isActive = search.categoria === category.value

              return (
                <Link
                  key={category.value}
                  to="/tienda"
                  search={{
                    categoria: category.value,
                    q: search.q,
                    orden: search.orden,
                  }}
                  className={
                    isActive
                      ? 'inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground'
                      : 'inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary'
                  }
                >
                  {category.label}
                  <span className={isActive ? 'text-white/60' : 'text-muted-foreground/60'}>
                    {category.count}
                  </span>
                </Link>
              )
            })}

            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-brand-red underline-offset-4 hover:underline"
              >
                <X className="size-3.5" aria-hidden="true" />
                Limpiar filtros
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-10">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <EmptyState
              title="No hay camisetas con esos filtros"
              description="Prueba con otra categoría, borra la búsqueda o vuelve a ver todo el escaparate. Seguro que algo te encaja."
              actionLabel="Ver todas las camisetas"
              onAction={clearFilters}
            />
          )}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border/70 bg-secondary/50 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-sm">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold">¿No sabes qué talla pedir?</h2>
              <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Tenemos una guía con medidas reales, consejos de corte y una tabla comparativa para
                acertar a la primera.
              </p>
            </div>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/blog/$slug" params={{ slug: 'guia-de-tallas-camiseta-barca' }}>
              Leer la guía
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
