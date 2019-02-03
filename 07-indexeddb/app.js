// indexedDB: Reforzamiento

let request = window.indexedDB.open("mi-database", 2);

// Se actualiza o se crea cuando se sube la version de la DB

request.onupgradeneeded = event => {
    console.log("Actualizacion de DB");

    let db = event.target.result;
    db.createObjectStore("heroes", {
        keyPath: "id"
    });
};

// Manejo de errores
request.onerror = event => {
    console.log('DB error:', event.target.error);
};

//Insertar datos
request.onsuccess = event => {
    let db = event.target.result;

    let heroesData = [
        { id: "1111", heroe: "Spiderman", Mensaje: "Mensaje desde Spiderman" },
        { id: "2222", heroe: "Ironman", Mensaje: "Mensaje desde IronMan" }
    ];

    heroesTransaction = db.transaction("heroes", "readwrite");
    heroesTransaction.onerror = error => {
        console.log("Error guardando", event.target.error);
    };

    // Transaccion exitosa
    heroesTransaction.oncomplete = event => {
        console.log("Transacción hecha", event);
    };

    let heroesStore = heroesTransaction.objectStore("heroes");

    for (const heroe of heroesData) {
        heroesStore.add(heroe);
    }

    heroesStore.onsuccess = event => {
        console.log("Nuevo item agregado a la base de datos");
    };
};