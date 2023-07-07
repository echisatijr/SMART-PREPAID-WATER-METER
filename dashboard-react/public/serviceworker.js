/*
This is a service worker script that handles caching and offline functionality for the application.

The script consists of event listeners for install, fetch, and activate events.

- CACHE_NAME: The name of the cache version.
- urlsToCache: An array of URLs to cache initially.

The 'install' event listener is triggered when the service worker is installed. It opens a cache and
adds the specified URLs to the cache.

The 'fetch' event listener is triggered whenever a network request is made. It intercepts the request
and checks if it is available in the cache. If found, it responds with the cached version. If not found,
it fetches the request from the network. If the network request fails, it responds with the offline page.

The 'activate' event listener is triggered when the service worker is activated. It removes any
outdated caches and keeps only the latest version.

Inline comments are added to explain specific sections of the code.
*/

const CACHE_NAME = 'version-1'
const urlsToCache = ['index.html', 'offline.html']

const self = this

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

// Listen for fetch requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return fetch(event.request).catch(() => caches.match('offline.html'))
    })
  )
})

// Activate service worker
self.addEventListener('activate', (event) => {
  const cacheWhiteList = []
  cacheWhiteList.push(CACHE_NAME)
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})
