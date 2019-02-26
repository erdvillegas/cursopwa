/**
 * Configuracion para guardar mensajes en IndexDB
 *
 */

/**
 * Instancia para manejo de base de datos
 */
const db = new PouchDB('mensajes');

/**
 * Guarda mensajes en la base de datos IndexDB
 * @param {*} mensaje Mensaje a guardar temporalmente
 */
function guardarMensaje(mensaje) {

    mensaje._id = new Date().toISOString();
    return db.put(mensaje).then(() => {
        self.registration.sync.register('nuevo-post');
        const newResponse = { ok: true, offline: true };

        return new Response(JSON.stringify(newResponse));
    });
}

/**
 * Postea los mensajes pendientes en background 
 * a la base de datos
 */
function postearMensajes() {

    const posteos = [];

    return db.allDocs({ include_docs: true }).then(docs => {

        docs.rows.forEach(row => {
            const doc = row.doc;

            const fetchPromesa = fetch('api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(doc)
                })
                .then(res => {

                    //En este punto dado que ya se posteo el dato, 
                    //se debe borrar de la base de datos temporal
                    return db.remove(doc);
                });

            posteos.push(fetchPromesa);
        }); //Fin del Foreach

        return Promise.all(posteos);
    });

}