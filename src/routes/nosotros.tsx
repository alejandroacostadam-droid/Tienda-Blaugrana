import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Heart, Palette, ShieldCheck, Sparkles, Star, Users } from 'lucide-react'

import { PageMeta } from '@/components/common/page-meta'
import { SectionHeading } from '@/components/common/section-heading'
import { JerseyArt } from '@/components/shop/jersey-art'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getProductBySlug } from '@/lib/catalog'
import { site } from '@/data/site'

export const Route = createFileRoute('/nosotros')({
  component: AboutPage,
})

const values = [
  {
    icon: Palette,
    title: 'Diseño con criterio',
    description:
      'Reinterpretamos la estética blaugrana sin copiar. Cada patrón, color y detalle pasa por una revisión de proporciones antes de entrar en el catálogo.',
  },
  {
    icon: ShieldCheck,
    title: 'Materiales honestos',
    description:
      'Algodón peinado, tejidos técnicos y tintas que aguantan lavados. Nada de promesas que la prenda no pueda cumplir.',
  },
  {
    icon: Heart,
    title: 'Cercanía culer',
    description:
      'Respondemos dudas de tallas con medidas reales. Si una camiseta no te va a quedar bien, te lo decimos antes de que la pidas.',
  },
  {
    icon: Sparkles,
    title: 'Ediciones pequeñas',
    description:
      'Tiradas cortas para no repetirnos. Cuando una retro se agota, no la reponemos: pasamos a la siguiente historia.',
  },
]

const timeline = [
  {
    year: '1992',
    title: 'Wembley',
    text: 'La primera Copa de Europa y una camiseta de algodón que se convirtió en objeto de culto.',
    slug: 'retro-wembley-1992',
  },
  {
    year: '2006',
    title: 'París',
    text: 'Una noche de remontada y una camiseta clara con detalles dorados que rompió el manual.',
    slug: 'retro-paris-2006',
  },
  {
    year: '2015',
    title: 'Berlín',
    text: 'Franjas horizontales y un triplete. La retro más buscada por quienes aman los noventa.',
    slug: 'retro-berlin-2015',
  },
  {
    year: '2026',
    title: 'Ahora',
    text: 'La temporada 26/27 llega con franjas de siempre y un corte pensado para la calle.',
    slug: 'camiseta-local-2026-27',
  },
]

function AboutPage() {
  const featuredRetro = getProductBySlug('retro-wembley-1992')

  return (
    <>
      <PageMeta
        title="Nosotros — Blaugrana Store"
        description="Somos un proyecto de catálogo independiente que reinterpreta la estética blaugrana. Conoce nuestra historia, valores y forma de trabajar."
      />

      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_80%_0%,#fbeaf2_0%,transparent_60%),radial-gradient(55%_60%_at_10%_20%,#e8eef8_0%,transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="surface-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="shell grid items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div>
            <Badge variant="outline" className="bg-white/70">
              Proyecto independiente · Barcelona
            </Badge>
            <h1 className="mt-5 text-4xl leading-[0.98] font-extrabold sm:text-5xl lg:text-6xl">
              Nacimos en la grada,
              <br />
              <span className="text-primary">crecimos en la calle.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Blaugrana Store es un escaparate de camisetas inspiradas en la estética del Barça y un
              blog para quienes creen que una camiseta también se cuida, se combina y se recuerda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/tienda">
                  Ver el escaparate
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blog">Leer el blog</Link>
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border/70 pt-6">
              <div>
                <dt className="text-xs text-muted-foreground">Diseños de catálogo</dt>
                <dd className="font-display text-2xl font-extrabold">12</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Guías publicadas</dt>
                <dd className="font-display text-2xl font-extrabold">6</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Valoración media</dt>
                <dd className="flex items-center gap-1 font-display text-2xl font-extrabold">
                  4,9
                  <Star className="size-4 fill-brand-gold text-brand-gold" aria-hidden="true" />
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2.5rem] border border-primary/10"
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                <JerseyArt
                  pattern="stripes"
                  colors={{ base: '#004d98', accent: '#a50044', trim: '#edbb00' }}
                  number="10"
                  label="Camiseta local"
                />
                <p className="mt-2 text-center text-xs font-semibold">Local 26/27</p>
              </div>
              <div className="mt-8 rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                {featuredRetro ? (
                  <>
                    <JerseyArt
                      pattern={featuredRetro.pattern}
                      colors={featuredRetro.colors}
                      number={featuredRetro.number}
                      label={featuredRetro.name}
                    />
                    <p className="mt-2 text-center text-xs font-semibold">Retro 1992</p>
                  </>
                ) : null}
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-semibold shadow-lg">
              <Users className="size-4 text-brand-blue" aria-hidden="true" />
              Hecho por culers, para culers
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Nuestra historia"
            title="Una tienda pequeña con una idea muy grande"
            description="No somos el club ni una tienda oficial. Somos un proyecto de demostración que reúne doce camisetas y seis guías con una obsesión: que la prenda esté a la altura de lo que significa."
          />
          <div className="space-y-5 text-[0.98rem] leading-7 text-muted-foreground">
            <p>
              Todo empezó con una pregunta sencilla: ¿por qué cuesta tanto encontrar una camiseta
              que combine la historia del club con un corte que te apetezca ponerte un martes por la
              tarde? Las oficiales son técnicas y las retro son fieles, pero rara vez las dos cosas
              se encuentran.
            </p>
            <p>
              Decidimos construir un catálogo pequeño y honesto. Cada diseño parte de una época
              concreta, se reinterpreta con tejidos actuales y se explica sin adornos. Si una prenda
              tiene un corte amplio, lo decimos. Si un estampado requiere cuidado, también.
            </p>
            <p>
              El blog nació después, cuando nos dimos cuenta de que la mitad de las dudas no eran
              sobre diseño, sino sobre tallas, lavados y combinaciones. Ahí están las guías que nos
              habría gustado leer antes de comprar nuestra primera camiseta.
            </p>
            <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-red/10 text-brand-red">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <p className="text-xs leading-relaxed">
                <strong className="text-foreground">Aviso honesto:</strong> Blaugrana Store es un
                proyecto de demostración. Los diseños no son productos oficiales del FC Barcelona y
                no se procesan pagos reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14 lg:py-16">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Cuatro cosas que no negociamos"
          description="No todo vale por vender una camiseta. Estas son las reglas que aplicamos a cada pieza del catálogo."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-border/70 bg-card p-6 transition-shadow hover:shadow-[0_24px_50px_-35px_rgb(11_21_38/0.45)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                <value.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-14 lg:py-16">
        <div className="overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-brand-gold uppercase">
                Nuestro archivo
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Cuatro fechas, cuatro camisetas
              </h2>
            </div>
            <Button asChild variant="brand" className="w-fit">
              <Link to="/tienda" search={{ categoria: 'retro' }}>
                Ver las retro
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <li key={item.year} className="relative border-t border-white/15 pt-4">
                <span className="absolute -top-1.5 left-0 size-3 rounded-full bg-brand-gold" />
                <p className="font-display text-2xl font-extrabold text-white/30">{item.year}</p>
                <h3 className="mt-1 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{item.text}</p>
                <Link
                  to="/tienda/$slug"
                  params={{ slug: item.slug }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-gold hover:underline"
                >
                  Ver camiseta
                  <ArrowRight className="size-3" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-14 lg:py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border/70 bg-secondary/50 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="eyebrow">Hablemos</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">¿Tienes una duda o una idea?</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Escríbenos por tallas, envíos o colaboraciones. Contestamos entre semana, de 10:00 a
              19:00, en {site.email}.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/contacto">
              Contactar
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
