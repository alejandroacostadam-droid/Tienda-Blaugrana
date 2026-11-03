import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Menu, Truck } from 'lucide-react'

import { InstagramIcon } from '@/components/common/instagram-icon'
import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { categories } from '@/lib/catalog'
import { navItems, site } from '@/data/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-ink text-white">
        <div className="shell flex h-9 items-center justify-between gap-4 text-[0.7rem] font-medium tracking-wide">
          <p className="flex items-center gap-2">
            <Truck className="size-3.5 text-brand-gold" aria-hidden="true" />
            <span className="truncate">{site.shippingNote}</span>
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 text-white/70 transition-colors hover:text-white sm:inline-flex"
          >
            <InstagramIcon className="size-3.5" />
            {site.instagram}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="shell flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === '/' }}
                    activeProps={{ className: 'bg-secondary text-primary' }}
                    inactiveProps={{
                      className:
                        'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                    }}
                    className="inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex" size="sm">
              <Link to="/tienda">
                Ver camisetas
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Abrir menú">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88%] max-w-sm p-0">
                <SheetHeader>
                  <SheetTitle>Menú</SheetTitle>
                  <SheetDescription>Explora la tienda y el blog culer.</SheetDescription>
                </SheetHeader>

                <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-2 pb-6">
                  <nav aria-label="Navegación móvil">
                    <ul className="flex flex-col">
                      {navItems.map((item) => (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            activeOptions={{ exact: item.to === '/' }}
                            activeProps={{ className: 'text-primary' }}
                            inactiveProps={{ className: 'text-foreground' }}
                            className="flex items-center justify-between border-b border-border/60 py-3.5 font-display text-lg font-semibold transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                            <ArrowRight
                              className="size-4 text-muted-foreground"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div>
                    <p className="eyebrow mb-3">Categorías</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.value}
                          to="/tienda"
                          search={{ categoria: category.value }}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          {category.label}
                          <span className="text-muted-foreground">{category.count}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-border/60 p-6">
                  <Button asChild className="w-full" onClick={() => setOpen(false)}>
                    <Link to="/tienda">
                      Ver todas las camisetas
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    {site.shippingNote}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
