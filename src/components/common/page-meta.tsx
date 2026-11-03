import { useEffect } from 'react'

const DEFAULT_DESCRIPTION =
  'Blaugrana Store: camisetas del Barça de todas las temporadas y un blog con consejos para culers.'

interface PageMetaProps {
  title: string
  description?: string
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

export function PageMeta({ title, description = DEFAULT_DESCRIPTION }: PageMetaProps) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
  }, [title, description])

  return null
}
