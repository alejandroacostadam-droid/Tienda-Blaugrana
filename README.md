# Blaugrana Store

Escaparate de camisetas del Barça y blog de consejos, construido con React, TypeScript y TanStack Router (file-based), estilado con Tailwind CSS v4 y componentes shadcn/ui. Se sirve como SPA desde un servidor Node/Express, se publica en GitHub Pages y se despliega con Docker.

> **Proyecto de demostración.** No es una tienda oficial ni está afiliado al FC Barcelona. Los diseños son reinterpretaciones propias, no se procesan pagos y el formulario de contacto no envía correos reales.

## Stack

| Capa       | Tecnología                                                                       |
| ---------- | -------------------------------------------------------------------------------- |
| UI         | React 19 + TypeScript                                                            |
| Rutas      | TanStack Router 1.x con file-based routing y plugin de Vite                      |
| Estilos    | Tailwind CSS v4 + shadcn/ui + Radix UI                                           |
| Iconos     | lucide-react                                                                     |
| Contenido  | Productos y posts tipados en local; Markdown con `react-markdown` + `remark-gfm` |
| Servidor   | Node 24 + Express 5 + compression                                                |
| Build      | Vite 8                                                                           |
| Despliegue | Docker multi-stage (Render, Railway, Fly.io, VPS…)                               |

## Requisitos

- Node.js 20.19 o superior (recomendado 24)
- npm 10 o superior

## Puesta en marcha

```bash
npm install
npm run dev
```

La web queda disponible en `http://localhost:5173`.

### Scripts

| Comando             | Qué hace                                             |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo con HMR y generación de rutas |
| `npm run build`     | Typecheck + build en `dist/` + fallback `404.html`   |
| `npm start`         | Sirve `dist/` con Express en `http://localhost:3000` |
| `npm run preview`   | Preview estático de Vite                             |
| `npm run typecheck` | Comprueba TypeScript sin emitir                      |
| `npm run lint`      | ESLint (flat config)                                 |
| `npm run format`    | Prettier sobre todo el proyecto                      |

Para probar el modo producción:

```bash
npm run build
npm start
```

## Rutas

| Ruta            | Archivo                       | Contenido                                                           |
| --------------- | ----------------------------- | ------------------------------------------------------------------- |
| `/`             | `src/routes/index.tsx`        | Hero, categorías, destacados, blog, FAQ y newsletter                |
| `/tienda`       | `src/routes/tienda.index.tsx` | Escaparate con búsqueda, filtro por categoría y orden (en la URL)   |
| `/tienda/$slug` | `src/routes/tienda.$slug.tsx` | Detalle de producto, vista delantera/trasera, tallas y relacionados |
| `/blog`         | `src/routes/blog.index.tsx`   | Listado con post destacado y filtro por temática                    |
| `/blog/$slug`   | `src/routes/blog.$slug.tsx`   | Artículo completo, autor y relacionados                             |
| `/nosotros`     | `src/routes/nosotros.tsx`     | Historia, valores y cronología                                      |
| `/contacto`     | `src/routes/contacto.tsx`     | Formulario validado; acepta `?producto=...&talla=...`               |

Toda la navegación interna usa el componente `Link` de TanStack Router con `activeProps`, `preload="intent"` y `search` tipado. Solo los enlaces externos usan `<a>`.

### Añadir una ruta

Crea un archivo en `src/routes/` con `createFileRoute` y el plugin regenerará `src/routeTree.gen.ts` automáticamente al arrancar `dev` o `build`.

## Estructura

```
barca-store/
├─ public/
│  └─ favicon.svg
├─ server/
│  └─ index.mjs              # Express: estáticos, SPA fallback, /healthz
├─ src/
│  ├─ components/
│  │  ├─ blog/               # PostCard, PostCover
│  │  ├─ common/             # PageMeta, Breadcrumbs, Newsletter, EmptyState…
│  │  ├─ layout/             # Header, Footer, Logo
│  │  ├─ shop/               # JerseyArt (SVG), ProductCard, ProductGrid
│  │  └─ ui/                 # Componentes shadcn/ui
│  ├─ data/
│  │  ├─ products.ts         # 12 camisetas tipadas
│  │  ├─ posts.ts            # 6 artículos con contenido Markdown
│  │  └─ site.ts             # Navegación, FAQ, datos de contacto
│  ├─ lib/                   # catálogo, blog, búsqueda, utilidades
│  ├─ routes/                # Rutas file-based
│  ├─ types/                 # Tipos de producto y post
│  ├─ main.tsx
│  └─ styles.css             # Tokens Tailwind v4 + shadcn + utilidades
├─ Dockerfile
├─ scripts/
│  └─ postbuild.mjs           # Copia 404.html y añade .nojekyll
├─ .github/
│  └─ workflows/pages.yml     # Despliegue automático en GitHub Pages
├─ components.json
├─ vite.config.ts
└─ tsconfig*.json
```

