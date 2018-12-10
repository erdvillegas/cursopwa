'use strict';

self.addEventListener('fetch', event => {
    if (event.request.url.includes('main.jpg')) {
        let nueva_url = event.request.url.replace("main", "main-patas-arriba");
        event.respondWith(fetch(nueva_url));

    }
    // if (event.request.url.includes('style.css')) {
    //     let respuesta = new Response(`
    //         body{
    //             background-color: red !important;
    //             color: pink;
    //         }
    //     `, {
    //         headers: {
    //             'Content-Type': 'text/css'
    //         }
    //     });

    //     event.respondWith(respuesta);
    // }
    // if (event.request.url.includes('style.css')) {
    //     event.respondWith(null);
    // } else {
    //     event.respondWith(fetch(event.request));
    // }
    //console.log(event.request.url);
    //event.respondWith(fetch(event.request));
});