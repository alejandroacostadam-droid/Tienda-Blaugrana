import { createRootRoute, Link, Outlet, type ErrorComponentProps } from '@tanstack/react-router'
import { ArrowRight, Home, RotateCcw } from 'lucide-react'
import { Toaster } from 'sonner'

import { PageMeta } from '@/components/common/page-meta'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { JerseyArt } from '@/components/shop/jersey-art'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: RootError,
})

function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#contenido"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster
        position="top-center"
        richColors
        toastOptions={{ className: 'font-sans' }}
        closeButton
      />
    </div>
  )
}

function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Página no encontrada — Blaugrana Store"
        description="La página que buscas no existe o ha cambiado de sitio."
      />
      <section className="shell flex flex-col items-center gap-10 py-16 text-center lg:flex-row lg:justify-between lg:py-24 lg:text-left">
        <div className="max-w-xl space-y-5">
          <p className="eyebrow">Error 404</p>
          <h1 className="text-4xl font-extrabold sm:text-6xl">
            Esta jugada no existe<span className="text-brand-red">.</span>
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            La página que buscas se ha ido al vestuario. Puede que el enlace esté mal escrito o que
            la camiseta ya no esté disponible.
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button asChild>
              <Link to="/">
                <Home className="size-4" aria-hidden="true" />
                Volver al inicio
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/tienda">
                Ver camisetas
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="w-full max-w-xs opacity-90">
          <JerseyArt
            pattern="stripes"
            colors={{ base: '#004d98', accent: '#a50044', trim: '#edbb00' }}
            number="404"
            label="Camiseta con el número 404"
          />
        </div>
      </section>
    </>
  )
}

function RootError({ error, reset }: ErrorComponentProps) {
  const message = error instanceof Error ? error.message : String(error)

  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="eyebrow">Algo ha fallado</p>
      <h1 className="text-3xl font-bold sm:text-4xl">Se nos ha ido el balón fuera</h1>
      <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
        Ha ocurrido un error inesperado. Puedes intentar recargar la página o volver al inicio.
      </p>
      {message ? (
        <code className="max-w-lg rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
          {message}
        </code>
      ) : null}
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Reintentar
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </section>
  )
}
