const CACHE_NAME = 'app-cache-v2';
const urlsToCache = ['/', '/index.html', '/site.webmanifest'];

// Helper function to check if URL is cacheable
function isCacheableRequest(request) {
  try {
    const url = new URL(request.url);

    // Only cache http and https requests
    if (!url.protocol.startsWith('http')) {
      return false;
    }

    // Only cache GET requests
    if (request.method !== 'GET') {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking cacheability:', error);
    return false;
  }
}

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }),
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-cacheable requests (like chrome-extension://)
  if (!isCacheableRequest(event.request)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // Double-check before caching
            if (isCacheableRequest(event.request)) {
              cache.put(event.request, responseToCache).catch((error) => {
                console.warn('Failed to cache:', event.request.url, error);
              });
            }
          });

          return response;
        })
        .catch((error) => {
          console.error('Fetch failed:', error);
          throw error;
        });
    }),
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
