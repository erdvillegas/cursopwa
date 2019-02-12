// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
var db = new PouchDB("mensajes");

let dbMsj = [];
let heroes = ["spiderman", "ironman", "capitan america"];

// Objeto a grabar en base de datos
var i = 0;
let mensaje = {
    _id: new Date().toISOString(),
    user: 'spiderman',
    mensaje: 'Mi tía hizo unos panqueques muy buenos',
    sincronizado: false
};
dbMsj.push(mensaje);

for (i; i <= 25; i++) {
    let mensajeNvo = {
        _id: new Date().toISOString() + i,
        user: heroes[Math.floor((Math.random() * 3))],
        mensaje: 'Mensaje de prueba: ' + i,
        sincronizado: false
    };
    dbMsj.push(mensajeNvo);
}


// 2- Insertar en la base de datos
// function insterarDatos(mensaje){
//     if(mensaje.texto.length <= 0) return;
//     db.put(mensaje)
//     .then(console.log("Insertado")
//     .catch(console.log("Algo paso al insertar el dato"))
//     );
// }
dbMsj.forEach(mensaje => {
    db.put(mensaje)
        .then(console.log("Insertado"))
        .catch(console.log("Algo paso al insertar el dato"));
});


// 3- Leer todos los mensajes offline
db.allDocs({ include_docs: true, descending: false })
    .then(doc => {
        console.log(doc.rows);
    });



// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
db.allDocs({ include_docs: true, descending: false })
    .then(docs => {
        docs.rows.forEach(row => {
            let doc = row.doc;
            doc.sincronizado = true;

            db.put(doc);
        });
    });



// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización 
db.allDocs({ include_docs: true, descending: false })
    .then(doc => {
        doc.rows.map(elemento => {
            if (elemento.doc.sincronizado) {
                db.remove(doc).then(console.log("Registro eliminado"));
            }
        });
    });