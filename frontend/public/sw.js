const CACHE_NAME = 'mse-v1'
const urlsToCache = [
  '/',
  '/mse-logo.png',
  '/favicons/favicon-32x32.png',
  '/favicons/favicon-16x16.png',
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch((error) => {
          console.log('Cache addAll failed:', error)
          throw error // Re-throw to ensure service worker doesn't activate with missing assets
        })
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const cachesToDelete = cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
      return Promise.all(cachesToDelete.map((name) => caches.delete(name)))
    })
  )
  self.clients.claim()
})

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
      .catch(() => {
        // Return a fallback if both cache and network fail
        return new Response('Offline')
      })
  )
})