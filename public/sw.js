let cacheData = "AppV1";
this.addEventListener('install', e => console.log('pwa installed.'));

this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if(response) {
                return response;
            }
        })
    );
});