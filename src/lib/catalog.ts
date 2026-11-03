import { products } from '@/data/products'
import type { Product, ProductCategory, Size } from '@/types'
import { PRODUCT_CATEGORIES } from '@/types'

export const categoryMeta: Record<
  ProductCategory,
  { label: string; description: string; accent: string }
> = {
  local: {
    label: 'Local',
    description: 'Las franjas de siempre, listas para cualquier partido.',
    accent: '#004d98',
  },
  visitante: {
    label: 'Visitante',
    description: 'Tonos claros y guiños granates para fuera de casa.',
    accent: '#a50044',
  },
  tercera: {
    label: 'Tercera',
    description: 'Diseños atrevidos para quien no pasa desapercibido.',
    accent: '#1fbfae',
  },
  retro: {
    label: 'Retro',
    description: 'Noches que ya son historia, en algodón de verdad.',
    accent: '#edbb00',
  },
  entrenamiento: {
    label: 'Entrenamiento',
    description: 'Tejido técnico para sudar los colores.',
    accent: '#1b4f8a',
  },
}

export const categories = PRODUCT_CATEGORIES.map((value) => ({
  value,
  ...categoryMeta[value],
  count: products.filter((product) => product.category === value).length,
}))

export const featuredProducts = products.filter((product) => product.featured)

export const allSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4) {
  const sameCategory = products.filter(
    (candidate) => candidate.category === product.category && candidate.slug !== product.slug,
  )
  const fallback = products.filter(
    (candidate) =>
      candidate.category !== product.category &&
      candidate.slug !== product.slug &&
      candidate.featured,
  )

  return [...sameCategory, ...fallback].slice(0, limit)
}

export function getDiscountPercentage(product: Product) {
  if (!product.compareAt) return 0
  return Math.round((1 - product.price / product.compareAt) * 100)
}

export function isSizeSoldOut(product: Product, size: Size) {
  return product.soldOutSizes?.includes(size) ?? false
}
