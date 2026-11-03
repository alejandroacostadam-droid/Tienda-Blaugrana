import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Star } from 'lucide-react'

import { JerseyArt } from '@/components/shop/jersey-art'
import { Badge } from '@/components/ui/badge'
import { categoryMeta, getDiscountPercentage } from '@/lib/catalog'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

const badgeVariants = {
  Nueva: 'default',
  Oferta: 'brand',
  'Edición limitada': 'gold',
  'Últimas unidades': 'outline',
} as const

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = getDiscountPercentage(product)
  const category = categoryMeta[product.category]

  return (
    <article className="group flex flex-col">
      <div className="relative">
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
          {product.badge ? (
            <Badge variant={badgeVariants[product.badge]}>
              {product.badge}
              {product.badge === 'Oferta' && discount > 0 ? ` −${discount}%` : ''}
            </Badge>
          ) : null}
          {product.compareAt && !product.badge ? <Badge variant="brand">−{discount}%</Badge> : null}
        </div>

        <Link
          to="/tienda/$slug"
          params={{ slug: product.slug }}
          preload="intent"
          className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label={`Ver ${product.name}`}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-border/70 p-4 transition-shadow duration-300 group-hover:shadow-[0_24px_55px_-30px_rgb(11_21_38/0.45)]"
            style={{
              backgroundImage: `radial-gradient(120% 100% at 20% 0%, #ffffff 0%, ${product.colors.base}14 55%, ${product.colors.accent}1f 100%)`,
            }}
          >
            <span className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-white/75 text-ink opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>

            <div className="mx-auto max-w-[15rem] pt-7 pb-2 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04]">
              <JerseyArt
                pattern={product.pattern}
                colors={product.colors}
                number={product.number}
                label={product.name}
              />
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-brand-red uppercase">
            {category.label}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-brand-gold text-brand-gold" aria-hidden="true" />
            {product.rating.toFixed(1)}
            <span className="sr-only">sobre 5</span>
          </span>
        </div>
        <h3 className="font-display text-base leading-snug font-semibold tracking-tight">
          <Link
            to="/tienda/$slug"
            params={{ slug: product.slug }}
            preload="intent"
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-display text-lg font-bold">{formatPrice(product.price)}</span>
          {product.compareAt ? (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAt)}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-1.5 pt-1" aria-hidden="true">
          <span
            className="size-2.5 rounded-full ring-1 ring-black/10"
            style={{ backgroundColor: product.colors.base }}
          />
          <span
            className="size-2.5 rounded-full ring-1 ring-black/10"
            style={{ backgroundColor: product.colors.accent }}
          />
          <span
            className="size-2.5 rounded-full ring-1 ring-black/10"
            style={{ backgroundColor: product.colors.trim }}
          />
          <span className="ml-1 text-[0.68rem] text-muted-foreground">
            {product.sizes.length} tallas
          </span>
        </div>
      </div>
    </article>
  )
}
