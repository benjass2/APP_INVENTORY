const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');
const validarId = require('../middleware/validarID');

router.get('/', productosController.obtenerProductos);
router.post('/', productosController.registrarProducto);
router.delete('/:id',validarId,productosController.eliminarProducto);
router.put('/:id',validarId,productosController.actualizarProducto);

module.exports = router;

