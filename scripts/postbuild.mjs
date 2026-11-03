import { copyFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve(process.cwd(), 'dist')

// GitHub Pages no reescribe rutas a index.html: 404.html actúa como fallback de la SPA.
await copyFile(path.join(distDir, 'index.html'), path.join(distDir, '404.html'))

// Evita que Pages procese el sitio con Jekyll (útil si se despliega desde una rama).
await writeFile(path.join(distDir, '.nojekyll'), '')

console.log('[postbuild] Generados dist/404.html y dist/.nojekyll')
