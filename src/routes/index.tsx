import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Heart,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Undo2,
} from 'lucide-react'

import { PostCard } from '@/components/blog/post-card'
import { NewsletterForm } from '@/components/common/newsletter-form'
import { PageMeta } from '@/components/common/page-meta'
import { SectionHeading } from '@/components/common/section-heading'
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
import { latestPosts } from '@/lib/blog'
import { categories, featuredProducts, getProductBySlug } from '@/lib/catalog'
import { formatPrice } from '@/lib/utils'
import { faqs, site, trustPoints } from '@/data/site'
import { products } from '@/data/products'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const tickerItems = [
  'Envío 24–48 h',
  'Algodón de verdad',
  'Diseño culer',
  'Devoluciones 30 días',
  'Asesoría de tallas',
  'Ediciones limitadas',
]

const benefits = [
  {
    icon: Truck,
    title: 'De la grada a tu casa',
    description: 'Preparamos cada pedido en 24 h y lo enviamos con seguimiento. Gratis desde 60 €.',
  },
  {
    icon: BadgeCheck,
    title: 'Diseños con criterio',
    description: 'Reinterpretaciones cuidadas, sin copias baratas ni escudos que se despegan.',
  },
  {
    icon: Heart,
    title: 'Asesoría de verdad',
    description: 'Si dudas con la talla, te respondemos con medidas concretas, no con plantillas.',
  },
]

