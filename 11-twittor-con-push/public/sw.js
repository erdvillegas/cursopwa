// imports
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js');

importScripts('js/sw-db.js');
importScripts('js/sw-utils.js');


const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js',
    'js/libs/plugins/mdtoast.min.js',
    'js/libs/plugins/mdtoast.min.css'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js'
];



self.addEventListener('install', e => {


    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));



    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});


self.addEventListener('fetch', e => {

    let respuesta;

    if (e.request.url.includes('/api')) {

        // return respuesta????
        respuesta = manejoApiMensajes(DYNAMIC_CACHE, e.request);

    } else {

        respuesta = caches.match(e.request).then(res => {

            if (res) {

                actualizaCacheStatico(STATIC_CACHE, e.request, APP_SHELL_INMUTABLE);
                return res;

            } else {

                return fetch(e.request).then(newRes => {

                    return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);

                });

            }

        });

    }

    e.respondWith(respuesta);

});


// tareas asíncronas
self.addEventListener('sync', e => {

    console.log('SW: Sync');

    if (e.tag === 'nuevo-post') {

        // postear a BD cuando hay conexión
        const respuesta = postearMensajes();

        e.waitUntil(respuesta);
    }
});

// Escuchar push
self.addEventListener('push', e => {
    const data = JSON.parse(e.data.text());

    const title = data.titulo;
    const options = {
        body: data.cuerpo,
        icon: `img/avatars/${data.usuario}.jpg`,
        badge: 'img/favicon.ico',
        image: 'https://i.kinja-img.com/gawker-media/image/upload/s--5cWBds5a--/c_scale,f_auto,fl_progressive,q_80,w_800/yhqxtlzz2rcdou4ty2mp.png',
        vibrate: [125, 75, 125, 275, 200, 275, 125, 75, 125, 275, 200, 600, 200, 600],
        openUrl: '/',
        data: {
            url: '/',
            id: data.usuario
        },
        actions: [{
                action: 'thor-action',
                title: 'Thor',
                icon: 'img/avatars/thor.jpg'
            },
            {
                action: 'spiderman',
                title: 'Spiderman',
                icon: 'img/avatars/spiderman.jpg'
            }
        ]
    };

    e.waitUntil(self.registration.showNotification(title, options));
});

// Acciones
self.addEventListener("notificationclose", e => {
    console.log('Notificacion cerrada', e);
});

self.addEventListener('notificationclick', e => {
    const notificacion = e.notification;
    const accion = e.action;


    const respuesta = clients.matchAll()
        .then(clientes => {

            //Busco una instancia (pestaña de Chrome) abierta y regreso la que esté activa

            //Un cliente es un tab del navegador
            let client = clientes.find(c => {
                return c.visibilityState === 'visible';
            });

            if (client !== undefined) {
                client.navigate(notificacion.data.url);
                client.focus();
            } else {
                clients.openWindow(notificacion.data.url);
            }
            notificacion.close();
        });

    e.waitUntil(respuesta);
});