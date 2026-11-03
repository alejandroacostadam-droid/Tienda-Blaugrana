import { useState, type FormEvent } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react'
import { toast } from 'sonner'

import { Breadcrumbs } from '@/components/common/breadcrumbs'
import { PageMeta } from '@/components/common/page-meta'
import { JerseyArt } from '@/components/shop/jersey-art'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { getProductBySlug, isSizeSoldOut } from '@/lib/catalog'
import { validateContactoSearch } from '@/lib/search'
import { site } from '@/data/site'
import type { Size } from '@/types'

export const Route = createFileRoute('/contacto')({
  validateSearch: validateContactoSearch,
  component: ContactPage,
})

type FormErrors = Partial<Record<'nombre' | 'email' | 'mensaje', string>>

const subjects = ['Consulta general', 'Talla y medidas', 'Pedido', 'Devolución', 'Colaboración']

function ContactPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const product = search.producto ? getProductBySlug(search.producto) : undefined

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [asunto, setAsunto] = useState(product ? 'Talla y medidas' : 'Consulta general')
  const [mensaje, setMensaje] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}

    if (nombre.trim().length < 2) {
      nextErrors.nombre = 'Escribe tu nombre (mínimo 2 caracteres).'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      nextErrors.email = 'Necesitamos un correo válido para responderte.'
    }

    if (mensaje.trim().length < 10) {
      nextErrors.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    toast.success('Mensaje preparado', {
      description:
        'Esto es una demo: no se ha enviado ningún correo, pero el formulario funciona de verdad.',
    })
    setMensaje('')
    setErrors({})
  }

  return (
    <>
      <PageMeta
        title="Contacto — Blaugrana Store"
        description="Escríbenos para dudas de tallas, pedidos, devoluciones o colaboraciones. Respondemos de lunes a viernes."
      />

      <section className="relative overflow-hidden border-b border-border/60">
        <div
          aria-hidden="true"
          className="surface-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="shell py-10 lg:py-14">
          <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Contacto' }]} />
          <div className="mt-7 max-w-2xl">
            <p className="eyebrow">Hablemos</p>
            <h1 className="mt-3 text-4xl leading-[0.98] font-extrabold sm:text-5xl">
              Estamos al otro lado<span className="text-brand-red">.</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Dudas de talla, estado de un pedido, una idea para el blog o simplemente saludar.
              Leemos todo y contestamos entre semana.
            </p>
          </div>
        </div>
      </section>

      <section className="shell grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-16">
        <div className="space-y-4">
          {[
            {
              icon: Mail,
              title: 'Correo',
              value: site.email,
              href: `mailto:${site.email}`,
              note: 'Respondemos en 24–48 h laborables.',
            },
            {
              icon: Phone,
              title: 'Teléfono',
              value: site.phone,
              href: `tel:${site.phone.replaceAll(' ', '')}`,
              note: 'Lun–Vie de 10:00 a 19:00.',
            },
            {
              icon: MapPin,
              title: 'Estudio',
              value: site.address,
              note: 'Sin tienda física: proyecto de demostración.',
            },
            {
              icon: Clock,
              title: 'Horario',
              value: site.hours,
              note: 'Los festivos respondemos al día siguiente.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {item.title}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-0.5 block text-sm font-semibold break-words transition-colors hover:text-primary"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-0.5 text-sm font-semibold break-words">{item.value}</p>
                )}
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-5">
            <MessageCircle className="size-5 text-brand-red" aria-hidden="true" />
            <p className="mt-2 text-sm font-semibold">¿Prefieres la guía rápida?</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              La mayoría de dudas de talla se resuelven con la tabla de medidas y el artículo de
              cuidados.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/blog/$slug"
                params={{ slug: 'guia-de-tallas-camiseta-barca' }}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/30 hover:text-primary"
              >
                Guía de tallas
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </Link>
              <Link
                to="/blog/$slug"
                params={{ slug: 'envios-tallas-devoluciones' }}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/30 hover:text-primary"
              >
                Envíos y devoluciones
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[0_30px_70px_-50px_rgb(11_21_38/0.5)] sm:p-8">
          {product ? (
            <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-primary/15 bg-secondary/50 p-4 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3">
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-xl"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${product.colors.base}22, ${product.colors.accent}33)`,
                  }}
                >
                  <JerseyArt
                    pattern={product.pattern}
                    colors={product.colors}
                    number={product.number}
                    label=""
                    className="max-h-12 w-auto"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-brand-red uppercase">
                    Consulta sobre
                  </p>
                  <p className="truncate font-display text-sm font-bold">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Talla seleccionada: {search.talla ?? 'sin definir'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/tienda/$slug" params={{ slug: product.slug }}>
                    Ver ficha
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ search: {}, replace: true })}
                >
                  Quitar
                </Button>
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold">Cuéntanos</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Los campos marcados con * son obligatorios.
              </p>
            </div>
            <Badge variant="outline">Demo</Badge>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(event) => {
                    setNombre(event.target.value)
                    if (errors.nombre) setErrors((prev) => ({ ...prev, nombre: undefined }))
                  }}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.nombre)}
                  aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                />
                {errors.nombre ? (
                  <p id="nombre-error" className="text-xs text-destructive">
                    {errors.nombre}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email ? (
                  <p id="email-error" className="text-xs text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="asunto">Asunto</Label>
                <Select value={asunto} onValueChange={setAsunto}>
                  <SelectTrigger id="asunto" className="w-full" aria-label="Asunto">
                    <SelectValue placeholder="Elige un asunto" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="talla">Talla de interés</Label>
                <Select
                  value={search.talla ?? ''}
                  onValueChange={(value) =>
                    navigate({
                      search: (prev) => ({ ...prev, talla: value as Size }),
                      replace: true,
                    })
                  }
                  disabled={!product}
                >
                  <SelectTrigger id="talla" className="w-full" aria-label="Talla de interés">
                    <SelectValue placeholder={product ? 'Elige talla' : 'Selecciona un producto'} />
                  </SelectTrigger>
                  <SelectContent>
                    {product?.sizes.map((size) => (
                      <SelectItem key={size} value={size} disabled={isSizeSoldOut(product, size)}>
                        {size}
                        {isSizeSoldOut(product, size) ? ' · agotada' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensaje">Mensaje *</Label>
              <Textarea
                id="mensaje"
                value={mensaje}
                onChange={(event) => {
                  setMensaje(event.target.value)
                  if (errors.mensaje) setErrors((prev) => ({ ...prev, mensaje: undefined }))
                }}
                placeholder="Cuéntanos qué necesitas. Si es una duda de talla, incluye tu altura y la talla que sueles usar."
                aria-invalid={Boolean(errors.mensaje)}
                aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
              />
              {errors.mensaje ? (
                <p id="mensaje-error" className="text-xs text-destructive">
                  {errors.mensaje}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Al enviar aceptas que usemos tus datos solo para responderte. Proyecto demo sin
                backend.
              </p>
              <Button type="submit" variant="brand" className="shrink-0">
                <Send className="size-4" aria-hidden="true" />
                Enviar mensaje
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="shell pb-16">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border/70 bg-secondary/50 p-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            ¿Buscas una camiseta concreta? El escaparate tiene filtros por estilo y búsqueda por
            nombre.
          </p>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/tienda">
              Ir a la tienda
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
