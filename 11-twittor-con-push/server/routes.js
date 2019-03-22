// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();


const mensajes = [

    {
        _id: 'XXX',
        user: 'spiderman',
        mensaje: 'Hola Mundo'
    }

];


// Get mensajes
router.get('/', function(req, res) {
    // res.json('Obteniendo mensajes');
    res.json(mensajes);
});


// Post mensaje
router.post('/', function(req, res) {

    const mensaje = {
        mensaje: req.body.mensaje,
        user: req.body.user
    };

    mensajes.push(mensaje);

    console.log(mensajes);


    res.json({
        ok: true,
        mensaje
    });
});

// Almacena la suscripcion del cliente
router.post('/suscribe', (req, res) => {
    res.json('suscribe');
});

// Almacena la suscripcion y envia el key publico al cliente
router.get('/key', (req, res) => {
    res.json('key publico');
});

// Envia una notificacion PUSH a las personas
// Esto es solo para el BackEnd
router.post('/push', (req, res) => {
    res.json('key publico');
});

module.exports = router;