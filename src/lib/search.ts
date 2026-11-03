import type { ProductCategory, PostTag, Size } from '@/types'
import { PRODUCT_CATEGORIES } from '@/types'

export type SortOrder = 'relevancia' | 'precio-asc' | 'precio-desc' | 'novedades'

export const sortOptions: { value: SortOrder; label: string }[] = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'novedades', label: 'Novedades' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
]

export interface TiendaSearch {
  categoria?: ProductCategory
  q?: string
  orden?: SortOrder
}

export interface BlogSearch {
  tag?: PostTag
}

export interface ContactoSearch {
  producto?: string
  talla?: Size
}

const SORT_VALUES: SortOrder[] = ['relevancia', 'novedades', 'precio-asc', 'precio-desc']
const SIZE_VALUES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const POST_TAG_VALUES: PostTag[] = ['Tallas', 'Cuidados', 'Guías', 'Estilo', 'Compras', 'Historia']

export function validateTiendaSearch(search: Record<string, unknown>): TiendaSearch {
  const categoria =
    typeof search.categoria === 'string' &&
    PRODUCT_CATEGORIES.includes(search.categoria as ProductCategory)
      ? (search.categoria as ProductCategory)
      : undefined

  const orden =
    typeof search.orden === 'string' && SORT_VALUES.includes(search.orden as SortOrder)
      ? (search.orden as SortOrder)
      : undefined

  const q = typeof search.q === 'string' && search.q.trim() ? search.q.trim() : undefined

  return { categoria, q, orden }
}

export function validateBlogSearch(search: Record<string, unknown>): BlogSearch {
  return {
    tag:
      typeof search.tag === 'string' && POST_TAG_VALUES.includes(search.tag as PostTag)
        ? (search.tag as PostTag)
        : undefined,
  }
}

export function validateContactoSearch(search: Record<string, unknown>): ContactoSearch {
  const talla =
    typeof search.talla === 'string' && SIZE_VALUES.includes(search.talla as Size)
      ? (search.talla as Size)
      : undefined

  return {
    producto: typeof search.producto === 'string' ? search.producto : undefined,
    talla,
  }
}
