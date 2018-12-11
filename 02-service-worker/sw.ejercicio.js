'use strict';

self.addEventListener('fetch', event => {
    if (event.request.url.includes('main.jpg')) {
        let respuesta = fetch(event.request.url.replace("main", "main-patas-arriba"));
        event.respondWith(respuesta);
    }
});