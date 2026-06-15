/* ============================================
   Service Worker — Franchising Factory PWA
   ============================================ */
const CACHE = 'ff-v1';
const ASSETS = ['/', '/index.html', '/style.css', '/script.js', '/animations.js', '/franqueavel.js', '/franqueavel.css'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res.ok && e.request.url.startsWith(self.location.origin)) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      });
      return cached || network;
    })
  );
});

/* ---- Push Notifications ---- */
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(
    data.title || '🏭 Franchising Factory',
    {
      body: data.body || 'Nova notificação recebida.',
      icon: 'https://static.wixstatic.com/media/feb376_693663dfe7fe48c3ac3d533f74b20bb7~mv2.png',
      badge: 'https://static.wixstatic.com/media/feb376_693663dfe7fe48c3ac3d533f74b20bb7~mv2.png',
      tag: data.tag || 'ff-notification',
      data: { url: data.url || '/' },
      actions: [
        { action: 'open', title: 'Ver Lead' },
        { action: 'dismiss', title: 'Ignorar' }
      ],
      vibrate: [200, 100, 200]
    }
  ));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;
  e.waitUntil(clients.openWindow(e.notification.data.url || '/'));
});
