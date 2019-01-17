/**
 * Cache para contenido estatico y el core de la aplicacion
 */
const CACHE_STATIC_NAME = "static-v2";

/**
 * Cache para contenido dinamico
 */
const CACHE_DYNAMIC_NAME = "dynamic-v1";

/**
 * Cache para contenido que no debe cambiar
 */
const CACHE_INMUTABLE_NAME = "inmutable-v1";

/**
 * Tamaño máximo de objetos almacenados en cache
 */
const CACHE_DYNAMIC_LIMIT = 50;

/**
 * Limpia os objetos de memoria cache
 * @param {*} cacheName Nombre de la cache a limpiar
 * @param {*} numeroItems Total de elementos a eliminar
 */
function limpiarCache(cacheName, numeroItems) {
    caches.open(cacheName).then(cache => {
        return cache.keys().then(keys => {
            if (keys.length >= numeroItems) {
                cache.delete(keys[0]).then(limpiarCache(cacheName, numeroItems));
            }
        });
    });
}

//Guardamos los datos en la instalación
self.addEventListener("install", e => {
    const cachePromInstall = caches.open(CACHE_STATIC_NAME).then(cache => {
        return cache.addAll([
            "./",
            "./index.html",
            "./css/style.css",
            "./img/main.jpg",
            "./js/app.js"
        ]);
    });

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then(cache => {
        return cache.addAll([
            "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        ]);
    });

    e.waitUntil(Promise.all([cachePromInstall, cacheInmutable]));
});

//Estrategias de cache

self.addEventListener("fetch", e => {
    /*
     * 1-Cache-Only
     * Usada cuando queremos que todo el sitio sea cargado desde el cache,
     * Primero descarga el contenido y lo almacena en cache
     */

    //e.respondWith( caches.match( e.request ) );

    /*
     * 2- Cache con Network Fallback (Ṕrimero cache, luego internet)
     *    Descargo la respuesta desde internet si el archivo
     *    no se encuentra, después lo almacena en cache
     */

    // const respuestaCache = caches.match(e.request).then(resp => {
    //     if (resp) return resp;

    //     //NO existe el archivio, lo descargo de la web
    //     console.log("No existe ", e.request.url);

    //     return fetch(e.request).then(newResponse => {
    //         caches.open(CACHE_DYNAMIC_NAME).then(cache => {
    //             cache.put(e.request, newResponse);
    //             limpiarCache(CACHE_DYNAMIC_NAME, 5);
    //         });

    //         return newResponse.clone();
    //     });
    // });

    /**
     * 3.- Network with cache Fallback
     *     Primero va internet e intenta obtener el recurso,
     *     si no lo encuentra lo trata de obtener de la cache
     */

    //   const respuestaCache = fetch(e.request)
    //     .then(res => {
    //       if (!res) return caches.match(e.request);

    //       caches.open(CACHE_DYNAMIC_NAME).then(cache => {
    //         cache.put(e.request, res);
    //         limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
    //       });

    //       return res.clone();
    //     })
    //     .catch(err => {
    //       return caches.match(e.request);
    //     });

    /**
     *  4.- Cache with Network update
     *      Util cuando el rendimiento es crítico, para que el usuario sienta
     *      que está trabajando en una aplicación nativa.
     *      Las actualizaciones siempre estaran un paso atras de la version actual
     */

    if (e.request.url.includes("bootstrap")) {
        return e.respondWith(caches.match(e.request));
    }
    const respuestaCache = caches.open(CACHE_STATIC_NAME).then(cache => {
        fetch(e.request).then(newRes => {
            cache.put(e.request, newRes);
        });

        return cache.match(e.request);
    });

    e.respondWith(respuestaCache);
});
