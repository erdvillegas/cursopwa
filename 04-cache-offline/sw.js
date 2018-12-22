

//Guardamos los datos en la instalación
self.addEventListener("install", e => {

    const cachePromInstall = caches.open('cache-1')
        .then(cache => {

            return cache.addAll([
                './',
                './index.html',
                './css/style.css',
                './img/main.jpg',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                './js/app.js'
            ]);

        });

    e.waitUntil(cachePromInstall);

});

//Estrategias de cache

self.addEventListener("fetch", e => { 
    
    /*
    * 1-Cache-Only
    * Usada cuando queremos que todo el sitio sea cargado desde el cache,
    * Primero descarga el contenido y lo almacena en cache
    */

    e.respondWith( caches.match( e.request ) );
});