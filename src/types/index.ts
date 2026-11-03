export const PRODUCT_CATEGORIES = [
  'local',
  'visitante',
  'tercera',
  'retro',
  'entrenamiento',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

export type Size = (typeof SIZES)[number]

export type JerseyPattern = 'stripes' | 'halves' | 'sash' | 'solid' | 'checks' | 'retro'

export interface ProductColors {
  base: string
  accent: string
  trim: string
  secondary?: string
}

export interface Product {
  slug: string
  name: string
  price: number
  compareAt?: number
  category: ProductCategory
  badge?: 'Nueva' | 'Oferta' | 'Edición limitada' | 'Últimas unidades'
  pattern: JerseyPattern
  colors: ProductColors
  number: string
  sizes: Size[]
  soldOutSizes?: Size[]
  rating: number
  reviews: number
  featured?: boolean
  description: string
  details: string[]
  care: string
}

export type PostTag = 'Tallas' | 'Cuidados' | 'Guías' | 'Estilo' | 'Compras' | 'Historia'

export interface PostCover {
  from: string
  to: string
  accent: string
}

export interface Post {
  slug: string
  title: string
  excerpt: string
  tag: PostTag
  date: string
  readingMinutes: number
  author: string
  featured?: boolean
  cover: PostCover
  content: string
}
