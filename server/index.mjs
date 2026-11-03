import path from 'node:path'
import { fileURLToPath } from 'node:url'

import compression from 'compression'
import express from 'express'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(currentDir, '..', 'dist')
const indexFile = path.join(distDir, 'index.html')
const port = Number(process.env.PORT) || 3000
const host = process.env.HOST || '0.0.0.0'

const app = express()

app.disable('x-powered-by')
app.use(compression())
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  next()
})

app.get('/healthz', (_req, res) => {
  res.json({ ok: true, uptime: Math.round(process.uptime()) })
})

app.use(
  '/assets',
  express.static(path.join(distDir, 'assets'), {
    immutable: true,
    maxAge: '1y',
    fallthrough: true,
  }),
)

app.use(
  express.static(distDir, {
    index: false,
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache')
      }
    },
  }),
)

app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  if (path.extname(req.path)) {
    res.status(404).type('text/plain').send('Not found')
    return
  }

  res.setHeader('Cache-Control', 'no-cache')
  res.sendFile(indexFile, (error) => {
    if (error) next(error)
  })
})

app.use((error, _req, res, next) => {
  if (res.headersSent) {
    next(error)
    return
  }

  console.error('[server] error inesperado:', error)
  res.status(500).type('text/plain').send('Internal Server Error')
})

const server = app.listen(port, host, () => {
  console.log(`Blaugrana Store escuchando en http://${host}:${port}`)
})

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    console.log(`[server] recibido ${signal}, cerrando…`)
    server.close(() => process.exit(0))
    setTimeout(() => process.exit(1), 10_000).unref()
  })
}
