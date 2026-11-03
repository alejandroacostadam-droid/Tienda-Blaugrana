import { useState } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Star,
  Truck,
  Undo2,
} from 'lucide-react'

import { Breadcrumbs } from '@/components/common/breadcrumbs'
import { PageMeta } from '@/components/common/page-meta'
import { JerseyArt } from '@/components/shop/jersey-art'
import { ProductGrid } from '@/components/shop/product-grid'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  categoryMeta,
  getDiscountPercentage,
  getProductBySlug,
  getRelatedProducts,
  isSizeSoldOut,
} from '@/lib/catalog'
import { formatPrice } from '@/lib/utils'
import type { Size } from '@/types'

export const Route = createFileRoute('/tienda/$slug')({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug)

    if (!product) {
      throw notFound()
    }

    return product
  },
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()
  const [viewBySlug, setViewBySlug] = useState<Record<string, 'front' | 'back'>>({})
  const [sizeBySlug, setSizeBySlug] = useState<Record<string, Size>>({})
  const view = viewBySlug[product.slug] ?? 'front'
  const selectedSize =
    sizeBySlug[product.slug] ??
    product.sizes.find((size) => !isSizeSoldOut(product, size)) ??
    product.sizes[0]

  function setView(nextView: 'front' | 'back') {
    setViewBySlug((prev) => ({ ...prev, [product.slug]: nextView }))
  }

  function setSelectedSize(nextSize: Size) {
    setSizeBySlug((prev) => ({ ...prev, [product.slug]: nextSize }))
  }

  const category = categoryMeta[product.category]
  const related = getRelatedProducts(product)
  const discount = getDiscountPercentage(product)
  const totalReviews = product.reviews

  return (
    <>
      <PageMeta
        title={`${product.name} — Blaugrana Store`}
        description={`${product.description} Precio: ${formatPrice(product.price)}. Tallas ${product.sizes.join(', ')}.`}
      />

      <section className="shell py-8 lg:py-10">
        <Breadcrumbs
          items={[
            { label: 'Inicio', to: '/' },
            { label: 'Tienda', to: '/tienda' },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="relative overflow-hidden rounded-3xl border border-border/70 p-6 sm:p-10"
              style={{
                backgroundImage: `radial-gradient(120% 110% at 15% 0%, #ffffff 0%, ${product.colors.base}12 50%, ${product.colors.accent}22 100%)`,
              }}
            >
              <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                {product.badge ? (
                  <Badge
                    variant={
                      product.badge === 'Oferta'
                        ? 'brand'
                        : product.badge === 'Edición limitada'
                          ? 'gold'
                          : 'default'
                    }
                  >
                    {product.badge}
                  </Badge>
                ) : null}
                {discount > 0 ? <Badge variant="brand">−{discount}%</Badge> : null}
              </div>

              <div className="mx-auto max-w-[21rem]">
                <JerseyArt
                  key={view}
                  pattern={product.pattern}
                  colors={product.colors}
                  number={product.number}
                  view={view}
                  label={`${product.name}, vista ${view === 'front' ? 'delantera' : 'trasera'}`}
                />
              </div>

              <div className="absolute right-5 bottom-5 rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-right shadow-sm backdrop-blur-sm">
                <p className="text-[0.58rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  Edición
                </p>
                <p className="font-display text-sm font-bold">26/27</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {(['front', 'back'] as const).map((side) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => setView(side)}
                  aria-pressed={view === side}
                  className={
                    view === side
                      ? 'flex flex-1 items-center gap-3 rounded-xl border-2 border-primary bg-card p-2 text-left shadow-sm'
                      : 'flex flex-1 items-center gap-3 rounded-xl border border-border bg-card/70 p-2 text-left transition-colors hover:border-primary/30'
                  }
                >
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-lg"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${product.colors.base}22, ${product.colors.accent}33)`,
                    }}
                  >
                    <JerseyArt
                      pattern={product.pattern}
                      colors={product.colors}
                      number={product.number}
                      view={side}
                      label=""
                      className="max-h-11 w-auto"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold">
                      {side === 'front' ? 'Delantera' : 'Trasera'}
                    </span>
                    <span className="block text-[0.68rem] text-muted-foreground">
                      {side === 'front' ? 'Escudo y color' : 'Dorsal grande'}
                    </span>
                  </span>
                </button>
              ))}
              <div className="hidden flex-1 items-center gap-3 rounded-xl border border-dashed border-border p-2 text-left sm:flex">
                <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                  <Ruler className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold">Corte regular</span>
                  <span className="block text-[0.68rem] text-muted-foreground">Tallas XS–XXL</span>
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-brand-blue" aria-hidden="true" />
                Compra demo sin pago
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="size-4 text-brand-blue" aria-hidden="true" />
                Envío 24–48 h
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Undo2 className="size-4 text-brand-blue" aria-hidden="true" />
                30 días de devolución
              </span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
                {category.label}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="size-3.5 fill-brand-gold text-brand-gold" aria-hidden="true" />
                {product.rating.toFixed(1)}
                <span>
                  ({totalReviews} {totalReviews === 1 ? 'valoración' : 'valoraciones'})
                </span>
              </span>
            </div>

            <h1 className="mt-3 text-3xl leading-[1.02] font-extrabold sm:text-4xl lg:text-[2.9rem]">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold">
                {formatPrice(product.price)}
              </span>
              {product.compareAt ? (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.compareAt)}
                  </span>
                  <Badge variant="brand">
                    Ahorras {formatPrice(product.compareAt - product.price)}
                  </Badge>
                </>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              IVA incluido · Envío gratis desde 60 €
            </p>

            <p className="mt-6 text-[0.98rem] leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">
                  Talla
                  {selectedSize ? (
                    <span className="ml-2 font-normal text-muted-foreground">{selectedSize}</span>
                  ) : null}
                </p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: 'guia-de-tallas-camiseta-barca' }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <Ruler className="size-3.5" aria-hidden="true" />
                  Guía de tallas
                </Link>
              </div>

              <div className="mt-3 grid grid-cols-6 gap-2">
                {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as Size[]).map((size) => {
                  const soldOut = isSizeSoldOut(product, size)
                  const available = product.sizes.includes(size) && !soldOut
                  const isSelected = selectedSize === size

                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!available}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={isSelected}
                      className={
                        isSelected
                          ? 'relative flex h-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm'
                          : available
                            ? 'flex h-11 items-center justify-center rounded-xl border border-border bg-card text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary'
                            : 'flex h-11 cursor-not-allowed items-center justify-center rounded-xl border border-dashed border-border/70 text-sm text-muted-foreground/40 line-through'
                      }
                    >
                      {size}
                      {!product.sizes.includes(size) ? (
                        <span className="sr-only">No disponible en este modelo</span>
                      ) : null}
                    </button>
                  )
                })}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <PackageCheck className="size-3.5" aria-hidden="true" />
                  Quedan unidades en {selectedSize}
                </span>
                {product.soldOutSizes?.length ? (
                  <span>
                    Agotadas: {product.soldOutSizes.join(', ')} (avísame y buscamos alternativa)
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <Button asChild size="lg" className="w-full">
                <Link to="/contacto" search={{ producto: product.slug, talla: selectedSize }}>
                  Solicitar esta camiseta
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/tienda">
                  Seguir explorando
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Te llevamos al formulario con el modelo y la talla ya seleccionados. Sin pagos
                online.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 rounded-2xl border border-border/70 bg-card/60 p-4">
              {[
                { icon: Truck, label: 'Envío 24–48 h' },
                { icon: Undo2, label: '30 días' },
                { icon: BadgeCheck, label: 'Calidad demo' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5 text-center">
                  <item.icon className="size-4 text-primary" aria-hidden="true" />
                  <span className="text-[0.68rem] font-medium text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <Accordion type="single" collapsible defaultValue="details">
              <AccordionItem value="details">
                <AccordionTrigger>Detalles y composición</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-brand-blue"
                          aria-hidden="true"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 rounded-lg bg-secondary/70 p-3 text-xs">
                    <strong className="text-foreground">Cuidados:</strong> {product.care}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger>Envío y devoluciones</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Preparamos el pedido en 24 h laborables. Entrega estimada de 24 a 48 h en
                    península y de 3 a 5 días en Europa. Envío gratuito a partir de 60 €.
                  </p>
                  <p className="mt-3">
                    Tienes 30 días para cambiar o devolver la prenda, siempre que esté sin usar y
                    conserve la etiqueta. Consulta todos los detalles en la guía de compras.
                  </p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: 'envios-tallas-devoluciones' }}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Leer la guía de envíos
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sizes">
                <AccordionTrigger>Corte y tallaje</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Corte regular con margen para mover los hombros. Si dudas entre dos tallas,
                    elige la mayor para un look holgado. Disponible en {product.sizes.join(', ')}.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    {['Pecho', 'Largo', 'Hombros'].map((label, index) => (
                      <div key={label} className="rounded-lg bg-secondary/70 p-2 text-center">
                        <p className="font-semibold text-foreground">{label}</p>
                        <p className="mt-1 text-muted-foreground">
                          {selectedSize ? ['54 cm', '72 cm', '46 cm'][index] : '—'}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-[0.68rem] text-muted-foreground">
                    Medidas orientativas de la talla M. Consulta la guía completa para el resto.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="shell py-14 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Combina con</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">También te puede gustar</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/tienda">
              Ver todo el escaparate
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ProductGrid products={related} className="mt-8" />
      </section>
    </>
  )
}
