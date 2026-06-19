/* ============================================
   Service Worker — Franchising Factory PWA
   ============================================ */
const CACHE = 'ff-v2';
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
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) {}

  const title = data.title || '🏭 Franchising Factory';
  const options = {
    body:    data.body  || 'Novo lead recebido! Acesse o painel.',
    icon:    data.icon  || 'https://static.wixstatic.com/media/feb376_693663dfe7fe48c3ac3d533f74b20bb7~mv2.png',
    badge:   data.badge || 'https://static.wixstatic.com/media/feb376_693663dfe7fe48c3ac3d533f74b20bb7~mv2.png',
    tag:     data.tag   || 'ff-lead',
    renotify: true,
    data:    { url: data.url || '/?admin=open' },
    actions: [
      { action: 'open',    title: '📋 Ver no Painel' },
      { action: 'dismiss', title: 'Fechar' }
    ],
    vibrate: [200, 100, 200, 100, 400]
  };

  e.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;

  const target = e.notification.data?.url || '/?admin=open';

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(wins => {
      // Se o PWA já está aberto, foca e navega
      for (const win of wins) {
        if (win.url.includes(self.location.origin)) {
          win.focus();
          win.postMessage({ type: 'FF_OPEN_ADMIN' });
          return;
        }
      }
      // Caso contrário, abre nova janela
      return clients.openWindow(target);
    })
  );
});
