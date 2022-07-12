let cacheData = "AppV1";

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheData).then(cache => {
            return cache.addAll([
                '/index.html'
            ]);
        })
    );
});

this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if(response) {
                return response;
            }
        })
    );
});

this.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== cacheData;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
})