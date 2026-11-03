import { cn } from '@/lib/utils'
import type { Product } from '@/types'

import { ProductCard } from './product-card'

interface ProductGridProps {
  products: Product[]
  className?: string
}

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div className={cn('grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  )
}