Las ilustraciones de las camisetas son SVG generados por el componente `JerseyArt`: no dependen de imágenes externas, escalan sin perder calidad y se pueden sustituir por fotos reales cuando las tengas.

## Personalización

### Productos

Edita `src/data/products.ts`. Cada producto incluye color base, acento y detalle, patrón (`stripes`, `halves`, `sash`, `solid`, `checks`, `retro`), tallas, precio y textos. El escaparate y los relacionados se recalculan solos.

### Artículos

Edita `src/data/posts.ts` y escribe el contenido en Markdown. Para enlazar a rutas internas usa enlaces relativos, por ejemplo `[Ver camisetas](/tienda)`; el renderer los convierte en `Link` para mantener la navegación SPA.

### Tema

Los tokens de color, tipografía y radios están en `src/styles.css`:

```css
:root {
  --brand-blue: #004d98;
  --brand-red: #a50044;
  --brand-gold: #edbb00;
}
```

Los componentes shadcn se pueden ampliar con `npx shadcn@latest add [componente]` gracias a `components.json`.

## Servidor Node

`server/index.mjs`:

- `GET /healthz` → `{ ok: true, uptime }`.
- `/assets/*` → cache inmutable de un año.
- Resto de estáticos → cache de una hora.
- Cualquier ruta sin extensión → `index.html` (fallback de la SPA).
- Rutas con extensión no encontradas → `404` real.
- Cabeceras básicas de seguridad y compresión gzip.
- Apagado ordenado ante `SIGTERM`/`SIGINT`.

Variables de entorno:

| Variable | Por defecto | Descripción         |
| -------- | ----------- | ------------------- |
| `PORT`   | `3000`      | Puerto HTTP         |
| `HOST`   | `0.0.0.0`   | Interfaz de escucha |

## GitHub Pages

La web está publicada en **https://alejandroacostadam-droid.github.io/Tienda-Blaugrana/**.

El workflow `.github/workflows/pages.yml` compila y publica `dist/` en cada push a `main`.
Para reproducir el build de Pages en local:

```bash
# Windows (PowerShell)
$env:VITE_BASE='/Tienda-Blaugrana/'; npm run build

# macOS / Linux
VITE_BASE=/Tienda-Blaugrana/ npm run build
```

`vite.config.ts` usa `VITE_BASE` como `base` (por defecto `/`) y el router toma
`import.meta.env.BASE_URL` como `basepath`. El script `postbuild` copia `index.html`
a `404.html` para que las rutas profundas sigan funcionando al recargar, y añade
`.nojekyll`.

Sin `VITE_BASE`, el build se sirve en la raíz, como necesitan el servidor Express y Docker.

## Docker

```bash
docker build -t blaugrana-store .
docker run --rm -p 3000:3000 --env PORT=3000 blaugrana-store
```

La imagen es multi-stage:

1. `node:24-alpine` instala dependencias y compila.
2. La imagen final instala solo dependencias de producción, copia `dist/` y `server/`, y ejecuta como usuario `node` (no root).
3. Incluye `HEALTHCHECK` contra `/healthz`.

### Despliegue

- **Render / Railway / Fly.io:** conecta el repositorio, selecciona despliegue por Dockerfile y expón el puerto `3000` (`PORT` suele venir definido por la plataforma).
- **GitHub Pages:** automático con el workflow incluido (build estático con `VITE_BASE=/Tienda-Blaugrana/`).
- **VPS:** ejecuta el contenedor detrás de Nginx o Caddy con proxy al puerto 3000. Configura HTTPS en el proxy.
- **Sin Docker:** `npm ci && npm run build && npm start`.

## Calidad

```bash
npm run lint
npm run typecheck
npm run build
```

Comprobado en Chrome (desktop y móvil): navegación SPA con `Link`, menú móvil en `Sheet`, filtros que persisten en la URL, búsqueda sin resultados, selección de talla, formulario de contacto con validación y toast, página 404 y ausencia de desbordamiento horizontal a 390 px.

## Nota legal

Blaugrana Store es un proyecto de demostración con fines de portfolio. No está afiliado, asociado ni respaldado por el FC Barcelona. Las marcas y escudos mencionados pertenecen a sus propietarios.
