const express = require('express');
const router = express.Router();
const productosCtrl = require('../controllers/productos.controller')

//Definimos los endpoint
router.get('/productos', productosCtrl.getProducto);
router.post('/productos', productosCtrl.crearProducto);

module.exports = router;
