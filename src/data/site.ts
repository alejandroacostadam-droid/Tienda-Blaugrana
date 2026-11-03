export const site = {
  name: 'Blaugrana Store',
  tagline: 'Camisetas del Barça para quienes llevan los colores más allá del campo.',
  email: 'hola@blaugranastore.example',
  phone: '+34 932 000 189',
  address: 'Carrer de les Corts, 12 · Barcelona',
  hours: 'Lun–Vie · 10:00–19:00',
  instagram: '@blaugranastore',
  shippingNote: 'Envío gratis a partir de 60 € · Devoluciones en 30 días',
} as const

export const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Tienda', to: '/tienda' },
  { label: 'Blog', to: '/blog' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
] as const

export const faqs = [
  {
    question: '¿Las camisetas son originales?',
    answer:
      'Blaugrana Store es un proyecto de demostración: los diseños son reinterpretaciones propias inspiradas en la estética culer, no productos oficiales del FC Barcelona. Cada ficha indica claramente que se trata de una pieza de catálogo demo.',
  },
  {
    question: '¿Cómo funciona el proceso de compra?',
    answer:
      'Este escaparate no procesa pagos. Cuando encuentres una camiseta que te guste, pulsa “Solicitar esta camiseta” y te llevaremos al formulario de contacto con el modelo y la talla ya seleccionados.',
  },
  {
    question: '¿Qué talla debo elegir?',
    answer:
      'Nuestras camisetas tienen un corte regular. Si dudas entre dos tallas, elige la mayor para un look más holgado o la menor para un ajuste ceñido. Tienes la guía completa en el blog y en cada ficha de producto.',
  },
  {
    question: '¿Puedo cambiar o devolver una camiseta?',
    answer:
      'Sí. Al ser un proyecto demo, las condiciones son orientativas: 30 días para cambios y devoluciones, siempre que la prenda esté sin usar y conserve su etiqueta.',
  },
]

export const trustPoints = [
  { value: '24–48 h', label: 'Entrega estimada' },
  { value: '30 días', label: 'Para devoluciones' },
  { value: '4,9/5', label: 'Valoración media' },
  { value: '100 %', label: 'Algodón peinado' },
] as const
