import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

import { InstagramIcon } from '@/components/common/instagram-icon'
import { NewsletterForm } from '@/components/common/newsletter-form'
import { Logo } from '@/components/layout/logo'
import { Separator } from '@/components/ui/separator'
import { categories } from '@/lib/catalog'
import { site } from '@/data/site'

const shopLinks = categories.map((category) => ({
  label: category.label,
  search: { categoria: category.value },
}))

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-ink text-white">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1.2fr]">
          <div className="space-y-5">
            <Logo tone="light" />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">{site.tagline}</p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Blaugrana Store"
                className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Enviar un correo"
                className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Tienda">
            <h3 className="text-[0.68rem] font-semibold tracking-[0.2em] text-white/40 uppercase">
              Tienda
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/tienda" className="text-white/70 transition-colors hover:text-white">
                  Todas las camisetas
                </Link>
              </li>
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to="/tienda"
                    search={link.search}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contenido">
            <h3 className="text-[0.68rem] font-semibold tracking-[0.2em] text-white/40 uppercase">
              Explora
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/blog" className="text-white/70 transition-colors hover:text-white">
                  Blog de consejos
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/$slug"
                  params={{ slug: 'guia-de-tallas-camiseta-barca' }}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Guía de tallas
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/$slug"
                  params={{ slug: 'como-lavar-camiseta-futbol' }}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Cuidado de camisetas
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-white/70 transition-colors hover:text-white">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-white/70 transition-colors hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-4">
            <h3 className="text-[0.68rem] font-semibold tracking-[0.2em] text-white/40 uppercase">
              La newsletter culer
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              Nuevas camisetas, guías de tallas y consejos. Una vez al mes, sin ruido.
            </p>
            <NewsletterForm
              compact
              className="[&_input]:border-white/15 [&_input]:bg-white/5 [&_input]:text-white [&_input]:placeholder:text-white/35"
            />
            <div className="space-y-2 pt-2 text-xs text-white/50">
              <p className="flex items-center gap-2">
                <Mail className="size-3.5" aria-hidden="true" />
                {site.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5" aria-hidden="true" />
                {site.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5" aria-hidden="true" />
                {site.address}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col gap-4 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Blaugrana Store. Proyecto de demostración, no afiliado al
            FC Barcelona.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/contacto" className="transition-colors hover:text-white">
              Aviso legal
            </Link>
            <Link to="/contacto" className="transition-colors hover:text-white">
              Privacidad
            </Link>
            <a
              href="https://tanstack.com/router"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              Hecho con TanStack Router
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
