
// Ciclo de vida del SW

//Cuando se instala el SW
self.addEventListener('install', event=>{
    // Descargamos assets
    // Creamos un cache
    console.log("SW: Instalando WS");
    
    self.skipWaiting();
});

//Cuando el SW toma el control de la aplicación

self.addEventListener('activate', event=>{
    // Borrar cache viejo

    console.log("SW: Activo y listo para controlar la App");
});