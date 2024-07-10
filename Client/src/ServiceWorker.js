// serviceWorker.js

const CACHE_NAME = 'cook-sister-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/img_1.jpg',
  '/img_3.jpg',
  '/img_5.jpg',
  '/img_4.jpg',
  '/img_6.jpg',
  '/img_8.jpg',
  '/logo.png',
  '/images/teammember1.jpg',
  '/images/teammember2.jpg',
  '/images/teammember3.jpg',
  '/images/teammember4.jpg',
  '/images/teammember5.jpg',
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

// Export the register function
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}