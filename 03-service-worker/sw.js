// Ciclo de vida del SW

//Cuando se instala el SW
self.addEventListener("install", event => {
  // Descargamos assets
  // Creamos un cache
  console.log("SW: Instalando WS");

  const instalacion = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("SW: Instalaciones terminadas");
      self.skipWaiting();
      resolve();
    }, 1);
  });

  event.waitUntil(instalacion);
});

//Cuando el SW toma el control de la aplicación
self.addEventListener("activate", event => {
  // Borrar cache viejo
  console.log("SW: Activo y listo para controlar la App");
});

// FETCH: Manejo de peticiones HTTP
self.addEventListener("fetch", event => {
  // Aplicar estrategias del cache
  // console.log("SW:", event.request.url);
  // if( event.request.url.includes('https://reqres.in/')){
  //     const resp = new Response(`{ok: false, mensaje: 'xD'}`);
  //     event.respondWith( resp );
  // }
});

// SYNC: Recuperamos la conexión a internet
self.addEventListener("sync", event => {
  console.log("Tenemos conexión!");
  console.log(event);
  console.log(event.tag);
});

// PUSH: Maneja las push notificaciones
// self.addEventListener('push',event=>{
//     console.log('Notificacion recibida');
//     console.log(event);
// });