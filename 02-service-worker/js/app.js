
// if ( 'serviceWorker' in navigator ) {
//     console.log('Podemos usarlo!');
// }

// confirmar si podemos usar el SW
if ( navigator.serviceWorker ) {
    console.log("Podemos usar el cache");
    navigator.serviceWorker.register('/sw.js');
}

