const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_DYNAMIC_LIMIT = 50;

/**
 * Limpia el cache del contenido
 * @param {*} cacheName Nombre del objeto cache a eliminar
 * @param {*} numeroItems Numero de elementos a eliminar
 */
function limpiarCache(cacheName, numeroItems) {
    caches.open(cacheName).then(cache => {
        return cache.keys().then(keys => {
            if (keys.length > numeroItems) {
                cache.delete(keys[0]).then(limpiarCache(cacheName, numeroItems));
            }
        });
    });
}

/**
 * Instalacion del SW
 */
self.addEventListener("install", e => {
    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/style/base.css",
                "style/bg.png",
                "js/base.js",
                "js/app.js"
            ]);
        });

    const cacheInmutable = caches
        .open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            cache.add("//cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js");
        });

    e.waitUntil(Promise.all([cacheProm, cacheInmutable]));
});

/**
 * Borra versiones antiguas de cache 
 * */
self.addEventListener("activate", e => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== CACHE_STATIC_NAME && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });

    e.waitUntil(respuesta);
});

/**
 * Implementando Cache with Network Fallback 
 */
self.addEventListener('fetch', e => {
    const respuesta = caches.match(e.request)
        .then(res => {
            if (res) return res;

            //Si no existe en cache, lo solicito
            return fetch(e.request).then(newResp => {
                caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache => {
                        cache.put(e.request, newResp);
                        limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
                    });

                return newResp.clone();
            });
        });

    e.respondWith(respuesta);
});