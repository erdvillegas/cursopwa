/**
 * Guarda contenido dinamico en la memoria cache, si no se encuentra el recurso se obtiene la respuesta
 * @param {*} dynamicCache Nombre del cache dinamico
 * @param {*} req Peticion
 * @param {*} res Respuesta obtenida
 */
function actualizaCacheDinamico(dynamicCache, req, res) {
    if (res.ok) {
        return caches.open(dynamicCache).then(cache => {
            cache.put(req, res.clone());
            return res.clone();
        });
    } else {
        return res;
    }
}