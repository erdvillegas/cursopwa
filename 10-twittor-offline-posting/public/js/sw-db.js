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
        console.log("Mensaje guardado para posterior posteo");

        return new Response(JSON.stringify(newResponse));
    });
}