function HomePage() {
  const heroProduct = featuredProducts[0]
  const retroProduct = getProductBySlug('retro-wembley-1992') ?? products[8]

  return (
    <>
      <PageMeta
        title="Blaugrana Store — Camisetas del Barça y consejos culers"
        description="Escaparate de camisetas del Barça: local, visitante, tercera, retro y entrenamiento. Blog con guías de tallas, cuidados y estilo."
      />

      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(75%_65%_at_85%_10%,#fbeaf2_0%,transparent_60%),radial-gradient(60%_60%_at_5%_30%,#e8eef8_0%,transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="surface-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />

        <div className="shell grid items-center gap-14 pt-12 pb-16 lg:grid-cols-[1.04fr_0.96fr] lg:pt-16 lg:pb-20">
          <div className="animate-rise">
            <Badge variant="outline" className="gap-2 border-primary/15 bg-white/70 py-1">
              <span className="size-1.5 rounded-full bg-brand-red" aria-hidden="true" />
              Temporada 26/27 · Nueva colección
            </Badge>

            <h1 className="mt-5 text-[clamp(2.7rem,5.8vw,4.7rem)] leading-[0.94] font-extrabold">
              Lleva los colores.
              <br />
              <span className="text-primary">Vive el juego.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Camisetas del Barça para el día a día, la grada y las noches que no se olvidan. Y un
              blog para que sepas elegirlas, combinarlas y cuidarlas.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/tienda">
                  Ver el escaparate
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blog">
                  <BookOpen className="size-4" aria-hidden="true" />
                  Consejos culers
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2" aria-hidden="true">
                  {['MC', 'JR', 'AL', 'PS'].map((initials, index) => (
                    <span
                      key={initials}
                      className="grid size-8 place-items-center rounded-full border-2 border-background text-[0.6rem] font-bold text-white"
                      style={{
                        backgroundColor: ['#004d98', '#a50044', '#edbb00', '#0b1526'][index],
                        color: index === 2 ? '#0b1526' : '#ffffff',
                      }}
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="flex items-center gap-1 font-semibold">
                    <Star className="size-3.5 fill-brand-gold text-brand-gold" aria-hidden="true" />
                    4,9/5
                  </span>
                  <span className="text-xs text-muted-foreground">+120 culers satisfechos</span>
                </div>
              </div>
              <p className="max-w-[11rem] text-xs leading-relaxed text-muted-foreground">
                {site.shippingNote}
              </p>
            </div>
          </div>

          <div className="animate-rise animate-rise-delay-1 relative mx-auto w-full max-w-[31rem]">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2.5rem] border border-primary/10"
            />
            <div
              aria-hidden="true"
              className="absolute top-1/2 -right-10 -z-10 size-52 -translate-y-1/2 rounded-full bg-brand-red/10 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-white via-card to-secondary/70 p-6 shadow-[0_40px_80px_-50px_rgb(0_40_90/0.6)] sm:p-8">
              <div className="absolute top-6 left-6 z-10">
                <Badge variant="brand">Nueva temporada</Badge>
              </div>
              <div className="absolute top-6 right-6 z-10 grid size-10 place-items-center rounded-full bg-white/80 text-primary shadow-sm backdrop-blur-sm">
                <Sparkles className="size-4" aria-hidden="true" />
              </div>

              <div className="mx-auto max-w-[19rem] pt-8">
                <JerseyArt
                  pattern={heroProduct.pattern}
                  colors={heroProduct.colors}
                  number={heroProduct.number}
                  label={heroProduct.name}
                />
              </div>

              <div className="mt-2 flex items-end justify-between gap-4 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <div>
                  <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
                    Más vendida
                  </p>
                  <p className="font-display text-sm font-bold sm:text-base">{heroProduct.name}</p>
                  <p className="text-xs text-muted-foreground">Tallas XS–XXL</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-extrabold">
                    {formatPrice(heroProduct.price)}
                  </p>
                  <Link
                    to="/tienda/$slug"
                    params={{ slug: heroProduct.slug }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Ver ficha
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-semibold shadow-lg sm:flex">
              <PackageCheck className="size-4 text-brand-blue" aria-hidden="true" />
              Envío en 24–48 h
            </div>
            <div className="absolute top-24 -right-3 hidden rotate-3 rounded-2xl border border-border/70 bg-card px-3 py-2 text-center shadow-lg sm:block">
              <p className="font-display text-lg font-extrabold text-primary">4,9</p>
              <p className="text-[0.58rem] tracking-wider text-muted-foreground uppercase">
                valoración
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-border/60 bg-ink py-3 text-white">
        <div className="animate-marquee flex w-max items-center gap-8 pr-8">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-8 text-[0.68rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase"
            >
              {item}
              <span className="size-1 rounded-full bg-brand-gold" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      <section className="shell py-10">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.label} className="text-center">
              <dt className="sr-only">{point.label}</dt>
              <dd className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                {point.value}
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground">{point.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell pb-4">
        <div className="grid gap-2 rounded-2xl border border-border/70 bg-card/60 p-2 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-4 rounded-xl p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <benefit.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-sm font-bold">{benefit.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-14 lg:py-16">
        <SectionHeading
          eyebrow="Encuentra la tuya"
          title="Cinco formas de ser culer"
          description="Del azul y granate de siempre a las terceras más atrevidas. Filtra por estilo y encuentra la camiseta que encaja contigo."
          action={
            <Button asChild variant="outline">
              <Link to="/tienda">
                Ver todas
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const product = products.find((item) => item.category === category.value)

            return (
              <Link
                key={category.value}
                to="/tienda"
                search={{ categoria: category.value }}
                className="group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-2xl border border-border/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(11_21_38/0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                style={{
                  backgroundImage: `linear-gradient(160deg, #ffffff 0%, ${category.accent}12 100%)`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold">{category.label}</h3>
                    <span className="text-xs text-muted-foreground">{category.count}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                {product ? (
                  <div className="pointer-events-none mx-auto -mb-14 w-32 rotate-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-0">
                    <JerseyArt
                      pattern={product.pattern}
                      colors={product.colors}
                      number={product.number}
                      label={`Camiseta ${category.label}`}
                    />
                  </div>
                ) : null}

                <span className="absolute right-4 bottom-4 grid size-8 place-items-center rounded-full bg-white/80 text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="shell py-14 lg:py-16">
        <SectionHeading
          eyebrow="Lo más deseado"
          title="Camisetas con algo que contar"
          description="Una selección de las favoritas de la temporada: clásicos renovados, retro de colección y terceras que no pasan desapercibidas."
          action={
            <Button asChild variant="outline">
              <Link to="/tienda">
                Todo el escaparate
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />
        <ProductGrid products={featuredProducts.slice(0, 4)} className="mt-10" />
      </section>

      <section className="shell py-14 lg:py-16">
        <div className="relative overflow-hidden rounded-3xl bg-ink text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, transparent 0 34px, #ffffff 34px 38px)',
            }}
          />
          <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
            <div>
              <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-brand-gold uppercase">
                Edición limitada
              </p>
              <h2 className="mt-3 text-3xl leading-tight font-extrabold sm:text-4xl lg:text-[2.9rem]">
                La noche de Wembley, en algodón.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">
                Una recreación de la camiseta de 1992 con tejido pesado, escudo cosido y ese corte
                amplio que ya no se fabrica. Solo 300 unidades de catálogo demo.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/75">
                {[
                  'Algodón peinado de 220 g/m²',
                  'Número y escudo en fieltro',
                  'Presentada en caja rígida',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-brand-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild variant="brand">
                  <Link to="/tienda/$slug" params={{ slug: retroProduct.slug }}>
                    Ver la retro
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <span className="text-sm text-white/50">{formatPrice(retroProduct.price)}</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden="true"
                className="absolute inset-6 rounded-full bg-brand-gold/15 blur-3xl"
              />
              <div className="relative rotate-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <JerseyArt
                  pattern={retroProduct.pattern}
                  colors={retroProduct.colors}
                  number={retroProduct.number}
                  label={retroProduct.name}
                />
                <div className="absolute -bottom-4 -left-4 rounded-xl bg-white px-4 py-2 text-ink shadow-xl">
                  <p className="text-[0.58rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
                    Desde 1992
                  </p>
                  <p className="font-display text-sm font-bold">Wembley · Edición 300</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14 lg:py-16">
        <SectionHeading
          eyebrow="El blog"
          title="Consejos para llevar los colores"
          description="Guías de tallas, cuidados, estilo e historias. Todo lo que rodea a una camiseta que quieres que dure."
          action={
            <Button asChild variant="outline">
              <Link to="/blog">
                Ir al blog
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </section>

      <section className="shell grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
        <div>
          <SectionHeading
            eyebrow="Antes de pedir"
            title="Dudas resueltas"
            description="Lo que más nos preguntáis sobre tallas, envíos y el proyecto."
          />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-accent/70 via-card to-secondary/60 p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="brand-stripes absolute inset-x-0 top-0 h-1.5 opacity-80"
          />
          <Undo2 className="size-8 text-brand-red" aria-hidden="true" />
          <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
            La newsletter culer<span className="text-brand-red">.</span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Una vez al mes: nuevas camisetas, guías útiles y alguna historia que merece la pena.
            Cero spam.
          </p>
          <NewsletterForm className="mt-6" />
          <div className="mt-8 flex items-center gap-3 rounded-xl border border-border/60 bg-white/60 p-3 text-xs text-muted-foreground">
            <BadgeCheck className="size-4 shrink-0 text-brand-blue" aria-hidden="true" />
            Proyecto de demostración. No procesamos pagos ni compartimos tus datos.
          </div>
        </div>
      </section>
    </>
  )
}
