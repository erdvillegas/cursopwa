
// indexedDB: Reforzamiento

let request = window.indexedDB.open('mi-database', 2);

// Se actualiza o se crea cuando se sube la version de la DB

request.onupgradeneeded = event => {
    console.log('Actualizacion de DB');

    let db = event.target.result;
    db.createObjectStore('heroes',{
        keyPath: 'id'
    });

};