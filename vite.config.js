import { defineConfig } from 'vite'

export default defineConfig({
  root: 'site',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  // Rewrite /de to index.html for SPA-style routing
  appType: 'mpa',
  plugins: [
    {
      name: 'rewrite-de-route',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/de' || req.url === '/de/') {
            req.url = '/index.html'
          }
          next()
        })
      }
    }
  ]
})
