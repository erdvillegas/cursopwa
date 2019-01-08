/**
 * Cache para contenido estatico y el core de la aplicacion
 */
const CACHE_STATIC_NAME = 'static-v1';

/**
 * Cache para contenido dinamico
 */
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

/**
 * Cache para contenido que no debe cambiar
 */
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

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

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then(cache=>{
        return cache.addAll([
            "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        ]);
    });

    e.waitUntil(Promise.all([cachePromInstall,cacheInmutable]));
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
     * 2- Cache con Network Fallback
     *    Descargo la respuesta desde internet si el archivo 
     *    no se encuentra, después lo almacena en cache
     */

    const respuestaCache = caches.match(e.request).then(resp => {
        if (resp) return resp;

        //NO existe el archivio, lo descargo de la web
        console.log("No existe ", e.request.url);

        return fetch(e.request).then(newResponse => {
            caches.open(CACHE_DYNAMIC_NAME)
                .then(cache => {
                    cache.put(e.request,newResponse);
                });

            return newResponse.clone();
        });
    });

    e.respondWith(respuestaCache);
});